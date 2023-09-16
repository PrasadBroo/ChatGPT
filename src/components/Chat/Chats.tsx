import useChat from "../../store/store";
import ChatWrap from "./ChatWrap";

export default function Chats() {
  const chats = useChat((state) => state.chats);
  return (
    <div className="md:mt-10 w-full px-2 md:px-0">
      {chats.map((chat) => (
        <ChatWrap query={chat} />
      ))}

      <div className="h-32 md:h-48 flex-shrink-0"></div>
    </div>
  );
}
