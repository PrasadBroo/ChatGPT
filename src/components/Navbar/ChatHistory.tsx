import useChat, { months, selectChatsHistory } from "../../store/store";
import ChatRef from "./ChatRef";

export default function ChatHistory() {
  const chatsHistory = useChat(selectChatsHistory);
  console.log(chatsHistory);
  return (
    <div className="my-4 text-[#ECECF1] px-2">
      {/* <h3 className=" text-sm my-2 text-[#8E8EA0] pl-2">Previous 7 days</h3>
      {chatsHistory.map((chatId) => (
        <ChatRef key={chatId.id} chat={chatId} />
      ))} */}

      {Object.keys(chatsHistory)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((month) => {
          return (
            <div key={month}>
              <h3 className=" text-sm my-2 text-[#8E8EA0] pl-2">
                {parseInt(month) === new Date().getMonth()
                  ? "This month"
                  : months[parseInt(month)]}
              </h3>
              {chatsHistory[parseInt(month)].map((chatId) => (
                <ChatRef key={chatId.id} chat={chatId} />
              ))}
            </div>
          );
        })}
    </div>
  );
}
