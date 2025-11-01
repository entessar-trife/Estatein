import TitleBtn from "../../ui/TitleBtn";
import PricingDetailsComponent, {
  type PricingDetailsComponentProps,
} from "./PricingDetailsComponent";

export type PricingCardProps = {
  isTwoItem?: boolean;
  cardTitle: string;
  details: PricingDetailsComponentProps[];
};

const PricingCard = ({ cardTitle, details, isTwoItem }: PricingCardProps) => {
  const renderRow = (cards: typeof details) => (
    <div
      data-aos="fade-up"
      className={`grid gap-5 border-t border-white90 dark:border-gray15
        ${
          isTwoItem ? "grid-cols-1" : "grid-cols-1 lg-custom:grid-cols-2"
        } py-5 md:py-[30px] 2xl:py-10`}
    >
      {cards.map((card, index) => (
        <PricingDetailsComponent
          key={index}
          title={card.title}
          price={card.price}
          desc={card.desc}
          withBorder={card.withBorder}
          borderRadius={card.borderRadius}
          isHidden={card.isHidden}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full rounded-xl border border-white90 dark:border-gray15 p-5 pb-0 md:p-10 md:pb-2.5 2xl:p-[50px] 2xl:pb-2.5">
      <div
        data-aos="fade-up"
        className="flex items-center justify-between pb-5 md:pb-[30px] 2xl:pb-10"
      >
        <h3 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-black dark:text-white">
          {cardTitle}
        </h3>
        <TitleBtn label="Learn More" />
      </div>

      {/*  Custom layout logic  */}
      {details.length === 5 ? (
        <>
          {renderRow(details.slice(0, 2))}
          {renderRow(details.slice(2, 4))}
          {renderRow(details.slice(4, 5))}
        </>
      ) : details.length === 4 ? (
        <>
          {renderRow(details.slice(0, 2))}
          {renderRow(details.slice(2, 4))}
        </>
      ) : details.length === 3 ? (
        <>
          {renderRow(details.slice(0, 2))}
          {renderRow(details.slice(2, 3))}
        </>
      ) : details.length === 2 ? (
        <>
          {renderRow(details.slice(0, 1))}
          {renderRow(details.slice(1, 2))}
        </>
      ) : (
        renderRow(details)
      )}
    </div>
  );
};

export default PricingCard;
