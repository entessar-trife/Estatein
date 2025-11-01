import { useNavigate } from "react-router-dom";

type Props = {
  label: string;
  btnStyle?: boolean;
  onClick?: () => void;
  className?: string;
  navigateTo?: string;
};

const TitleBtn = ({
  label,
  btnStyle,
  onClick,
  className,
  navigateTo,
}: Props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
        {
          navigateTo && navigate(navigateTo);
        }
      }}
      className={`${
        btnStyle ? " w-full md:w-auto " : ""
      } ${className} py-3.5 px-5 2xl:py-[18px] 2xl:px-6 bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 whitespace-nowrap rounded-lg 2xl:rounded-[10px] text-black dark:text-white text-sm 2xl:text-lg font-medium hover:bg-white95 dark:hover:bg-gray08/80`}
    >
      {label}
    </button>
  );
};

export default TitleBtn;
