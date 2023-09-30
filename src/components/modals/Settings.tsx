import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { closeOutline } from "ionicons/icons";
import { useSettings, useTheme } from "../../store/store";
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
  const [theme, setTheme] = useTheme((state) => [state.theme, state.setTheme]);
  const modalsList = useSettings((state) => state.settings.modalsList);
  const [setModal, selectedModal] = useSettings((state) => [
    state.setModal,
    state.settings.selectedModal,
  ]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendChatHistory(e.target.checked);
  }

  function handleModalChange(value: string) {
    setModal(value);
  }

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="settings rounded-md bg-gray-800 mx-2 md:mx-0 text-white dark:text-gray-300 w-full max-w-xl py-4"
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
        <div className="">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium  text-white dark:text-gray-300"
          >
            Select Modal
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
    </motion.div>
  );
}
