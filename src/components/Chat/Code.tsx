import { IonIcon } from "@ionic/react";
import useClipboard from "../../hooks/useClipboard";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import shortid from "shortid";
import { useEffect, useState } from "react";

export default function Code(props: { children: React.ReactNode }) {
  const { copy, copied } = useClipboard();
  const [myshortid, setShortId] = useState("");

  useEffect(() => {
    setShortId(shortid.generate());
  }, []);

  return (
    <>
      <code className={myshortid.concat("-mycode")}>{props.children}</code>
      <div className=" absolute top-0 right-0 m-2">
        {!copied ? (
          <button
            className="edit md:ml-8 text-teal-500 dark:text-teal-200 text-xl"
            onClick={() =>
              copy(
                document.querySelector(`.${myshortid.concat("-mycode")}`)
                  ?.textContent || ""
              )
            }
          >
            <IonIcon icon={clipboardOutline} />
          </button>
        ) : (
          <span className="dark:text-teal-200 text-teal-500 text-xl">
            <IonIcon icon={checkmarkOutline} />
          </span>
        )}
      </div>
    </>
  );
}
