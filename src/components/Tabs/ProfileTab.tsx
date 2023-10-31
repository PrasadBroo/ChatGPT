import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import { createOutline, pencilOutline, checkmark } from "ionicons/icons";
import { useAuth } from "../../store/store";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ProfileTab({visible}: {visible: boolean}) {
  const [avatar, name, setUser] = useAuth((state) => [
    state.user.avatar,
    state.user.name,
    state.setUser,
  ]);
  const [editName, setEditName] = useState(false);
  const [myname, setMyName] = useState(name);

  function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64String = reader.result;
        setUser({
          avatar: base64String as string,
          name,
          email: `${name}@${name}.com`,
        });
      };
    }
  }

  function handleUpdateName() {
    if (myname.trim().length === 0) return;
    setUser({
      avatar,
      name: myname,
      email: `${myname}@${myname}.com`,
    });
    setEditName(false);
  }

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classNames("p-2",{hidden: !visible})}
    >
      <div className="profile-pic group flex items-center justify-center relative">
        <input
          type="file"
          name="pic"
          accept="image/*"
          className=" hidden"
          id="pic-file"
          onChange={handlePicChange}
        />
        <Avatar
          className="avatar  h-20 w-20 ring-2 rounded-full object-cover ring-gray-300 p-1 dark:ring-gray-500"
          src={avatar}
        >
          <button
            type="button"
            onClick={() => {
              const fileInput = document.getElementById(
                "pic-file"
              ) as HTMLInputElement;
              fileInput.click();
            }}
            className="invisible absolute z-10 top-0 left-0 right-0 bottom-0 group-hover:visible  transition rounded-full  bg-gray-700 bg-opacity-50  flex items-center justify-center"
          >
            <IonIcon icon={pencilOutline} className="text-xl text-gray-100" />
          </button>
        </Avatar>
      </div>
      <div className="my-4 ">
        {!editName && (
          <div className="flex items-center justify-center">
            <span className="mr-2">{myname}</span>
            <button
              type="button"
              title="Edit name"
              className="flex items-center"
              onClick={() => setEditName(true)}
            >
              <IonIcon icon={createOutline} className=" dark:text-gray-100" />
            </button>
          </div>
        )}
        {editName && (
          <div className="flex items-center justify-center">
            <input
              type="text"
              id="name"
              value={myname}
              onChange={(e) => setMyName(e.target.value)}
              className="bg-gray-50 border w-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={myname}
              required
            />
            <button
              type="button"
              className="flex items-center ml-2 text-xl"
              onClick={handleUpdateName}
            >
              <IonIcon icon={checkmark} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
