import { useEffect } from "react";
import useChat from "../../store/store";
import BotMessage from "./BotMessage";
import ChatMessage from "./ChatMessage";

type Props = {
  query: string;
};

export default function ChatWrap({ query }: Props) {
  const chats = useChat((state) => state.chats);
  useEffect(() => {
    if (chats.length > 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [chats]);
  return (
    <div className="w-full">
      <ChatMessage content={query} />
      <BotMessage query={query} />
    </div>
  );
}
