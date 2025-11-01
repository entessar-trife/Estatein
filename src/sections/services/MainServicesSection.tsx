import UnlockCardComponent, {
  type unlockCardComponentProps,
} from "../../components/cards/UnlockCardComponent";
import {
  pvCardAos,
  pvGridAos,
  pvSectionAos,
  pvUnlockAos,
} from "../../utlis/Anamation";
import { propertyValueData } from "../../data/propertyValueData";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import Title, { type TitleProps } from "../../components/shared/Title";
import CommonCard from "../../components/cards/CommonCard";
import type { CommonCardProps } from "../../types/CommonCard";

export type MainServicesSectionProps = {
  titleData: TitleProps;
  mainData: CommonCardProps[];
  unlockCardData: unlockCardComponentProps;
  id: string;
};

const MainServicesSection = ({
  id,
  mainData,
  titleData,
  unlockCardData,
}: MainServicesSectionProps) => {
  return (
    <SectionWrapper
      id={id}
      className="pt-[61px] lg-custom:pt-[90px] 2xl:pt-[110px]"
    >
      <section {...pvSectionAos()}>
        <Title
          titleStyle={titleData.titleStyle}
          heading={titleData.heading}
          paragraph={titleData.paragraph}
          paragraphStyle={titleData.paragraphStyle}
          anamation={titleData.anamation}
        />

        <div
          {...pvGridAos()}
          className="grid gap-5 2xl:gap-[30px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          {mainData.map((card, index) => (
            <div key={index} {...pvCardAos(index)}>
              <CommonCard
                key={index}
                cardStyle="p-6 md:p-10 2xl:p-[50px] gap-4 md:gap-5 2xl:gap-[30px] border-white90 dark:border-gray15 h-full  "
                cardImg={card.cardImg}
                cardTitle={card.cardTitle}
                cardDesc={card.cardDesc}
              />
            </div>
          ))}
          <div
            className="col-span-1 md:col-span-2"
            {...pvUnlockAos(propertyValueData.length)}
          >
            <UnlockCardComponent
              cardStyle='col-span-1 md:col-span-2 p-6 md:py-[45.5px] md:px-10 2xl:py-[59.5px] 2xl:px-[50px] bg-[url("/assets/images/AbstractDesign2.webp")] bg-no-repeat bg-cover'
              title={unlockCardData.title}
              titleStyle="text-xl md:text-2xl 2xl:text-[30px] font-bold"
              desc={unlockCardData.desc}
              descStyle="text-gray40 dark:text-gray60"
            />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
export default MainServicesSection;
