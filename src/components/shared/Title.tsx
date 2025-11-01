import TitleBtn from "../ui/TitleBtn";
import { useOneTimeAOS } from "../../hooks/useOneTimeAOS";

export type TitleProps = {
  starImg?: boolean;
  titleStyle?: string;
  heading: string;
  paragraph?: string | React.ReactNode;
  paragraphStyle?: string;
  buttonLabel?: string;
  anamation?: string;
  animKey?: string;
  navigateTo?: string;
  onClick?: () => void;
};

const Title = ({
  starImg = true,
  titleStyle,
  heading,
  paragraph,
  paragraphStyle,
  buttonLabel,
  anamation,
  animKey,
  navigateTo,
  onClick,
}: TitleProps) => {
  const ref = useOneTimeAOS(animKey);

  return (
    <div ref={ref} data-aos={anamation} className={`${titleStyle}`}>
      {starImg && (
        <div className="lg-custom:mb-1.5 2xl:mb-2.5">
          <img
            src="/assets/icons/MainTitle/stars.svg"
            alt="icon"
            className="2xl:w-[68px] 2xl:h-[30px] h-[24px] w-[45px] lg-custom:w-[54.72px] -ml-2 md:-ml-2.5 2xl:-ml-5"
          />
        </div>
      )}
      <div className="flex justify-between items-center 2xl:items-end gap-10">
        <div>
          <h2 className="text-black dark:text-white font-semibold text-[28px] lg-custom:text-[38px] 2xl:text-5xl mb-2 lg-custom:mb-2.5 2xl:mb-3.5 leading-[150%] ">
            {heading}
          </h2>
          <p
            className={`text-gray40 dark:text-gray60 text-sm lg-custom:text-base 2xl:text-lg font-medium ${paragraphStyle}`}
          >
            {paragraph}
          </p>
        </div>
        {buttonLabel && (
          <div className="hidden md:block">
            <TitleBtn
              label={buttonLabel}
              navigateTo={navigateTo}
              onClick={onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Title;
