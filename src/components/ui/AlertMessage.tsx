import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

import AlertIcon from "../icons/AlertIcon";

type FormAlertProps = {
  message: string;
  onClose: () => void;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    } as Transition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

function AlertMessage({ message, onClose }: FormAlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />

      <motion.div
        key="card"
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
      >
        <div
          className=" bg-white dark:bg-gray08 border dark:border-gray15 border-white90 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative flex flex-col justify-center items-center gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <AlertIcon />
          <p className=" text-gray40 dark:text-gray60 text-sm lg-custom:text-base 2xl:text-lg font-medium leading-[150%]">
            {message}
          </p>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AlertMessage;
