import classNames from "classnames";
import { ChatMessageType } from "../../store/store";
import { motion } from "framer-motion";

import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";

const variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

type Props = {
  index: number;
  chat: ChatMessageType;
};

export default function BotMessage({ index, chat }: Props) {
  return (
    <div
      className={classNames("py-4 bg-gray-100 dark:bg-[#40414f] px-2 md:px-0")}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className=" max-w-2xl mx-auto md:flex md:items-center group"
      >
        {chat.type && chat.type === "image_url" ? (
          <ImageMessage index={index} chat={chat}/>
        ) : (
          <TextMessage index={index} chat={chat} />
        )}
      </motion.div>
    </div>
  );
}
