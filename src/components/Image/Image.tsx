type Props = {
  src: string;
};
export default function Image({ src }: Props) {
  return (
    <div className=" flex items-center ">
      <img src={src} alt="bot_response_image" className=" h-auto w-full m-2" />
    </div>
  );
}
