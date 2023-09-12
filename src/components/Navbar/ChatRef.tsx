import { IonIcon } from "@ionic/react";
import { chatboxOutline } from "ionicons/icons";
export default function ChatRef() {
  return (
    <a className=" text-base my-4 flex items-center">
      <span className="mr-2 text-base flex">
        <IonIcon icon={chatboxOutline} />
      </span>
      <span className="text-sm truncate">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
        velit. Magni ad culpa neque harum?
      </span>
    </a>
  );
}
