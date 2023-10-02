import classNames from "classnames";
import Avatar from "../Avatar/Avatar";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { SyncLoader } from "react-spinners";
import useClipboard from "../../hooks/useClipboard";
import useBot from "../../hooks/useBot";
import { ChatMessageType } from "../../store/store";
import { motion } from "framer-motion";

const variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type Props = {
  index: number;
  chat: ChatMessageType;
};

export default function BotMessage({ index, chat }: Props) {
  const { copy, copied } = useClipboard();

  const { result, error, isStreamCompleted, cursorRef } = useBot({
    index,
    chat,
  });

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
        <div className="flex items-start w-full">
          <div className="mr-4  rounded-md flex items-center flex-shrink-0">
            <Avatar className=" h-11 w-11" src="/imgs/bot.webp" />
          </div>

          {!result && !error ? (
            <div className=" self-center">
              <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
            </div>
          ) : (
            <pre
              className={classNames(
                "text-sm  animate-preulse overflow-x-hidden whitespace-pre-wrap",
                { "text-red-500": error, "dark:text-gray-300": !error }
              )}
            >
              {result}

              {!isStreamCompleted && !chat.content && (
                <div
                  className="ml-1 blink bg-gray-500 dark:bg-gray-200 h-4 w-1 inline-block"
                  ref={cursorRef}
                ></div>
              )}
            </pre>
          )}
        </div>
        <div className="mt-2 md:mt-0  text-right self-start">
          {!copied ? (
            <button
              className="edit md:ml-8 text-gray-500 dark:text-gray-200 text-xl"
              onClick={() => copy(result)}
            >
              <IonIcon icon={clipboardOutline} />
            </button>
          ) : (
            <span className="dark:text-gray-200 text-gray-500 text-xl">
              <IonIcon icon={checkmarkOutline} />
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
