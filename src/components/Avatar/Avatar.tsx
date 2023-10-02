import classNames from "classnames";
import { useAuth } from "../../store/store";

type Props = {
  children?: React.ReactNode;
  src?: string;
  className?: string;
};

export default function Avatar({ src, children, className }: Props) {
  const imgClass = classNames(`rounded`, className);
  const avatar = useAuth((state) => state.user.avatar);
  return (
    <div className={classNames(`avatar rounded relative`)}>
      <img src={src ? src : avatar} alt="avatar" className={imgClass} />
      {children}
    </div>
  );
}
