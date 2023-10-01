import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";

export default function Header() {
  const model = useSettings((state) => state.settings.selectedModal);
  return (
    <header className=" text-center my-2 text-sm dark:text-gray-300 border-b dark:border-none dark:shadow-md py-2 flex items-center justify-between px-2">
      <div className="md:block hidden"></div>
      <div className=" ">
        <span>Using ({model.toLocaleUpperCase()})</span>
      </div>
      <div className="">
        <button className=" text-xl">
          <IonIcon icon={shareOutline} />
        </button>
      </div>
    </header>
  );
}
