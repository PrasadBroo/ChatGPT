import { IonIcon } from "@ionic/react";
import {
  chatboxOutline,
  trashOutline,
  pencilOutline,
  checkmarkOutline,
  closeOutline,
} from "ionicons/icons";
import useChat, { isChatSelected } from "../../store/store";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function ChatRef({
  chat,
}: {
  chat: { id: string; title: string };
}) {
  const viewSelectedChat = useChat((state) => state.viewSelectedChat);
  const isSelected = useChat(isChatSelected(chat.id));
  const [handleDeleteChats, editChatsTitle] = useChat((state) => [
    state.handleDeleteChats,
    state.editChatsTitle,
  ]);
  const [editTitle, setEditTitle] = useState(chat.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const isTitleEditeble = isSelected && isEditingTitle;

  useEffect(() => {
    setIsEditingTitle(false);
  }, [isSelected]);

  function handleEditTitle(id: string, title: string) {
    if (title.trim() === "") {
      return;
    }
    setIsEditingTitle(false);
    setEditTitle(title);
    editChatsTitle(id, title);
  }

  return (
    <div
      className={classNames(
        "btn-wrap flex items-center w-full hover:bg-[#40414f]",
        { "bg-[#40414f]": isSelected }
      )}
    >
      {!isTitleEditeble && (
        <button
          className=" text-base py-2 w-4/5 flex  items-center flex-grow  transition p-2"
          onClick={() => viewSelectedChat(chat.id)}
        >
          <span className="mr-2 text-base flex">
            <IonIcon icon={chatboxOutline} />
          </span>

          <span className="text-sm truncate">
            {editTitle ? editTitle : chat.title}
          </span>
        </button>
      )}
      {isTitleEditeble && (
        <input
          type="text"
          value={editTitle}
          className=" bg-inherit border border-blue-400 w-4/5 ml-2 p-1 outline-none"
          autoFocus
          onChange={(e) => setEditTitle(e.target.value)}
        />
      )}
      {isSelected && !isEditingTitle && (
        <div className=" inline-flex w-1/5 mx-2  items-center justify-between">
          <button
            className={classNames("text-base mr-2 flex hover:text-blue-300")}
            onClick={() => setIsEditingTitle(true)}
          >
            <IonIcon icon={pencilOutline} />
          </button>
          <button
            className={classNames(" text-base flex hover:text-red-300")}
            onClick={() => handleDeleteChats(chat.id)}
          >
            <IonIcon icon={trashOutline} />
          </button>
        </div>
      )}
      {isSelected && isEditingTitle && (
        <div className=" inline-flex w-1/5 mx-2  items-center justify-between">
          <button
            className={classNames("text-base mr-2 flex hover:text-blue-300")}
            onClick={() => handleEditTitle(chat.id, editTitle)}
          >
            <IonIcon icon={checkmarkOutline} />
          </button>
          <button
            className={classNames(" text-base flex hover:text-red-300")}
            onClick={() => setIsEditingTitle(false)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>
      )}
    </div>
  );
}
