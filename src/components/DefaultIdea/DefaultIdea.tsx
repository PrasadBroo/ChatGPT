import { IonIcon } from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import useChat from "../../store/store";
import classNames from "classnames";
import shortid from "shortid";

export default function DefaultIdea({
  ideas,
  myclassNames,
}: {
  ideas: { idea: string; moreContext: string }[];
  myclassNames?: string;
}) {
  const addChat = useChat((state) => state.addChat);
  return (
    <div
      className={classNames("md:flex md:items-center md:gap-2 ", myclassNames)}
    >
      {ideas.map((i) => (
        <button
          key={i.idea}
          className="border dark:border-gray-500 mb-2 flex w-full text-left p-2 group rounded-md text-sm shadow flex-1 md:flex-row md:items-center"
          onClick={() => {
            addChat({
              role: "user",
              content: i.moreContext,
              id: shortid.generate(),
            });
            addChat({ role: "assistant", content: "", id: shortid.generate() });
          }}
        >
          <div className="">
            <h3 className=" font-bold text-gray-600 dark:text-gray-300 ">
              {i.idea}
            </h3>
            <p className=" text-gray-400 ">{i.moreContext}</p>
          </div>

          <div className="btn text-center ml-auto h-full self-center text-gray-600 dark:text-gray-200 text-lg invisible duration-75 transition-all group-hover:visible ">
            <IonIcon icon={sendOutline} />
          </div>
        </button>
      ))}
    </div>
  );
}
