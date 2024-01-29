import { useEffect, useState } from "react";
import { IMAGE, generateImage } from "../services/chatService";
import useChat from "../store/store";

export default function useImage(index: number) {
  const [images, setImages] = useState<IMAGE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const query = useChat((state) => state.chats[index - 1].content);

  useEffect(() => {
    setLoading(true);
    generateImage(query, "512x512", 1)
      .then((image) => {
        setImages(image.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return { images, loading, error, generateImage };
}
