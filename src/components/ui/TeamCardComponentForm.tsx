import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import {
  sendOutboundMail,
  resetOutboundMailById,
} from "../../redux/slices/createEmailSlice";
import AlertMessage from "../ui/AlertMessage";


type Props = {
  cardId: string;
  toMemberName?: string;
  toEmail?: string;
};

export default function TeamCardComponentForm({ cardId, toMemberName, toEmail }: Props) {
  const dispatch = useAppDispatch();
  const channel = useAppSelector((s: RootState) => s.outboundMailer.byId[cardId]);
  const sending = channel?.sending ?? false;
  const success = channel?.success ?? false;
  const remoteError = channel?.error ?? "";

  const [input, setInput] = useState("");
  const [localError, setLocalError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      formRef.current?.reset();
      setInput("");
      dispatch(resetOutboundMailById({ cardId }));
    }
  }, [success, dispatch, cardId]);

  useEffect(() => {
    if (remoteError) setLocalError(remoteError);
  }, [remoteError]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      setLocalError("Please enter your message.");
      return;
    }
    setLocalError("");


    dispatch(
      sendOutboundMail({
        to_email: toEmail,
        cardId,
        subject: `Message to ${toMemberName ?? "Team Member"}`,
        from_name: "TeamCardComponent",
        message: input.trim(),
      })
    );
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          message="High five! 🖐 Your greeting just flew in."
          onClose={() => setShowAlert(false)}
        />
      )}

      <form ref={formRef} onSubmit={onSubmit} className="relative">
        <input
          type="text"
          name="message"
          placeholder="Say Hello 👋"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black dark:text-white bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 py-2 pr-2 pl-6 lg-custom:py-2.5 lg-custom:pr-2.5 lg-custom:pl-5 2xl:py-3.5 2xl:pr-3.5 2xl:pl-6 rounded-[100px] w-full h-[64px]"
          aria-invalid={!!localError}
          aria-describedby={localError ? "msg-error" : undefined}
        />

        {localError && (
          <span id="msg-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
            {localError}
          </span>
        )}

        <button
          type="submit"
          disabled={sending}
          className="bg-purple70 dark:bg-purple60 absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-3.5 lg-custom:p-2 2xl:p-2.5 rounded-full cursor-pointer disabled:opacity-60"
          aria-busy={sending}
        >
          <img
            src="/assets/icons/Team/send.svg"
            alt={sending ? "Sending..." : "Send"}
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          />
        </button>
      </form>
    </>
  );
}
