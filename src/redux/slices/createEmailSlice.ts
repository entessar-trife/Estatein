import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import emailjs from "@emailjs/browser";

type ChannelState = { sending: boolean; success: boolean; error: string | null };
type SliceState = { byId: Record<string, ChannelState> };

const initialChannel: ChannelState = { sending: false, success: false, error: null };

const ensure = (state: SliceState, id: string) => {
  if (!state.byId[id]) state.byId[id] = { ...initialChannel };
  return state.byId[id];
};

export type SendOutboundMailArgs = {
  cardId: string;
  message: string;
  subject?: string;
  from_name?: string;
  to_email?: string;
  reply_to?: string;
  extra?: Record<string, any>;
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

export const sendOutboundMail = createAsyncThunk(
  "outboundMailer/send",
  async (args: SendOutboundMailArgs, { rejectWithValue }) => {
    const SERVICE_ID = args.serviceId ?? (import.meta.env.VITE_EMAILJS_SERVICE_ID as string);
    const TEMPLATE_ID = args.templateId ?? (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string);
    const PUBLIC_KEY = args.publicKey ?? (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      return rejectWithValue("Missing EmailJS env vars (SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY).");
    }

    emailjs.init({ publicKey: PUBLIC_KEY });

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        message: args.message,
        subject: args.subject ?? "New Message",
        from_name: args.from_name ?? "Website",
        to_email: args.to_email,
        reply_to: args.reply_to,

        ...(args.extra ?? {}),
      });

      if (res.status < 200 || res.status >= 300) {
        throw new Error(`${res.status} ${res.text || "Unknown error"}`);
      }
      return true;
    } catch (e: any) {
      return rejectWithValue(e?.text || e?.message || "Failed to send");
    }
  }
);

const initialState: SliceState = { byId: {} };

const outboundMailerKeyedSlice = createSlice({
  name: "outboundMailer",
  initialState,
  reducers: {
    resetOutboundMailById(state, action: PayloadAction<{ cardId: string }>) {
      const { cardId } = action.payload;
      state.byId[cardId] = { ...initialChannel };
    },
    resetOutboundMailAll(state) {
      state.byId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOutboundMail.pending, (state, action) => {
        const id = action.meta.arg.cardId;
        const s = ensure(state, id);
        s.sending = true;
        s.success = false;
        s.error = null;
      })
      .addCase(sendOutboundMail.fulfilled, (state, action) => {
        const id = action.meta.arg.cardId;
        const s = ensure(state, id);
        s.sending = false;
        s.success = true;
        s.error = null;
      })
      .addCase(sendOutboundMail.rejected, (state, action) => {
        const id = action.meta.arg.cardId;
        const s = ensure(state, id);
        s.sending = false;
        s.success = false;
        s.error = (action.payload as string) || "Failed to send. Please try again.";
      });
  },
});

export const { resetOutboundMailById, resetOutboundMailAll } = outboundMailerKeyedSlice.actions;
export default outboundMailerKeyedSlice.reducer;
