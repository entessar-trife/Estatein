import { get, ref as rtdbRef } from "firebase/database";
import { db } from "../firebaseConfig";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;
const apiUrl = import.meta.env.VITE_OPENAI_API_URL as string;
const defaultModel =
  (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-5";

export interface ChatResponse {
  success: boolean;
  message: string;
}

async function getDashboardCommands(): Promise<string[]> {
  const snap = await get(rtdbRef(db, "admin/botCommands"));
  if (!snap.exists()) return [];
  const data = snap.val() || {};
  const list: { text: string; createdAt: number }[] = [];

  for (const id in data) {
    const item = data[id];
    const text = typeof item?.text === "string" ? item.text.trim() : "";
    const ts = typeof item?.createdAt === "number" ? item.createdAt : 0;
    if (text) list.push({ text, createdAt: ts });
  }

  list.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));

  const seen = new Set<string>();
  const unique = list
    .map((x) => x.text)
    .filter((t) => {
      const key = t.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return unique;
}

async function buildSystemMessages(): Promise<Array<{ role: "system"; content: string }>> {
  const commands = await getDashboardCommands();
  return commands.map((c) => ({ role: "system", content: c }));
}

function modelEnforcesDefaultTemperature(modelId: string): boolean {
  return /(^|\b)gpt-5(\b|$)/i.test(modelId);
}

export const sendChatMessage = async (userMessage: string): Promise<ChatResponse> => {
  try {
    if (!apiKey || !apiUrl) {
      throw new Error(
        "Missing API configuration. Check VITE_OPENAI_API_KEY and VITE_OPENAI_API_URL."
      );
    }

    const content = (userMessage ?? "").trim();
    if (!content) {
      return { success: false, message: "Please enter a message." };
    }

    const systemMessages = await buildSystemMessages();

    const messages = [
      ...systemMessages,
      { role: "user", content },
    ];

    const body: any = {
      model: defaultModel,
      messages,
    };

    if (!modelEnforcesDefaultTemperature(defaultModel)) {
      body.temperature = 0.2;
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "API Error");
      throw new Error(errText || "API Error");
    }

    const data = await res.json();
    const message: string =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return { success: true, message };
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return {
      success: false,
      message:
        typeof error?.message === "string"
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
};
