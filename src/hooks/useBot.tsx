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
  const cursorRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isStreamCompleted, setIsStreamCompleted] = useState(false);
  const query = useChat((state) => state.chats[index - 1].content);
  const [chats, addChat] = useChat((state) => [state.chats, state.addChat]);

  const scrollToBottom = useDebouncedCallback(() => {
    if (!cursorRef.current) return;
    cursorRef.current.scrollIntoView(true);
  }, 50);

  function handleOnData(data: string) {
    resultRef.current += data;
    setResult((prev) => prev + data);
    scrollToBottom();
  }

  function handleOnError(error: Error | string) {
    if(typeof error === "string") setError(error);
    else setError(error.message);
    setIsStreamCompleted(true);
    scrollToBottom();
  }

  function handleOnCompletion() {
    setHistory([...history, resultRef.current]);
    addChat({ role: "assistant", content: resultRef.current }, index);
    setIsStreamCompleted(true);
  }

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    let signal = controller.signal;
    setResult("");
    resultRef.current = "";
    setIsStreamCompleted(false);
    setError("");
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

  return { query, result,error, isStreamCompleted, cursorRef };
}
