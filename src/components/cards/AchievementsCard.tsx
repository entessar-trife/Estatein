type CardProps = {
  title: string;
  description: string;
};

function AchievementsCard({ title, description }: CardProps) {
  return (
    <div
      className="h-full flex flex-col
            p-[30px] md:p-[10%]
            border-white90 dark:border-gray15 border
            shadow-[0px_0px_0px_4px_rgba(0,0,0,0.02)] dark:shadow-[0px_0px_0px_4px_#191919]
            lg-custom:shadow-[0px_0px_0px_6px_rgba(0,0,0,0.02)] lg-custom:dark:shadow-[0px_0px_0px_6px_#191919]
            2xl:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.02)] 2xl:dark:shadow-[0px_0px_0px_8px_#191919]
            rounded-[10px] 2xl:rounded-xl cursor-pointer
            transition-all duration-300 ease-in-out
            hover:-translate-y-1
            hover:shadow-[0px_10px_20px_rgba(112,59,247,0.3)] dark:hover:shadow-[0px_10px_20px_rgba(148,108,249,0.2)]
        "
    >
      <h2 className="text-black dark:text-white font-semibold text-[20px] lg-custom:text-2xl mb-4 2xl:text-[30px] md:mb-6 2xl:mb-[30px]">
        {title}
      </h2>
      <p className="text-gray40 dark:text-gray60 text-sm lg-custom:text-base 2xl:text-lg font-medium">
        {description}
      </p>
    </div>
  );
}

export default AchievementsCard;
