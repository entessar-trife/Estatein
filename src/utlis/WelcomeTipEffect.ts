import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Message } from "../types/message";

export const WelcomeTipEffect = (setShowWelcomeTip: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [setShowWelcomeTip]);
};

export const InitialWelcomeMessage = (
  isOpen: boolean,
  messages: Message[],
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const hour = now.getHours();
      let greeting = "Hello";

      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";
      else greeting = "Good evening";

      const welcomeMessage: Message = {
        role: "bot",
        content: `${greeting}, I’m your personal assistant. I'm ready to answer your questions.`,
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages, setMessages]);
};
