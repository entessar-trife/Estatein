import ValueCard from "../../components/cards/ValueCard";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import Title from "../../components/shared/Title";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchValues } from "../../redux/slices/valueSlice";
import { ourValues } from "../../data/ourValues";
import type { Value } from "../../redux/types/value";

const OurValuesSection = () => {
  const dispatch = useAppDispatch();
  const { visibleItems, loading, error } = useAppSelector(
    (state) => state.values
  );
  useEffect(() => {
    dispatch(fetchValues);
  }, [dispatch]);

  // main SkeletonBox style
  const SkeletonBox = () => (
    <div className="flex justify-between">
      <div className="w-full flex flex-col gap-3.5 lg-custom:gap-4 2xl:gap-5">
        <div className="flex items-center gap-2.5 md:gap-4 2xl:gap-5">
          <div className="h-[60px] w-[60px] rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-[30px] w-full rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="h-[60px] w-full rounded bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  );
  return (
    <>
      <SectionWrapper className="pt-20 lg-custom:pt-[120px] 2xl:pt-[150px]">
        <section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg-custom:gap-[60px] 2xl:gap-20">
          <Title
            titleStyle="leading-[1.5] lg:w-1/3 w-full"
            starImg={true}
            heading="Our Values"
            paragraph="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
            anamation="fade-right"
          />
          <div
            data-aos="fade-left"
            className="lg:w-2/3 w-full bg-purple90 dark:bg-gray10 p-2.5 rounded-xl transition-all duration-300 ease-out hover:bg-purple70/50 hover:-translate-y-1 hover:shadow-[0px_10px_20px_rgba(112,59,247,0.3)] dark:hover:shadow-[0px_10px_20px_rgba(148,108,249,0.2)]"
          >
            <div className="bg-white99 dark:bg-gray08 p-6 lg:p-[55px] grid grid-cols-1 min-lg-custom:grid-cols-2  rounded-xl justify-center gap-[30px]">
              {loading ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonBox key={index} />
                  ))}
                </>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                visibleItems.map((values: Value, index: number) => (
                  <ValueCard
                    key={index}
                    titleSize="2xl:text-2xl lg-custom:text-xl text-lg"
                    cardStyle={`${
                      index !== 0 && index !== 1 ? "lg:pt-[30px]" : ""
                    } ${
                      index % 2 === 0 ? "lg:pr-[30px]" : ""
                    } relative not-last:border-b border-white90 dark:border-gray15 not-last:pb-5 lg:not-last:p-0 lg:not-last:border-0 `}
                    cardImg={ourValues[index].icon}
                    cardTitle={values.title}
                    cardDesc={values.description}
                  >
                    {index !== 0 && index !== 1 ? (
                      <div className="absolute top-0 left-0 right-8 lg:border-b border-white90 dark:border-gray15"></div>
                    ) : (
                      <></>
                    )}
                    {index === 0 ? (
                      <div className="absolute top-0 right-0 bottom-0 lg:border-l border-white90 dark:border-gray15"></div>
                    ) : (
                      <></>
                    )}
                    {index === 2 ? (
                      <div className="absolute top-8 right-0 bottom-0 lg:border-l border-white90 dark:border-gray15"></div>
                    ) : (
                      <></>
                    )}
                  </ValueCard>
                ))
              )}
            </div>
          </div>
        </section>
      </SectionWrapper>
    </>
  );
};

export default OurValuesSection;
