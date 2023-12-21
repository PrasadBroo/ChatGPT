import { IonIcon } from "@ionic/react";
import { informationCircleOutline, closeCircleOutline } from "ionicons/icons";
import { useAuth } from "../../store/store";
import { useState } from "react";
import { motion } from "framer-motion";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};
const apiKeyLength = 40;

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
      className="dark:bg-gray-700 text-gray-700 dark:text-gray-300 border bg-white border-blue-400 max-w-xl w-full p-3 rounded-md mx-2 md:mx-0"
    >
      <div className=" text-right">
        <button
          type="button"
          className=" text-xl"
          onClick={() => setApiKey("sk-")}
        >
          <IonIcon icon={closeCircleOutline} />
        </button>
      </div>
      <h2 className="text-xl font-medium   text-center my-2">
        Enter your apikey
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="sk-################################"
          onChange={(e) => setUserApikey(e.target.value)}
          autoFocus
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        <div className=" flex items-center mt-4">
          <span className=" flex items-center ">
            <IonIcon icon={informationCircleOutline} />
          </span>
          <span className="ml-2 text-sm font-medium">
            Your api key is stored in your own browser
          </span>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            disabled={userapikey.length < apiKeyLength}
            className="mt-4 py-2.5 disabled:cursor-not-allowed disabled:bg-white  px-5 text-sm font-medium disabled:text-gray-900 focus:outline-none bg-green-500 text-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
}
