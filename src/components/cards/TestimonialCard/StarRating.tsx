type StarRatingProps = {
  rate: number;
};

const StarRating = ({ rate }: StarRatingProps) => {
  if (!rate || rate <= 0) return null;

  return (
    <div className="flex gap-2 2xl:gap-2.5 ">
      {Array.from({ length: rate }).map((_, i) => (
        <div
          key={i}
          className="flex justify-center items-center p-1.5 lg-custom:p-2 2xl:p-2.5 dark:bg-gray10 bg-white97 border dark:border-gray15 border-white90 rounded-full w-[30px] h-[30px] lg-custom:w-[38px] lg-custom:h-[36px] 2xl:w-11 2xl:h-11"
        >
          <img
            src="/assets/icons/clients/star.svg"
            alt="star"
            aria-label="rating star"
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
