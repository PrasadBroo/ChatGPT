import classNames from "classnames";
import Avatar from "../Avatar/Avatar";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { SyncLoader } from "react-spinners";
import useClipboard from "../../hooks/useClipboard";
import useBot from "../../hooks/useBot";


type Props = {
  index:number;
};

export default function BotMessage({index }: Props) {
  const { copy, copied } = useClipboard();
  
  const { result, isStreamEnded,botRef } = useBot({index });

  return (
    <div className={classNames("py-4 bg-[#40414f] px-2 md:px-0")} ref={botRef}>
      <div className=" max-w-2xl mx-auto md:flex md:items-center group">
        <div className="flex items-start w-full">
          <div className="mr-4  rounded-md flex items-center flex-shrink-0">
            <Avatar
              size={11}
              src="https://freelogopng.com/images/all_img/1681038242chatgpt-logo-png.png"
            />
          </div>

          {!result ? (
            <div className=" self-center">
              <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
            </div>
          ) : (
            <pre
              className={classNames(
                "text-sm text-gray-300 animate-preulse overflow-x-hidden whitespace-pre-wrap"
              )}
            >
              {result}
              {!isStreamEnded && (
                <div className="ml-1 blink bg-gray-200 h-4 w-1 inline-block"></div>
              )}
            </pre>
          )}
        </div>
        <div className="mt-2 md:mt-0  text-right self-start">
          {!copied ? (
            <button
              className="edit md:ml-8 text-gray-200 text-xl"
              onClick={() => copy(result)}
            >
              <IonIcon icon={clipboardOutline} />
            </button>
          ) : (
            <span className="text-gray-200 text-xl">
              <IonIcon icon={checkmarkOutline} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
