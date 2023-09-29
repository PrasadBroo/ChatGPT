import { IonIcon } from "@ionic/react";
import { chatboxOutline } from "ionicons/icons";
import useChat from "../../store/store";

export default function ChatRef({
  chat,
}: {
  chat: { id: string; title: string };
}) {
  const viewSelectedChat = useChat((state) => state.viewSelectedChat);

  return (
    <button
      className=" text-base py-2 flex w-full items-center hover:bg-[#40414f] transition p-2"
      onClick={() => viewSelectedChat(chat.id)}
    >
      <span className="mr-2 text-base flex">
        <IonIcon icon={chatboxOutline} />
      </span>
      <span className="text-sm truncate">{chat.title}</span>
    </button>
  );
}
