import { IonIcon } from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import useChat from "../../store/store";

export default function DefaultIdea({
  idea,
  moreContext,
}: {
  idea: string;
  moreContext: string;
}) {
  const addChat = useChat((state) => state.addChat);
  return (
    <button
      className="border dark:border-gray-500 mb-2 flex w-full text-left p-2 group rounded-md text-sm shadow flex-1 md:flex-row md:items-center"
      onClick={() => {
        addChat({ role: "user", content: moreContext });
        addChat({ role: "assistant", content: "" });
      }}
    >
      <div className="">
        <h3 className=" font-bold text-gray-600 dark:text-gray-300 ">{idea}</h3>
        <p className=" text-gray-400 ">{moreContext}</p>
      </div>

      <div className="btn text-center ml-auto h-full self-center text-gray-600 dark:text-gray-200 text-lg invisible duration-75 transition-all group-hover:visible ">
        <IonIcon icon={sendOutline} />
      </div>
    </button>
  );
}
