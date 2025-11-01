import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import OfficeLocationCard from "../../components/cards/OfficeLocationCard";

import { selectFilteredOffices } from "../../redux/selectors/offices";
import type { RootState, AppDispatch } from "../../redux/store";
import { listenToOffices } from "../../utlis/firebaseListeners/ourOfficesListener";
import { setActiveTab } from "../../redux/slices/ourOfficesSlice";
import type { OfficeLocation } from "../../redux/types/OfficeLocation";
import GenericSlider from "../../components/shared/GenericSlider";

function OurOfficeTaps() {
  const dispatch = useDispatch<AppDispatch>();
  const [isFading, setIsFading] = useState(false);

  const filteredOffices = useSelector(selectFilteredOffices) ?? [];
  const { loading, error, activeTab } = useSelector(
    (state: RootState) => state.offices
  );

  const tabs: ("all" | "regional" | "international")[] = [
    "all",
    "regional",
    "international",
  ];

  useEffect(() => {
    const maybeUnsubscribe = dispatch(listenToOffices());
    return () => {
      if (typeof maybeUnsubscribe === "function") {
        maybeUnsubscribe();
      }
    };
  }, [dispatch]);

  const skeletonCount =
    (filteredOffices?.length ?? 0) > 0 ? filteredOffices.length : 4;

  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  const renderOffice = useCallback(
    (office: OfficeLocation, index: number) => (
      <OfficeLocationCard key={office.id || index} {...office} />
    ),
    []
  );

  return (
    <div className="flex flex-col mt-10 lg-custom:mt-[60px] 2xl:mt-20 gap-7.5 lg-custom:gap-10 2xl:gap-[50px]">
      <div className="flex w-full sm:w-fit bg-white97 dark:bg-gray10 gap-2.5 p-2.5 rounded-lg 2xl:rounded-xl overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                dispatch(setActiveTab(tab));
                setIsFading(false);
              }, 200);
            }}
            className={`min-w-[105px] md:min-w-[125px] 2xl:min-w-[159px] px-4 py-3.5 2xl:py-4.5 2xl:px-7 border dark:border-gray15 border-purple70 rounded-lg 2xl:rounded-[10px] capitalize text-sm/[1.5] 2xl:text-lg font-medium text-black dark:text-white ${
              activeTab === tab
                ? "bg-white99 dark:bg-gray08"
                : "bg-white90 dark:bg-gray15"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className={`transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {loading ? (
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
            {[...Array(skeletonCount)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col min-h-[409px] lg-custom:min-h-[372px] 2xl:min-h-[472px] border border-white90 dark:border-gray15 rounded-lg 2xl:rounded-xl p-6 lg-custom:p-10 2xl:p-[50px] gap-6 lg-custom:gap-[30px] 2xl:gap-10 bg-gray-300 dark:bg-gray-700 animate-pulse"
              >
                <div className="rounded-[10px] 2xl:rounded-xl w-full h-[268px] lg-custom:h-[220px] 2xl:h-[253px] bg-gray-400 dark:bg-gray-600" />
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-400 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-12 bg-gray-400 dark:bg-gray-600 rounded w-full"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-20 rounded bg-gray-400 dark:bg-gray-600" />
                    <div className="h-8 w-20 rounded bg-gray-400 dark:bg-gray-600" />
                    <div className="h-8 w-20 rounded bg-gray-400 dark:bg-gray-600" />
                  </div>
                  <div className="h-12 w-full rounded bg-purple-600 dark:bg-purple-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <GenericSlider
            items={filteredOffices}
            renderSlide={renderOffice}
            showCounter
            slidesPerView={{ lg: 2, md: 2, sm: 1 }}
            counterClassName="justify-center md:justify-between"
          />
        )}
      </div>
    </div>
  );
}

export default OurOfficeTaps;
