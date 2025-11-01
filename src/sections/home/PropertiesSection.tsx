import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listenToProperties } from "../../utlis/firebaseListeners/propertiesListener";
import { scrollToTop } from "../../utlis/scrollToTop";
import GenericSlider from "../../components/shared/GenericSlider";
import PropertiesCardComponent from "../../components/cards/PropertiesCard";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import Title from "../../components/shared/Title";
import type { PropertyType } from "../../types/Property";

type Props = {
  showTags?: boolean;
  showDetails?: boolean;
  heading: string;
  paragraph: string | React.ReactNode;
  buttonLabel?: string;
};

const PropertiesCard = React.memo(PropertiesCardComponent);

const SkeletonCard = () => (
  <div className="p-6 lg-custom:p-[30px] 2xl:p-[40px] border dark:border-gray15 border-white90 rounded-xl animate-pulse bg-gray-200 dark:bg-gray-700">
    <div className="w-full h-[210px] lg-custom:h-[255px] 2xl:h-[318px] rounded-[10px] mb-4 lg-custom:mb-5 2xl:mb-[30px] bg-gray-300 dark:bg-gray-600" />
    <div className="w-32 h-7 2xl:h-9 rounded-[28px] bg-gray-300 dark:bg-gray-600 mb-5" />
    <div className="h-7 lg-custom:h-8 2xl:h-9 bg-gray-300 dark:bg-gray-600 rounded mb-1 lg-custom:mb-1.5 2xl:mb-2 w-3/4" />
    <div className="h-5 lg-custom:h-6 2xl:h-7 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-full" />
    <div className="flex flex-wrap gap-1.5 2xl:gap-2.5 mb-5 lg-custom:mb-6 2xl:mb-[30px]">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-[100px] 2xl:w-[120px] h-8 2xl:h-10 rounded-[28px] bg-gray-300 dark:bg-gray-600"
        />
      ))}
    </div>
    <div className="flex items-center justify-between gap-[30px] lg-custom:gap-[40px] 2xl:gap-[50px]">
      <div className="flex flex-col">
        <div className="h-5 2xl:h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
        <div className="h-7 lg-custom:h-8 2xl:h-9 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
      <div className="w-48 h-10 2xl:h-12 bg-purple-500 rounded-lg opacity-70" />
    </div>
  </div>
);

function PropertiesSection({
  heading,
  paragraph,
  buttonLabel,
  showDetails = true,
  showTags = false,
}: Props) {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties.all);
  const { loading, error } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (properties.length === 0) {
      dispatch(listenToProperties());
    }
  }, [dispatch, properties.length]);

  return (
    <SectionWrapper
      id="properties"
      className="pt-20 lg-custom:pt-[120px] 2xl:pt-[150px]"
    >
      <Title
        heading={heading}
        paragraph={paragraph}
        buttonLabel={buttonLabel}
        paragraphStyle="2xl:max-w-[1200px] lg-custom:max-w-[975px] w-full"
        anamation="fade-up"
        navigateTo="allProperties"
        onClick={scrollToTop}
      />

      {error ? (
        <p className="text-red-500 mt-6">{error}</p>
      ) : loading && properties.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[40px] lg-custom:mt-[60px] 2xl:mt-[80px]">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <GenericSlider<PropertyType>
          items={properties}
          navigateTo="allProperties"
          renderSlide={(property) => (
            <PropertiesCard
              key={property.id}
              property={property}
              showDetails={showDetails}
              showTags={showTags}
            />
          )}
          slidesPerView={{ lg: 3, md: 2, sm: 1 }}
          showCounter
          titleBtnLabel={buttonLabel ? "View All Properties" : undefined}
          onClick={scrollToTop}
        />
      )}
    </SectionWrapper>
  );
}

export default PropertiesSection;
