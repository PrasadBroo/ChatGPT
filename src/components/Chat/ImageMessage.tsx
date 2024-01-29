import useImage from "../../hooks/useImage";
import Image from "../Image/Image";

type Props = {
  index: number;
};

export default function ImageMessage({ index }: Props) {
  const { loading, error, images } = useImage(index);

  return (
    <div className=" image h-72 w-56 bg-gray-400">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {images && images.map((image) => <Image src={image.url} />)}
    </div>
  );
}
