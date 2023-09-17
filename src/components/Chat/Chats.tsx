import useChat from "../../store/store";
import ChatWrap from "./ChatWrap";

export default function Chats() {
  const chats = useChat((state) => state.chats);

  return (
    <div className="md:mt-10 w-full">
      {chats.map((chat, i) =>
        chat.role === "user" ? (
          <ChatWrap query={chat.content} key={i} index={i} />
        ) : null
      )}

      <div className="h-32 md:h-48 flex-shrink-0"></div>
    </div>
  );
}
