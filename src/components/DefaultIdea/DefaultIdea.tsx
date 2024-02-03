import { IonIcon } from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import useChat from "../../store/store";
import classNames from "classnames";
import { createMessage } from "../../utils/createMessage";

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
      className={classNames(
        "md:grid md:grid-cols-2 md:grid-rows-1 md:items-stretch md:gap-2 ",
        myclassNames
      )}
    >
      {ideas.map((i) => (
        <button
          key={i.idea}
          className="border inline-flex dark:border-gray-500 border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mb-2  w-full text-left p-2 group rounded-md  shadow flex-1 md:flex-row md:items-center"
          onClick={() => {
            addChat(createMessage("user", i.moreContext, "text"));
            addChat(createMessage("assistant", "", "text"));
          }}
        >
          <div className=" self-stretch w-11/12">
            <h3 className=" font-bold  dark:text-gray-300 text-gray-700">
              {i.idea}
            </h3>
            <p className=" dark:text-gray-400 text-gray-600">{i.moreContext}</p>
          </div>

          <div className="btn text-gray-600 dark:text-gray-200 text-lg invisible duration-75 transition-all group-hover:visible ">
            <IonIcon icon={sendOutline} />
          </div>
        </button>
      ))}
    </div>
  );
}
