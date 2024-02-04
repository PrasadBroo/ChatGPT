import { useCallback, useEffect, useState } from "react";
import { ImageSize, generateImage } from "../services/chatService";
import useChat, { ChatMessageType } from "../store/store";
import { createMessage } from "../utils/createMessage";

export default function useImage(
  index: number,
  chat: ChatMessageType,
  size: ImageSize = "512x512"
) {
  const [image, setImage] = useState(chat.content);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, addChat] = useChat((state) => [
    state.chats[index - 1].content,
    state.addChat,
  ]);

  const fetchImages = useCallback(handleFetchImages, [
    query,
    size,
    addChat,
    index,
  ]);

  async function handleFetchImages(signal?: AbortSignal) {
    setLoading(true);
    await generateImage(query as string, size, 1, signal)
      .then((image) => {
        setImage(image.data[0].url);
        addChat(
          createMessage("assistant", image.data[0].url, "image_url"),
          index
        );
      })
      .catch((error) => {
        console.log("got error");
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (chat.content) return;
    fetchImages(signal);
    return () => {
      console.log("aborting");
      controller.abort();
      console.log("aborted");
      setError(null);
      setLoading(true);
    };
  }, [fetchImages, chat.content]);

  function refetchImages() {
    handleFetchImages();
  }

  return { image, loading, error, refetchImages };
}
