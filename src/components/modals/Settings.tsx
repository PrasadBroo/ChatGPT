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
const tabs = ["settings", "profile"];
export default function Settings() {
  const [selectedTab, setSelectedTab] = useState(
    "settings"
  );
  const setModalVisible = useSettings((state) => state.setModalVisible);

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="tabs rounded-md bg-white dark:bg-gray-800 mx-2 md:mx-0 text-gray-500 dark:text-gray-300 w-full max-w-xl py-4 transition-all"
    >
      <div className="flex items-center justify-between px-2">
        <div className="">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={classNames("mr-2 p-2 rounded-t-lg capitalize", {
                "bg-gray-200 dark:bg-gray-700 border-2 border-b-0 border-blue-600":
                  selectedTab === tab,
              })}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
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
      <SettingsTab visible={selectedTab === "settings"} />
      <ProfileTab visible={selectedTab === "profile"} />
    </motion.div>
  );
}
