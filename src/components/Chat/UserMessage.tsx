import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import { createOutline } from "ionicons/icons";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import useChat, { ChatMessageType } from "../../store/store";

type Props = {
  chat: ChatMessageType;
  chatIndex: number;
};

export default function UserMessage({ chat, chatIndex }: Props) {
  const [edit, setEdit] = useState(false);
  const [updatedQuery, setUpdatedQuery] = useState(chat.content);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [editChatMessage, resetChatAt] = useChat((state) => [
    state.editChatMessage,
    state.resetChatAt,
  ]);

  function handelChatEdit() {
    editChatMessage(updatedQuery, chatIndex);
    resetChatAt(chatIndex + 1);
    setEdit(false);
  }
  useEffect(() => {
    if (edit && editTextareaRef.current) {
      editTextareaRef.current.style.height =
        editTextareaRef.current.scrollHeight + "px";
    }
  }, [edit]);

  return (
    <div className={classNames("py-4 px-2 md:px-0")}>
      <div className=" max-w-2xl mx-auto md:flex md:items-center group">
        <div className="flex items-start w-full max-w-[620px]">
          <div className="mr-4  rounded-md flex items-center flex-shrink-0">
            <Avatar className=" h-11 w-11" />
          </div>

          {!edit ? (
            <p
              className={classNames(
                "text-sm  dark:text-gray-200 overflow-x-auto"
              )}
            >
              {chat.content}
            </p>
          ) : (
            <textarea
              name="query"
              ref={editTextareaRef}
              value={updatedQuery}
              onChange={(e) => {
                setUpdatedQuery(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="text-sm w-full bg-transparent border-0 dark:text-white outline-none resize-none"
              autoFocus
            ></textarea>
          )}
        </div>

        <div className=" md:invisible group-hover:visible  text-right">
          {!edit && (
            <button
              className="edit md:ml-8 dark:text-gray-200  text-gray-500 text-xl "
              onClick={() => setEdit((prev) => !prev)}
            >
              <IonIcon icon={createOutline} />
            </button>
          )}
        </div>
      </div>
      {edit && (
        <div className=" max-w-2xl mx-auto flex items-center group justify-center text-sm mt-4">
          <button
            className=" p-2 bg-teal-600 hover:bg-teal-700 focus:border-2  rounded-md text-white mr-2 "
            onClick={handelChatEdit}
          >
            Save & submit
          </button>
          <button
            className=" p-2 bg-transparent border dark:hover:bg-gray-700 hover:bg-gray-200 focus:border-2 hover:border border-gray-600 rounded-md text-black dark:text-white"
            onClick={() => setEdit((prev) => !prev)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
