import { useState } from "react";
import SettingsTab from "../Tabs/SettingsTab";
import { motion } from "framer-motion";
import classNames from "classnames";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";
import ProfileTab from "../Tabs/ProfileTab";

const varinats = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState<"settings" | "profile">(
    "settings"
  );
  const setModalVisible = useSettings((state) => state.setModalVisible);

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="tabs rounded-md bg-white dark:bg-gray-800 mx-2 md:mx-0 text-gray-500 dark:text-gray-300 w-full max-w-xl py-4"
    >
      <div className="flex items-center justify-between px-2">
        <div className="">
          <button
            type="button"
            className={classNames("mr-2 p-2 rounded-t-lg", {
              "bg-gray-200 dark:bg-gray-700 border-2 border-b-0 border-blue-600":
                selectedTab === "settings",
            })}
            onClick={() => setSelectedTab("settings")}
          >
            Settings
          </button>
          <button
            type="button"
            className={classNames(" p-2  rounded-t-lg", {
              "bg-gray-200 dark:bg-gray-700 border-2 border-b-0 border-blue-600":
                selectedTab === "profile",
            })}
            onClick={() => setSelectedTab("profile")}
          >
            Profile
          </button>
        </div>
        <div className="p-2 ">
          <button
            className={classNames(" flex hover:text-red-300 text-xl")}
            onClick={() => setModalVisible(false)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-500"></div>
      {selectedTab === "settings" && <SettingsTab />}
      {selectedTab === "profile" && <ProfileTab />}
    </motion.div>
  );
}
