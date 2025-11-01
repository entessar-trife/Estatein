import type { CommonCardProps } from "../../types/CommonCard";

const ValueCard = ({
  cardImg,
  cardTitle,
  titleStyle,
  titleSize = "text-xl lg-custom:text-2xl",
  cardDesc,
  cardStyle,
  children,
}: CommonCardProps) => {
  return (
    <div
      className={`bg-white99 dark:bg-gray08 flex flex-col justify-center gap-3.5 lg-custom:gap-4 2xl:gap-5 group ${cardStyle}`}
    >
      {children}
      <div
        className={`flex gap-2.5 md:gap-4 2xl:gap-5 items-center ${titleStyle}`}
      >
        <img
          className="border border-purple90 dark:border-purple60 p-3.5 2xl:p-5 lg-custom:p-4 rounded-full group-hover:-translate-y-1 duration-300 ease-in-out"
          src={cardImg}
          alt="card image"
        />
        <h5
          className={`text-black dark:text-white font-semibold group-hover:text-purple75 transition-colors duration-300 ${titleSize}`}
        >
          {cardTitle}
        </h5>
      </div>
      {cardDesc && (
        <p className="text-sm md:text-base 2xl:text-lg font-medium leading-[150%] text-gray40 dark:text-gray60">
          {cardDesc}
        </p>
      )}
    </div>
  );
};

export default ValueCard;
