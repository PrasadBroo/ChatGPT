import { useEffect } from "react";
import BotMessage from "./BotMessage";
import ChatMessage from "./ChatMessage";

type Props = {
  query: string;
  index: number;
};

export default function ChatWrap({ query, index }: Props) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  return (
    <div className="w-full">
      <ChatMessage content={query} chatIndex={index} />
      <BotMessage query={query} />
    </div>
  );
}
