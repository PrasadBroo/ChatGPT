import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
};

export default function Modal(props: Props) {
  const modal_cn = classNames(
    "modal font-Bungee fixed top-0 left-0 right-0 bottom-0  dark:bg-opacity-0  z-50 flex items-center justify-center",
    props.className
  );

  // useHideBodyOverflow(props.visible)

  return (
    <AnimatePresence>
      {props.visible && (
        <motion.div className={modal_cn}>{props.children}</motion.div>
      )}
    </AnimatePresence>
  );
}
