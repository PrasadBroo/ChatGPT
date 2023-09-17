import useChat from "../../store/store";
import ChatRef from "./ChatRef";

export default function ChatHistory() {
  const chatsHistory = useChat((state) => state.chats);

  return (
    <div className="my-4 text-[#ECECF1]">
      <h3 className=" text-sm my-2 text-[#8E8EA0] pl-2">Previous 7 days</h3>
      {chatsHistory.map((chatId, i) =>
        chatId.role === "user" ? (
          <ChatRef key={i} chatId={chatId.content} />
        ) : null
      )}
    </div>
  );
}
