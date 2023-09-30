import { IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useAuth } from "../../store/store";
import { useState } from "react";
import { motion } from "framer-motion";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export default function Apikey() {
  const [userapikey, setUserApikey] = useState("");
  const { setApiKey } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiKey(userapikey);
  }

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="dark:bg-gray-700 max-w-xl w-full p-3 rounded-md mx-2 md:mx-0"
    >
      <h2 className="text-xl font-medium text-gray-900 dark:text-white  text-center my-2">
        Enter your apikey
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="sk-################################"
          onChange={(e) => setUserApikey(e.target.value)}
          autoFocus
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        <div className=" flex items-center mt-4">
          <span className="dark:text-gray-300 flex items-center">
            <IonIcon icon={informationCircleOutline} />
          </span>
          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your api key is stored in your own browser
          </span>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
}
