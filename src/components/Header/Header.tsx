import { IonIcon } from "@ionic/react";
import { shareOutline, informationCircleOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";

export default function Header() {
  const [model, systemMessage, useSystemMessageForAllChats] = useSettings(
    (state) => [
      state.settings.selectedModal,
      state.settings.systemMessage,
      state.settings.useSystemMessageForAllChats,
    ]
  );
  return (
    <header className=" text-center my-2 text-sm dark:text-gray-300 border-b dark:border-none dark:shadow-md py-2 flex items-center justify-between px-2">
      <div className="md:block hidden"></div>
      <div className=" flex items-center relative">
        <span>Using ({model.toLocaleUpperCase()})</span>
        {useSystemMessageForAllChats && (
          <span className=" flex text-xl ml-2 group cursor-pointer">
            <IonIcon icon={informationCircleOutline} />
            <span className=" absolute z-10 left-0 w-[calc(100%+10rem)] top-[calc(100%+1rem)] text-sm bg-gray-900 text-white p-2  rounded-md invisible  pointer-events-none group-hover:visible group-hover:pointer-events-auto transition">
              <span className=" block underline text-teal-600">
                <strong>System message</strong>
              </span>
              <span className=" text-gray-400 block text-left">
                {systemMessage}
              </span>
            </span>
          </span>
        )}
      </div>
      <div className="">
        <button className=" text-xl">
          <IonIcon icon={shareOutline} />
        </button>
      </div>
    </header>
  );
}
