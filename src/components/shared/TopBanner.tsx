import { Link } from "react-router-dom";
import type { FC } from "react";

type TopBannerProps = {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  link: string;
  linkText: string;
  closeIconAlt?: string;
};

const TopBanner: FC<TopBannerProps> = ({
  isVisible,
  onClose,
  message,
  link,
  linkText,
  closeIconAlt = "Close Banner",
}) => {
  return (
    <div
      className={`h-[78px] lg-custom:h-[49px] 2xl:h-[63px] relative z-50 border-b border-b-white90 dark:border-b-gray15 bg-white97 dark:bg-gray10 bg-[url("/assets/images/TopBanner/AbstractDesign2.webp")] lg-custom:bg-[url("/assets/images/TopBanner/AbstractDesign.webp")] bg-no-repeat bg-cover transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full"
      }`}
      role="region"
      aria-label="Top promotional banner"
    >
      <div className="bg-white90/70 dark:bg-gray15/70 w-full h-full absolute -z-30 "></div>
      <div className="huge:max-w-[1625px] huge:mx-auto flex items-center px-4 md:py-3.5 2xl:py-[18px] h-full">
        <div className="flex-1 flex justify-start md:justify-center gap-1.5 2xl:gap-2.5 text-[10px] min-[380px]:text-xs md:text-sm 2xl:text-lg font-medium leading-[150%] text-black dark:text-white">
          <p>{message}</p>
          <Link
            to={link}
            className="underline decoration-[0px] hover:text-purple60 duration-300"
          >
            {linkText}
          </Link>
        </div>

        <button
          className="ml-auto dark:bg-white/10 bg-black rounded-full w-[26px] h-[26px] 2xl:h-8 2xl:w-8 p-1 flex items-center justify-center"
          onClick={onClose}
          aria-label="Close top banner"
        >
          <img src="/assets/icons/close.svg" alt={closeIconAlt} />
        </button>
      </div>
    </div>
  );
};

export default TopBanner;
