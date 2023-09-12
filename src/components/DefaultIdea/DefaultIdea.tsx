import { IonIcon } from "@ionic/react";

export default function DefaultIdea() {
  return (
    <button className="border dark:border-gray-500 mb-2 flex w-full text-left p-2 group rounded-md text-sm shadow flex-1 md:flex-row md:items-center">
      <div className="">
        <h3 className=" font-bold text-gray-600 dark:text-gray-300 ">
          Come up with concepts
        </h3>
        <p className=" text-gray-400 ">for a retro-style arcade game</p>
      </div>

      <div className="btn text-center ml-auto h-full self-center text-gray-600 dark:text-gray-200 text-lg invisible duration-75 transition-all group-hover:visible ">
        <IonIcon name="send-outline" />
      </div>
    </button>
  );
}
