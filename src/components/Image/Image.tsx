type Props = {
  src: string;
};
export default function Image({ src }: Props) {
  return (
    <div className="">
      <img src={src} alt="bot_response_image" className=" h-auto w-full" />
    </div>
  );
}
