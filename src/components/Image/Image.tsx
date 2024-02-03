type Props = {
  src: string;
};
export default function Image({ src }: Props) {
  return (
    <div className=" flex items-center flex-grow">
      <img
        src={src}
        alt="bot_response_image"
        className=" h-auto w-full m-2 object-cover"
      />
    </div>
  );
}
