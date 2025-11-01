import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../redux/hooks";

const KeyFeaturesComponent = () => {
  const property = useAppSelector((state) => {
    let error = state.properties.error;
    let loading = state.properties.loading;
    let current = state.properties.current;
    return { error, loading, current };
  }, shallowEqual);

  return (
    <div
      data-aos="fade-left"
      className="p-5 lg-custom:p-10 2xl:p-[50px] rounded-xl border border-white90 dark:border-gray15 flex flex-col gap-5 lg-custom:gap-10 2xl:gap-[50px] w-full lg-custom:w-1/2"
    >
      <h3 className="text-black dark:text-white font-semibold text-lg leading-[150%] lg-custom:text-xl 2xl:text-2xl">
        Key Features and Amenities
      </h3>

      {property.loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : property.error ? (
        <p className="text-red-500 text-center">{property.error}</p>
      ) : (
        <div className="flex flex-col gap-[18px] lg-custom:gap-5 2xl:gap-[30px]">
          {property.current?.features &&
            property.current?.features.map((feature: string, index: number) => (
              <div
                key={`${property.current?.id}-${index}`}
                className="flex items-center gap-2 border-l border-l-purple60 py-2.5 px-3 lg-custom:py-3.5 lg-custom:px-4 2xl:px-6 2xl 2xl:py-[18px] bg-gradient-to-l from-[#FBFAFF] via-[#DBCEFD] to-[#dbcefd] dark:bg-[linear-gradient(to_right,#1A1A1A_0%,#1A1A1A00_100%)] 
                         hover:border-purple60/40 hover:bg-gradient-to-r hover:from-purple60/40 hover:via-purple60/30 hover:to-transparent
                           dark:hover:bg-gradient-to-r dark:hover:from-purple60/40 dark:hover:via-purple60/30 dark:hover:to-transparent
                           transition-all duration-500 ease-in-out"
              >
                <img
                  src="/assets/icons/FeaturedProperties/FeaturesIcon.svg"
                  alt="icon"
                  className="w-[18px] h-[18px] lg-custom:w-5 lg-custom:h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm leading-[150%] lg-custom:text-base 2xl:text-lg">
                  {feature}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default KeyFeaturesComponent;
