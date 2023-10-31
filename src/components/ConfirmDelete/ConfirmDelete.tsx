import { motion } from "framer-motion";
import React from "react";
type Props = {
  onDelete: () => void;
  onCancel: () => void;
  children: React.ReactNode;
};

const varinats = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

export default function ConfirmDelete({ children, onDelete, onCancel }: Props) {
 
  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 bg-white rounded m-2 md:m-0"
    >
      <h2 className="text-xl font-medium mb-4 dark:text-black">
        Are you sure?
      </h2>
      {children}
      <div className="flex items-center justify-end mt-4">
        <button
          type="button"
          className="text-gray-500 mr-2 hover:bg-gray-200 p-1 px-2 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-800 text-white p-1 px-2 rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
