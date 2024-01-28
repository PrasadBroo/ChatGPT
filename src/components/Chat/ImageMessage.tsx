import React, { useEffect } from "react";
import { generateImage } from "../../services/chatService";

export default function ImageMessage() {
  const [image, setImage] = React.useState("");
  useEffect(() => {
    (async () => {
      const image = await generateImage("cute dog", "256x256", 1);
      console.log(image);
      setImage(image.data[0].url);
    })();
  }, []);
  return (
    <div className=" image h-72 w-56 bg-gray-400">
      <img src={image} alt="bot_response_image" className=" " />
    </div>
  );
}
