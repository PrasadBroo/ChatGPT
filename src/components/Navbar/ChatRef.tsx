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
import Modal from "../modals/Modal";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { createPortal } from "react-dom";

export default function ChatRef({
  chat,
}: {
  chat: { id: string; title: string };
}) {
  const viewSelectedChat = useChat((state) => state.viewSelectedChat);
  const isSelected = useChat(isChatSelected(chat.id));
  const [deleteChat, editChatsTitle] = useChat((state) => [
    state.handleDeleteChats,
    state.editChatsTitle,
  ]);
  const [editTitle, setEditTitle] = useState(chat.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [confirmDeleteChat, setConfirmDeleteChat] = useState(false);
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
  function handleDeleteChats(id: string) {
    deleteChat(id);
    setConfirmDeleteChat(false);
  }

  return (
    <div
      className={classNames(
        "btn-wrap flex items-center w-full p-1 rounded-md text-xl  hover:bg-[#40414f]",
        { "bg-[#40414f]": isSelected }
      )}
    >
      {!isTitleEditeble && (
        <button
          className="  py-2  w-3/4 flex  items-center flex-grow  transition p-2"
          onClick={() => viewSelectedChat(chat.id)}
          title={chat.title}
        >
          <span className="mr-2  flex">
            <IonIcon icon={chatboxOutline} />
          </span>

          <span className="text-sm truncate capitalize">
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
        <div className=" inline-flex w-1/4 mx-2  items-center justify-between">
          <button
            className={classNames(" mr-2 flex hover:text-blue-300")}
            onClick={() => setIsEditingTitle(true)}
          >
            <IonIcon icon={pencilOutline} />
          </button>
          <button
            className={classNames("  flex hover:text-red-300")}
            onClick={() => setConfirmDeleteChat(true)}
          >
            <IonIcon icon={trashOutline} />
          </button>
        </div>
      )}
      {isSelected && isEditingTitle && (
        <div className=" inline-flex w-1/5 mx-2  items-center justify-between">
          <button
            className={classNames(" mr-2 flex hover:text-blue-300")}
            onClick={() => handleEditTitle(chat.id, editTitle)}
          >
            <IonIcon icon={checkmarkOutline} />
          </button>
          <button
            className={classNames("  flex hover:text-red-300")}
            onClick={() => setIsEditingTitle(false)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>
      )}
      {createPortal(
        <Modal visible={confirmDeleteChat}>
          <ConfirmDelete
            onDelete={() => handleDeleteChats(chat.id)}
            onCancel={() => setConfirmDeleteChat(false)}
          >
            <p className="text-sm">
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </p>
          </ConfirmDelete>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
        "confirm-delete-chat"
      )}
    </div>
  );
}
