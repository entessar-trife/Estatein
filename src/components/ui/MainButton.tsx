import { type ReactNode } from "react";

type BtnVaritans = "normalPurple" | "darkBg" | "lightMode";

type MainButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant: BtnVaritans;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const MainButton = ({
  children,
  onClick,
  className,
  variant,
  disabled = false,
  type = "button",
}: MainButtonProps) => {
  const buttonVariants = {
    normalPurple:
      "bg-purple90 dark:bg-purple60 text-black dark:text-white dark:hover:bg-purple60/80 hover:bg-purple70/60",
    darkBg:
      "bg-white97 dark:bg-gray10 text-black dark:text-white border border-white90 dark:border-gray15 hover:bg-gray10/60",
    lightMode: "",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-[14px] huge:py-[18px] text-center px-5 rounded-lg huge:rounded-[10px]
            text-sm huge:text-lg font-medium leading-[150%] cursor-pointer 
            focus:outline-none focus:ring-2 focus:ring-opacity-75 duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className} ${buttonVariants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MainButton;
