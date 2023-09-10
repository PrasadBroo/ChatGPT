import ChatRef from "./ChatRef";

export default function ChatHistory() {
  return (
    <div className="my-4 text-[#ECECF1]">
      <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous 7 days</h3>
      {[...Array(5)].map((_, i) => (
        <ChatRef key={i} />
      ))}
    </div>
  );
}
