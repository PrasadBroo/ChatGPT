import classNames from "classnames";

type Props = {
  size?: number;
  src?: string;
};

export default function Avatar({ size = 11, src }: Props) {
  const imgClass = classNames(`rounded h-${size} w-${size}`);
  return (
    <div className={classNames(`avatar rounded`)}>
      <img
        src={src ? src : "https://prasadbro.com/assets/prasadbro-4f9caa4a.jpg"}
        alt="avatar"
        className=" rounded h-11 w-11"
      />
    </div>
  );
}
