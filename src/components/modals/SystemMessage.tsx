import { motion } from "framer-motion";
import { useSettings } from "../../store/store";
import { useState } from "react";

const varinats = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export default function SystemMessage() {
  const [
    systemMessage,
    useSystemMessageForAllChats,
    setSystemMessage,
    setSystemMessageModalVisible,
  ] = useSettings((state) => [
    state.settings.systemMessage,
    state.settings.useSystemMessageForAllChats,
    state.setSystemMessage,
    state.setSystemMessageModalVisible,
  ]);
  const [message, setMessage] = useState(systemMessage);
  const [useForAllChats, setUseForAllChats] = useState(
    useSystemMessageForAllChats
  );

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSystemMessage({ message, useForAllChats });
    setSystemMessageModalVisible(false);
  }
  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="sys-msg p-2  rounded-md bg-white dark:bg-gray-800 mx-2 md:mx-0 text-gray-500 dark:text-gray-300 w-full max-w-xl py-4"
    >
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="sysmsg" className=" inline-block mb-2">
          System Message
        </label>

        <textarea
          name="sysmsg"
          id="sysmsg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" w-full focus:outline-none outline outline-gray-200 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 dark:bg-gray-700 dark:text-gray-300 rounded-md p-2"
          placeholder="Your system message here"
          maxLength={1500}
        ></textarea>
        <div className="mt-2 flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <label
            htmlFor="default-checkbox"
            className="ml-2  font-medium  dark:text-gray-300"
          >
            Use for all chats
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={useForAllChats}
              onChange={(e) => setUseForAllChats(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className=" bg-green-400 text-white px-4 py-2 rounded mr-2"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => setSystemMessageModalVisible(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
