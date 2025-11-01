import CommonCard from "../../components/cards/CommonCard";
import { teamItemAos } from "../../utlis/Anamation";
import type { CommonCardProps } from "../../types/CommonCard";

type SiteFeaturesSectionProps = {
  data: CommonCardProps[];
};

const SiteFeaturesSection = ({ data }: SiteFeaturesSectionProps) => {
  return (
    <section id="features"
      className="huge:max-w-[1596px] huge:mx-auto grid grid-cols-2 min-lg-custom:grid-cols-4 gap-2.5 2xl:gap-5
      p-2.5 2xl:p-5 bg-white99 dark:bg-gray08 border border-white90 dark:border-gray15 dark:shadow-[0px_0px_0px_10px_#191919] rounded-[10px] 2xl:rounded-xl mt-2.5"
    >
      {data?.map((card, index) => (
        <div key={index} {...teamItemAos(index)}>
          <CommonCard
            key={index}
            HeadingTag={card.HeadingTag}
            titleLink={card.titleLink}
            links={card.links}
            isArrow={true}
            cardImg={card.cardImg}
            cardTitle={card.cardTitle}
            cardStyle="py-5 px-3.5 md:py-[30px] md:px-4 2xl:py-10 2xl:px-5 bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 h-full"
            titleStyle="flex-col items-center"
            titleSize="text-sm md:text-base 2xl:text-[20px] text-center"
            children={undefined}
          />
        </div>
      ))}
    </section>
  );
};

export default SiteFeaturesSection;
