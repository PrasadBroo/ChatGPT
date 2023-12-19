import { IonIcon } from "@ionic/react";
import { checkmarkOutline, createOutline } from "ionicons/icons";
import useChat, {
  ChatMessageType,
  useAuth,
  useSettings,
  useTheme,
} from "../../store/store";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../modals/Modal";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import classNames from "classnames";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

type Backup = {
  conversations: {
    [key: string]: {
      id: string;
      created_at: string;
      updated_at: string;
      chats: [ChatMessageType];
    };
  };
  settings: {};
};

export default function SettingsTab({ visible }: { visible: boolean }) {
  const [sendChatHistory, setSendChatHistory] = useSettings((state) => [
    state.settings.sendChatHistory,
    state.setSendChatHistory,
  ]);
  const [theme, setTheme] = useTheme((state) => [state.theme, state.setTheme]);
  const modalsList = useSettings((state) => state.settings.modalsList);
  const [setModal, selectedModal] = useSettings((state) => [
    state.setModal,
    state.settings.selectedModal,
  ]);
  const clearAllChats = useChat((state) => state.clearAllChats);
  const [apikey, setApiKey] = useAuth((state) => [
    state.apikey,
    state.setApiKey,
  ]);
  const [newApiKey, setNewApiKey] = useState(apikey);
  const [editApiKey, setEditApiKey] = useState(false);
  const [confirmDeleteChats, setConfirmDeleteChats] = useState(false);
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendChatHistory(e.target.checked);
  }

  function handleModalChange(value: string) {
    setModal(value);
  }

  function handleSetNewApiKey() {
    if (newApiKey.trim().length === 0) return;
    setApiKey(newApiKey);
    setEditApiKey(false);
  }
  function handleChatsFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const chats = JSON.parse(e.target?.result as string);
      console.log(chats);
    };
    reader.readAsText(file);
  }
  function handleExportChats() {
    const backup: Backup = {
      conversations: {},
      settings: {},
    };
    useChat
      .getState()
      .chatHistory.forEach(
        (c) =>
          (backup.conversations[c] = JSON.parse(
            localStorage.getItem(c) as string
          ))
      );
    backup.settings = useSettings.getState().settings;
    const data = JSON.stringify(backup);
    console.log(backup);
    const a = document.createElement("a");
    const file = new Blob([data], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = `backup-${new Date().toISOString()}.json`;
    a.click();
  }
  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classNames("settings", { hidden: !visible })}
    >
      <div className="p-2">
        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <label
            htmlFor="default-checkbox"
            className="ml-2  font-medium  dark:text-gray-300"
          >
            Dark mode
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <span className="ml-2  font-medium  dark:text-gray-300">
            Clear all chats
          </span>
          <button
            type="button"
            className=" bg-red-700 text-white p-1 px-2 rounded"
            onClick={() => setConfirmDeleteChats(true)}
          >
            Clear
          </button>
        </div>

        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <label
            htmlFor="default-checkbox"
            className="ml-2  font-medium  dark:text-gray-300"
          >
            Send chat history
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={sendChatHistory}
              className="sr-only peer"
              onChange={handleOnChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <span className="ml-2  font-medium  dark:text-gray-300">
            Import & Export Chats
          </span>
          <div className="">
            <input
              type="file"
              name="chats-file"
              id="chats-file"
              accept=".json"
              onChange={handleChatsFileChange}
              className=" hidden pointer-events-none"
            />
            <button
              type="button"
              className=" bg-teal-700 text-white p-1 px-2 rounded mr-2"
              onClick={() => document.getElementById("chats-file")?.click()}
            >
              Import
            </button>
            <button
              type="button"
              className=" bg-red-700 text-white p-1 px-2 rounded"
              onClick={handleExportChats}
            >
              Export
            </button>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="apikey"
            className="font-medium  dark:text-gray-300 mb-2"
          >
            Edit Apikey
          </label>
          <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
            <input
              type={editApiKey ? "text" : "password"}
              id="apikey"
              value={newApiKey}
              readOnly={!editApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="sk-•••••••••••••••••••••••••••"
              required
            />
            {editApiKey ? (
              <button
                type="button"
                className="w-11 text-xl"
                onClick={handleSetNewApiKey}
              >
                <IonIcon icon={checkmarkOutline} />
              </button>
            ) : (
              <button
                type="button"
                className="w-11 text-xl"
                onClick={() => setEditApiKey(true)}
              >
                <IonIcon icon={createOutline} />
              </button>
            )}
          </div>
        </div>

        <div className="">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium   dark:text-gray-300"
          >
            Select Model
          </label>
          <select
            id="countries"
            defaultValue={selectedModal}
            onChange={(e) => handleModalChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {modalsList &&
              modalsList.map((modal) => (
                <option value={modal} key={modal}>
                  {modal}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Modal visible={confirmDeleteChats}>
        <ConfirmDelete
          onDelete={() => {
            clearAllChats();
            setConfirmDeleteChats(false);
          }}
          onCancel={() => setConfirmDeleteChats(false)}
        >
          <p className="text-gray-500 dark:text-gray-700">
            This will delete all your chats and messages. This action cannot be
            undone.
          </p>
        </ConfirmDelete>
      </Modal>
    </motion.div>
  );
}
