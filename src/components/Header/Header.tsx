import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
export default function Header() {
  return (
    <header className=" text-center my-2 text-sm text-gray-300 py-2 flex items-center justify-between px-2">
      <div className="md:block hidden"></div>
      <div className=" ">
        <span>Default (GPT-3.5)</span>
      </div>
      <div className="">
        <button className=" text-xl">
          <IonIcon icon={shareOutline} />
        </button>
      </div>
    </header>
  );
}
