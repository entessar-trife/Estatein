// src/components/cards/DescriptionComponent.tsx
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../redux/hooks";



const DescriptionComponent = () => {
  const { error, loading, current } = useAppSelector(
    (state) => ({
      error: state.properties?.error,
      loading: state.properties?.loading,
      current: state.properties?.current,
    }),
    shallowEqual
  );

  const description =
    current?.description?.toString() || "No description available.";

  const bedrooms = current?.bedrooms;
  const bathrooms = current?.bathrooms;
  const area = current?.area;

  return (
    <div
      data-aos="fade-right"
      className="p-5 lg-custom:p-10 2xl:p-[50px] rounded-[10px] 2xl:rounded-xl border border-white90 dark:border-gray15 flex flex-col gap-5 lg-custom:gap-10 2xl:gap-[50px] w-full lg-custom:w-1/2 h-fit"
    >
      {/* ===== Description ===== */}
      <div className="flex flex-col gap-1.5 lg-custom:gap-2.5 2xl:gap-3.5">
        <h3 className="text-black dark:text-white font-semibold text-lg leading-[150%] lg-custom:text-xl 2xl:text-2xl">
          Description
        </h3>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{String(error)}</p>
        ) : (
          <p className="text-gray60 font-medium text-sm leading-[150%] lg-custom:text-base 2xl:text-lg">
            {description}
          </p>
        )}
      </div>

      {/* ===== Stats ===== */}
      {!loading && !error && current && (
        <div
          className="
            border-t border-t-white90 dark:border-t-gray15 
            pt-5 lg-custom:pt-4 2xl:pt-5 
            flex flex-col gap-5 lg-custom:flex-row lg-custom:gap-10
          "
        >
          {/* Mobile: Bedrooms + Bathrooms */}
          <div className="flex justify-between  gap-5 lg-custom:hidden">
            {/* Bedrooms */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex gap-1">
                <img
                  src="/assets/icons/FeaturedProperties/bedroom.svg"
                  alt="bedrooms"
                  className="w-5 h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                  Bedrooms
                </span>
              </div>
              <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
                {bedrooms}
              </span>
            </div>

            <span className="w-px bg-white90 dark:bg-gray15" />

            {/* Bathrooms */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex gap-1">
                <img
                  src="/assets/icons/FeaturedProperties/bathroom.svg"
                  alt="bathrooms"
                  className="w-5 h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                  Bathrooms
                </span>
              </div>
              <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
                {bathrooms}
              </span>
            </div>
          </div>

          <span className="flex lg-custom:hidden h-px w-full bg-white90 dark:bg-gray15" />

      {/* ===== mobile: area ===== */}
          <div className="flex flex-col gap-1.5 flex-1 lg-custom:hidden">
            <div className="flex gap-1">
              <img
                src="/assets/icons/FeaturedProperties/area.svg"
                alt="area"
                className="w-5 h-5 2xl:w-6 2xl:h-6"
              />
              <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                Area
              </span>
            </div>
            <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
              {area}
            </span>
          </div>

          {/* Desktop: 3 Columns */}
          <div className="hidden lg-custom:flex gap-2.5 2xl:gap-5 flex-1">
            {/* Bedrooms */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex gap-1">
                <img
                  src="/assets/icons/FeaturedProperties/bedroom.svg"
                  alt="bedrooms"
                  className="w-5 h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                  Bedrooms
                </span>
              </div>
              <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
                {bedrooms}
              </span>
            </div>

            <span className="w-px bg-white90 dark:bg-gray15" />

            {/* Bathrooms */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex gap-1">
                <img
                  src="/assets/icons/FeaturedProperties/bathroom.svg"
                  alt="bathrooms"
                  className="w-5 h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                  Bathrooms
                </span>
              </div>
              <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
                {bathrooms}
              </span>
            </div>

            <span className="w-px bg-white90 dark:bg-gray15" />

            {/* Area */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex gap-1.5">
                <img
                  src="/assets/icons/FeaturedProperties/area.svg"
                  alt="area"
                  className="w-5 h-5 2xl:w-6 2xl:h-6"
                />
                <span className="text-gray40 dark:text-gray60 font-medium text-sm 2xl:text-lg">
                  Area
                </span>
              </div>
              <span className="text-black dark:text-white font-semibold text-lg 2xl:text-2xl">
                {area} Square Feet
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;

