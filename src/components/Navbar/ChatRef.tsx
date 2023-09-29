import { IonIcon } from "@ionic/react";
import { chatboxOutline, trashOutline } from "ionicons/icons";
import useChat, { isChatSelected } from "../../store/store";

export default function ChatRef({
  chat,
}: {
  chat: { id: string; title: string };
}) {
  const viewSelectedChat = useChat((state) => state.viewSelectedChat);
  const isSelected = useChat(isChatSelected(chat.id));
  const handleDeleteChats = useChat((state) => state.handleDeleteChats);

  return (
    <div className="btn-wrap flex items-center w-full hover:bg-[#40414f]">
      <button
        className=" text-base py-2 flex  items-center flex-grow  transition p-2"
        onClick={() => viewSelectedChat(chat.id)}
      >
        <span className="mr-2 text-base flex">
          <IonIcon icon={chatboxOutline} />
        </span>
        <span className="text-sm truncate">{chat.title}</span>
      </button>
      {isSelected && (
        <button
          className="mx-2 text-base flex hover:text-red-300"
          onClick={() => handleDeleteChats(chat.id)}
        >
          <IonIcon icon={trashOutline} />
        </button>
      )}
    </div>
  );
}
