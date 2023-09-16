import { IonIcon } from "@ionic/react";
import { chatboxOutline } from "ionicons/icons";

export default function ChatRef({ chatId }: { chatId: string }) {
  return (
    <a className=" text-base my-4 flex items-center hover:bg-[#40414f] transition p-2">
      <span className="mr-2 text-base flex">
        <IonIcon icon={chatboxOutline} />
      </span>
      <span className="text-sm truncate">{chatId}</span>
    </a>
  );
}
