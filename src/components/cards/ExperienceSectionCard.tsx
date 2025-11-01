export type ExperienceSectionCardProps = {
  step: string;
  title: string;
  description: string;
};

const ExperienceSectionCard = ({ step, title, description}: ExperienceSectionCardProps) => {
  return (
    <div className="group  flex flex-col gap-0 items-start font-urbanist">
      <p className="text-black dark:text-white font-medium leading-[150%] text-base lg-custom:text-xl border-l border-l-[#703BF7] px-5 py-4 ">
        Step {step}
      </p>
      <div
        className=" bg-[linear-gradient(117deg,rgba(112,59,247,1)_0%,rgba(228,228,231,1)_24%)] dark:bg-[linear-gradient(117deg,rgba(112,59,247,1)_0%,rgba(38,38,38,1)_24%)]
          relative rounded-xl !rounded-tl-none w-full flex items-center justify-center p-[1px] transition-all duration-350 ease-out
          group-hover:bg-[linear-gradient(117deg,rgba(112,59,247,1)_0%,rgba(228,228,231,1)_100%)] dark:group-hover:bg-[linear-gradient(117deg,rgba(112,59,247,1)_0%,#1f1f1f_100%)]"
      >
        <div
          className="card flex flex-col items-start gap-[14px] lg-custom:gap-4 2xl:gap-5 p-[30px] lg-custom:p-[38px]  2xl:p-[50px] rounded-xl !rounded-tl-none 
                        !bg-[linear-gradient(120deg,#DBCEFD_0%,rgba(228,228,231,0.8)_12%)] dark:!bg-[linear-gradient(120deg,#271c44_0%,#141414_10%)]
                        min-h-[185px] lg-custom:min-h-[222px] 2xl:min-h-[267px] justify-start transition-all duration-350 ease-out
                        hover:bg-[linear-gradient(120deg,#DBCEFD_0%,rgba(228,228,231,0.8)_50%)] dark:hover:dark:!bg-[linear-gradient(120deg,#271c44_0%,#141414_50%)]"
        >
          <h2 className="text-black dark:text-white font-semibold text-lg md:text-xl 2xl:text-[26px] leading-[150%] line-clamp-1">
            {title}
          </h2>
          <p className="font-medium text-sm md:text-base 2xl:text-lg leading-[150%] text-gray40 dark:text-gray60 line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ExperienceSectionCard;
