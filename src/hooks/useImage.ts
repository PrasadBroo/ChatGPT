import { useCallback, useEffect, useState } from "react";
import { ImageSize, generateImage } from "../services/chatService";
import useChat, { ChatMessageType } from "../store/store";
import { createMessage } from "../utils/createMessage";


export default function useImage(index: number,chat:ChatMessageType, size:ImageSize = "512x512") {
  const [images, setImages] = useState(chat.content);
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

  async function handleFetchImages() {
    setLoading(true);
    await generateImage(query as string, size, 1)
      .then((image) => {
        setImages(image.data);
        addChat(createMessage("assistant", image.data, "image_url"), index);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (images.length !== 0) return;
    fetchImages();
  }, [fetchImages, images.length]);

  function refetchImages() {
    handleFetchImages();
  }

  return { images, loading, error, refetchImages };
}
