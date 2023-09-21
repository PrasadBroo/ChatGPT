import useChat from "../../store/store";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

export default function Chats() {
  const chats = useChat((state) => state.chats);
  return (
    <div className="md:mt-10 w-full">
      {chats.map((chat, index) =>
        chat.role === "assistant" ? (
          <BotMessage index={index} key={index} />
        ) : (
          <UserMessage content={chat.content} chatIndex={index} key={index} />
        )
      )}

      <div className="h-48 flex-shrink-0"></div>
    </div>
  );
}
