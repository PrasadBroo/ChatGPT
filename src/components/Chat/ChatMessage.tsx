import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import { createOutline } from "ionicons/icons";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  content: string;
};

export default function ChatMessage({ content }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <div className={classNames("py-4")}>
      <div className=" max-w-2xl mx-auto md:flex md:items-center group">
        <div className="flex items-start w-full">
          <div className="mr-4  rounded-md flex items-center flex-shrink-0">
            <Avatar size={11} />
          </div>

          {!edit ? (
            <p className={classNames("text-sm text-gray-200")}>{content}</p>
          ) : (
            <textarea
              name="query"
              value={content}
              className="w-full bg-transparent border-0 dark:text-white outline-none resize-none"
            ></textarea>
          )}
        </div>

        <div className=" md:invisible group-hover:visible text-right">
          <button
            className="edit md:ml-8 text-gray-200 text-xl "
            onClick={() => setEdit((prev) => !prev)}
          >
            <IonIcon icon={createOutline} />
          </button>
        </div>
      </div>
    </div>
  );
}
