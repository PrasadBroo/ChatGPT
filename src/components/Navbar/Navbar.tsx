import classnames from "classnames";
import ChatHistory from "./ChatHistory";
import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import {
  addOutline,
  personOutline,
  chatboxEllipsesOutline,
  settingsOutline,
  logOutOutline,
  ellipsisHorizontalOutline,
  closeOutline,
} from "ionicons/icons";
import useChat, { useSettings } from "../../store/store";
import Settings from "../modals/Settings";
import Modal from "../modals/Modal";

export default function Navbar({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (v: boolean) => void;
}) {
  const addNewChat = useChat((state) => state.addNewChat);
  const [isVisible, setModalVisible] = useSettings((state) => [
    state.isModalVisible,
    state.setModalVisible,
  ]);

  return (
    <>
      <div
        className={classnames(
          "navwrap fixed duration-500 top-0 left-0 bottom-0 right-0 z-30 bg-gray-500 md:bg-opacity-0 ",
          { "bg-opacity-60 ": active, "opacity-0 pointer-events-none": !active }
        )}
      >
        <nav
          className={classnames(
            " absolute left-0 bottom-0 top-0  md:flex-grow-1 w-9/12 md:w-[260px] bg-[#202123] text-white z-10 flex flex-col transition duration-500",
            { "translate-x-0": active, "-translate-x-[150%]": !active }
          )}
        >
          <div className="flex mb-2  items-center justify-between gap-2 p-2">
            <button
              type="button"
              className=" border border-gray-500 p-2 w-full  md:w-auto  rounded-md text-left flex-grow flex"
              onClick={addNewChat}
            >
              <span className="mr-2 text-xl">
                <IonIcon icon={addOutline} />
              </span>
              <span>New chat</span>
            </button>
            <button
              type="button"
              className="border h-10 w-10 border-gray-500 rounded-md p-2 hidden md:inline-block text-gray-200"
              onClick={() => setActive(false)}
            >
              <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>
          </div>
          <div className="history overflow-y-auto flex-grow ">
            <ChatHistory />
          </div>
          <div className="account absolute left-0 font-bold right-0 bottom-0 text-sm z-20 bg-[#202123] border-t border-gray-500 shadow  ">
            <div className="px-2 py-2 flex items-center">
              <span className="inline-block text-xl">
                <IonIcon icon={personOutline} />
              </span>
              <button className="p-2 inline-block">Upgrade to Plus</button>
              <span className=" uppercase text-black p-1 font-normal rounded ml-auto inline-block bg-orange-200">
                new
              </span>
            </div>

            <div className="px-2 relative py-2 flex items-center hover:bg-gray-700 transition group">
              <div className=" absolute bottom-12 rounded-md left-0 right-0 bg-gray-800 font-normal invisible transition  m-2 z-30 text-gray-300 group-hover:visible">
                <button className=" p-2   hover:bg-gray-700 w-full text-left flex items-center">
                  <span className="mr-2 p-1 text-xl  flex items-center">
                    <IonIcon icon={chatboxEllipsesOutline} />
                  </span>
                  <span>Custom instructions</span>
                </button>
                <button
                  className=" p-2   hover:bg-gray-700 w-full text-left flex items-center"
                  onClick={() => setModalVisible(true)}
                >
                  <span className="mr-2 p-1  text-xl flex items-center">
                    <IonIcon icon={settingsOutline} />
                  </span>
                  <span>Settings</span>
                </button>
                <div className="h-[1px] bg-gray-300"></div>
                <button className=" p-2   hover:bg-gray-700  w-full  text-left flex items-center">
                  <span className="mr-2 p-1 text-xl flex items-center">
                    <IonIcon icon={logOutOutline} />
                  </span>
                  <span>Log out</span>
                </button>
              </div>
              <Avatar />

              <span className="p-2">Prasadbro</span>
              <button className=" ml-auto  text-gray-400 text-2xl">
                <IonIcon icon={ellipsisHorizontalOutline} />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="close md:hidden absolute top-2 h-10 w-10 border-2 -right-10  p-2 flex items-center justify-center"
          >
            <span className=" text-2xl flex">
              <IonIcon icon={closeOutline} />
            </span>
          </button>
        </nav>
      </div>
      <Modal visible={isVisible}>
        <Settings />
      </Modal>
    </>
  );
}
