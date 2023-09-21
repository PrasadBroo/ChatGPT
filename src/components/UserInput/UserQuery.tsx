import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { sendOutline, send } from "ionicons/icons";
import { useRef, useState } from "react";
import useChat from "../../store/store";

export default function UserQuery() {
  const [query, setQuery] = useState("");
  const formRef = useRef<null | HTMLFormElement>(null);
  const addChat = useChat((state) => state.addChat);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query) {
      addChat({ role: "user", content: query });
      addChat({ role: "assistant", content: "" });
      setQuery("");
    }
  }

  return (
    <form
      className="input shadow-md dark:bg-[#40414f]  p-2 border dark:border-none flex items-center   rounded-md"
      onSubmit={handleOnSubmit}
      ref={formRef}
    >
      <div className="w-11/12">
        <textarea
          name="query"
          className="h-6 px-2  w-full outline-none resize-none dark:bg-transparent dark:text-white"
          placeholder="Send a message"
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          autoFocus
        ></textarea>
      </div>
      <div className=" w-1/12 text-center">
        <button
          type="submit"
          className={classNames(
            " text-center text-gray-200 transition inline-flex items-center justify-center py-2 px-2 rounded-md",
            { "bg-green-500": query }
          )}
        >
          <IonIcon icon={query ? send : sendOutline} />
        </button>
      </div>
    </form>
  );
}
