import { IonIcon } from "@ionic/react";
import useImage from "../../hooks/useImage";
import Avatar from "../Avatar/Avatar";
import Image from "../Image/Image";
import ImageSkeleton from "../Skeleton/ImageSkeleton";
import { downloadOutline, checkmarkOutline } from "ionicons/icons";
import { useState } from "react";
import { ChatMessageType } from "../../store/store";

type Props = {
  index: number;
  chat: ChatMessageType;
};

export default function ImageMessage({ index,chat }: Props) {
  const { loading, error, images } = useImage(index,chat);
  const [isImagesDownloaded, setIsImagesDownloaded] = useState(false);

  const handleDownload = () => {
    setIsImagesDownloaded(true);
  };

  return (
    <div className="flex items-start w-full">
      <div className="mr-4  rounded-md flex items-center flex-shrink-0">
        <Avatar className=" h-11 w-11" src="/imgs/bot.webp" />
      </div>
      <div className=" image border-4 border-teal-700 rounded flex-grow">
        {loading && (
          <div className=" h-[500px] w-[500px]">
            <ImageSkeleton />
          </div>
        )}
        {error && <p>{error}</p>}
        <div className=" flex items-center flex-wrap">
          {images &&
            images.map((image) => <Image src={image.url} key={image.url} />)}
        </div>
      </div>
      <div className=" text-xl dark:text-gray-200  text-gray-500">
        {!isImagesDownloaded ? (
          <button
            className="edit md:ml-8 text-gray-500 dark:text-gray-200 text-xl"
            onClick={handleDownload}
          >
            <IonIcon icon={downloadOutline} />
          </button>
        ) : (
          <span className="dark:text-gray-200 text-gray-500 text-xl">
            <IonIcon icon={checkmarkOutline} />
          </span>
        )}
      </div>
    </div>
  );
}
