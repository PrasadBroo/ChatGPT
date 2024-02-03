import classNames from "classnames";
import Avatar from "../Avatar/Avatar";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { SyncLoader } from "react-spinners";
import useClipboard from "../../hooks/useClipboard";
import useBot from "../../hooks/useBot";
import { ChatMessageType } from "../../store/store";
import Markdown from "react-markdown";
import CodeHighlight from "../CodeHighlight/CodeHighlight";

type Props = {
  index: number;
  chat: ChatMessageType;
};

export default function TextMessage({ index, chat }: Props) {
  const { copy, copied } = useClipboard();
  const { result, error, isStreamCompleted, cursorRef } = useBot({
    index,
    chat,
  });
  return (
    <>
      <div className="flex items-start w-full">
        <div className="mr-4  rounded-md flex items-center flex-shrink-0">
          <Avatar className=" h-11 w-11" src="/imgs/bot.webp" />
        </div>

        {!result && !error ? (
          <div className=" self-center">
            <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
          </div>
        ) : (
          <div
            className={classNames(
              "  animate-preulse overflow-x-hidden whitespace-pre-wrap",
              { "text-red-500": error, "dark:text-gray-300": !error }
            )}
          >
            <Markdown
              children={result}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <CodeHighlight language={match[1]}>
                      {String(children).replace(/\n$/, "")}
                    </CodeHighlight>
                  ) : (
                    <code {...rest} className={className?.concat("language")}>
                      {children}
                    </code>
                  );
                },
              }}
            />

            {!isStreamCompleted && !chat.content && (
              <span
                className="ml-1 blink bg-gray-500 dark:bg-gray-200 h-4 w-1 inline-block"
                ref={cursorRef}
              ></span>
            )}
          </div>
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
    </>
  );
}
