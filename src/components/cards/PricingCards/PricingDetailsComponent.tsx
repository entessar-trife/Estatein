export type PricingDetailsComponentProps = {
  title: string;
  price: string;
  desc?: string;
  withBorder?: boolean;
  borderRadius?: boolean;
  isHidden?: boolean;
};

const PricingDetailsComponent = ({
  withBorder,
  borderRadius,
  title,
  price,
  desc,
  isHidden = false,
}: PricingDetailsComponentProps) => {
  return (
    <div
      className={`flex flex-col gap-2.5 md:gap-3 2xl:gap-4  ${
        withBorder
          ? "max-lg-custom:pt-5 max-lg-custom:border-t min-lg-custom:border-l min-lg-custom:pl-5 border-white90 dark:border-gray15"
          : ""
      }`}
    >
      <h5 className="text-sm 2xl:text-lg text-gray40 dark:text-gray60 font-medium">
        {title}
      </h5>
      <div className="flex items-center gap-3 md:gap-4">
        <span className="text-lg md:text-xl 2xl:text-2xl text-black dark:text-white font-semibold">
          {price}
        </span>
        {desc && (
          <p
            className={`text-sm 2xl:text-lg text-gray40 dark:text-gray60 bg-white97 dark:bg-gray10 
              border border-white90 dark:border-gray15 py-1.5 px-3 2xl:py-2 2xl:px-3.5
              ${
                borderRadius
                  ? "rounded-[28px]"
                  : "rounded-[6px] md:rounded-[28px]"
              } ${isHidden ? "max-md:hidden" : ""}`}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingDetailsComponent;
