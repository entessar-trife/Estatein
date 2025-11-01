import MainButton from "../ui/MainButton";

interface Client {
  id?: string;
  title?: string;
  name?: string;
  domain?: string;
  category?: string;
  review?: string;
  since?: string;
  website?: string;
}

function ClientCard({ since, title, domain, category, review, website }: Client) {
  return (
    <div
      className="bg-white99 dark:bg-gray08 
        border border-white90 dark:border-gray15
        rounded-xl p-6 lg-custom:p-[40px] 2xl:p-[50px] 
        shadow-[0px_0px_0px_6px_#f1f1f3] dark:shadow-[0px_0px_0px_6px_#191919] 
        lg-custom:shadow-[0px_0px_0px_8px_#f1f1f3] dark:lg-custom:shadow-[0px_0px_0px_8px_#191919] 
        flex flex-col gap-[30px] 2xl:gap-[40px] h-full
        hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent 
       dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out"
    >
      <div className="flex xl:items-center justify-between gap-5 lg-custom:gap-[30px] flex-col items-start xl:flex-row">
        <div className="flex flex-col w-full sm:w-max">
          <span className="text-sm lg-custom:text-base 2xl:text-lg font-medium leading-[150%] text-gray40 dark:text-gray60">
            Since {since}
          </span>
          <h4 className="font-semibold text-xl lg-custom:text-2xl 2xl:text-[30px] text-gray08 dark:text-white leading-[150%]">
            {title}
          </h4>
        </div>
        <MainButton
          variant="darkBg"
          className="max-xl:w-full py-[14px] px-5 2xl:px-6"
        >
          <a href={website}>Visit Website </a>
        </MainButton>
      </div>

      <div className="grid grid-cols-2 gap-4 lg-custom:gap-5 2xl:gap-[30px]">
        <div className="icon_and_text flex flex-col gap-1 lg-custom:gap-[6px] 2xl:gap-2">
          <div className="flex items-center gap-0.5 lg-custom:gap-1 2xl:gap-[6px]">
            <img src="/assets/icons/ValuedClients/domain.svg" alt="icon" />
            <span className="text-xs lg-custom:text-sm 2xl:text-lg text-gray40 dark:text-gray60 font-medium leading-[150%]">
              Domain
            </span>
          </div>
          <span className="text-sm lg-custom:text-base 2xl:text-xl text-gray08 dark:text-white font-medium leading-[150%]">
            {domain}
          </span>
        </div>
        <div className="icon_and_text_two flex flex-col gap-1 lg-custom:gap-[6px] 2xl:gap-2 border-l border-white90 dark:border-gray15 pl-4 lg-custom:pl-5 2xl:pl-[30px]">
          <div className="flex items-center gap-0.5 lg-custom:gap-1 2xl:gap-[6px]">
            <img src="/assets/icons/ValuedClients/category.svg" alt="icon" />
            <span className="text-xs lg-custom:text-sm 2xl:text-lg text-gray40 dark:text-gray60 font-medium leading-[150%]">
              Category
            </span>
          </div>
          <span className="text-sm lg-custom:text-base 2xl:text-xl text-gray08 dark:text-white font-medium leading-[150%]">
            {category}
          </span>
        </div>
      </div>

      <div
        className="the_say_box 
          p-5 lg-custom:p-6 2xl-[30px] 
          rounded-xl 
          border border-white90 dark:border-gray15
          flex flex-col gap-2 lg-custom:gap-[10px] 2xl:gap-[14px]"
      >
        <p className="text-sm lg-custom:text-base 2xl:text-lg text-gray40 dark:text-gray60 leading-[150%] font-medium">
          What They Said 🤗
        </p>
        <p className="max-[1800px]:min-h-[72px] text-sm lg-custom:text-base 2xl:text-lg text-gray08 dark:text-white font-medium leading-[150%]">
          {review}
        </p>
      </div>
    </div>
  );
}

export default ClientCard;
