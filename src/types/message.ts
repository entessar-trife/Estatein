export type Message = {
  role: "user" | "bot";
  content: string;
  timestamp: string;
};
