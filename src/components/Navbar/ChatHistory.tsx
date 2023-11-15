import useChat, { priority, selectChatsHistory } from "../../store/store";
import ChatRef from "./ChatRef";

export default function ChatHistory() {
  const chatsHistory = useChat(selectChatsHistory);
  console.log(chatsHistory);
  return (
    <div className="my-4 text-[#ECECF1] px-2">
      {Object.keys(chatsHistory)
        .sort((a, b) => priority.indexOf(a) - priority.indexOf(b))
        .map((month) => {
          return (
            <div key={month}>
              <h3 className=" text-sm my-2 text-[#8E8EA0] pl-2">{month}</h3>
              {chatsHistory[month].map((chatId, i) => (
                <ChatRef key={chatId.id + i} chat={chatId} />
              ))}
            </div>
          );
        })}
    </div>
  );
}
