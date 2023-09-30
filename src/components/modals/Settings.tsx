import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { closeOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";
import { motion } from "framer-motion";

const varinats = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export default function Settings() {
  const [sendChatHistory, setSendChatHistory, setModalVisible] = useSettings(
    (state) => [
      state.settings.sendChatHistory,
      state.setSendChatHistory,
      state.setModalVisible,
    ]
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendChatHistory(e.target.checked);
  }
  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="settings rounded-md bg-gray-800 mx-2 md:mx-0 dark:text-gray-300 w-full max-w-xl  h-40"
    >
      <div className="p-2 flex items-center justify-between">
        <h2 className=" ">Settings</h2>
        <button
          className={classNames(" flex hover:text-red-300 text-xl")}
          onClick={() => setModalVisible(false)}
        >
          <IonIcon icon={closeOutline} />
        </button>
      </div>
      <div className="w-full h-[1px] bg-gray-500"></div>
      <div className="p-2">
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
      </div>
    </motion.div>
  );
}
