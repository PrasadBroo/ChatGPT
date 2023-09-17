import classNames from "classnames";
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import axios from "axios";
import { gptConfig } from "../../services/chatService";
import { SyncLoader } from "react-spinners";
import useClipboard from "../../hooks/useClipboard";
import useChat from "../../store/store";

type Props = {
  query: string;
};

export default function BotMessage({ query }: Props) {
  const [result, setResult] = useState("");
  const { copy, copied } = useClipboard();
  const addChat = useChat((state) => state.addChat);
  const chats = useChat((state) => state.chats);

  function updateResults(result: string, onCompletion: (chat: string) => void) {
    setResult(result);
    onCompletion(result);
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios(gptConfig(query, chats));
        if (!mounted) return;
        updateResults(data.choices[0].message.content, (result) =>
          addChat({ role: "assistant", content: result })
        );
      } catch (error) {
        if (!mounted) return;
        updateResults("Sorry, looks like I'm having a bad day.", (result) =>
          addChat({ role: "assistant", content: result })
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, [query]);

  return (
    <div className={classNames("py-4 bg-[#40414f] px-2 md:px-0")}>
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
