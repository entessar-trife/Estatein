import { useEffect, useMemo } from "react";
import ExperienceSectionCard from "../../components/cards/ExperienceSectionCard";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import Title from "../../components/shared/Title";
import { getCenterOutAos, getFadeUpOnce } from "../../utlis/Anamation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  subscribeExperience,
  type ExperienceItem,
} from "../../redux/slices/experienceSlice";

const SkeletonCard = () => (
  <div className="w-full h-[200px] bg-gray-200 dark:bg-gray-700 rounded-xl" />
);

function ExperienceSection() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.experience);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(subscribeExperience());
    }
  }, [dispatch, items.length]);

  const skeletons = useMemo(
    () => Array.from({ length: 6 }, (_, idx) => <SkeletonCard key={idx} />),
    []
  );

  return (
    <SectionWrapper
      id="steps"
      className="pb-20 lg-custom:pb-[120px] 2xl:pb-[150px]"
    >
      <Title
        heading="Navigating the Estatein Experience"
        paragraph="At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
        starImg
        titleStyle="mb-2 md:mb-[10px] lg-custom:mb-[14px]"
        paragraphStyle="w-full lg-custom:max-w-[1000px] 2xl:max-w-[1279px]"
        anamation="fade-up"
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg-custom:!grid-cols-3 gap-y-[30px] gap-x-[0px] md:gap-x-[20px] md:gap-y-[40px] huge:gap-x-[30px] huge:gap-y-[50px] mt-10 lg-custom:mt-[60px] 2xl:mt-[80px] animate-pulse">
          {skeletons}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          className="cards_container grid grid-cols-1 md:grid-cols-2 lg-custom:!grid-cols-3 gap-y-[30px] gap-x-[0px] md:gap-x-[20px] lg-custom:gap-y-[40px] 2xl:gap-x-[30px] 2xl:gap-y-[50px] mt-10 lg-custom:mt-[60px] 2xl:mt-[80px]"
          {...getFadeUpOnce(500)}
        >
          {items.map((item: ExperienceItem, idx: number) => (
            <div
              key={idx}
              {...getCenterOutAos(idx)}
              className={`${idx > 2 ? "hidden md:flex" : ""}`}
            >
              <ExperienceSectionCard {...item} />
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

export default ExperienceSection;
