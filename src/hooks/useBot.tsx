import { useEffect, useRef, useState } from "react";
import useChat from "../store/store";
import { fetchResults } from "../services/chatService";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  index: number;
};

export default function useBot({ index }: Props) {
  const [history, setHistory] = useState<string[]>([]);
  const resultRef = useRef("");
  const botRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");
  const [isStreamEnded, setIsStreamEnded] = useState(false);
  const query = useChat((state) => state.chats[index - 1].content);
  const [chats, addChat] = useChat((state) => [state.chats, state.addChat]);
  const scrollToBottom = useDebouncedCallback(
    () => window.scrollTo(0, botRef.current?.scrollHeight ?? 0),
    100
  );

  function handleOnData(data: string) {
    resultRef.current += data;
    setResult((prev) => prev + data);
    scrollToBottom();
  }

  function handleOnError(error: Error | string) {
    setResult("Sorry, looks like I'm having a bad day.");
  }

  function handleOnCompletion() {
    setHistory([...history, resultRef.current]);
    addChat({ role: "assistant", content: resultRef.current }, index);
    setIsStreamEnded(true);
  }

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    let signal = controller.signal;
    setResult("");
    resultRef.current = "";
    (async () => {
      try {
       await fetchResults(
          chats.slice(0, index),
          signal,
          handleOnData,
          handleOnCompletion
        );
      } catch (error) {
        if (error instanceof Error || typeof error === "string") {
          if (mounted) handleOnError(error);
        }
      }
    })();
    return () => {
      controller.abort();
      mounted = false;
    };
  }, [query]);

  return { query, result, isStreamEnded, botRef };
}
