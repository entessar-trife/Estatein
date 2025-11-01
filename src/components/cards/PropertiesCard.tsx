import React, { useCallback, useMemo, useState } from "react";
import MainButton from "../ui/MainButton";
import { useNavigate } from "react-router-dom";
import {
  Icon1 as BedIcon,
  Icon2 as BathIcon,
  Icon3 as VillaIcon,
} from "../../components/icons/PropertiesIcons";
import { scrollToTop } from "../../utlis/scrollToTop";
import type { PropertyType, PropertyDetailType } from "../../types/Property";

const PropertyDetail = React.memo(({ item }: { item: PropertyDetailType }) => {
  const iconMap: Record<"bed" | "bath" | "villa", React.ReactNode> = {
    bed: <BedIcon />,
    bath: <BathIcon />,
    villa: <VillaIcon />,
  };

  return (
    <div className="flex-shrink flex justify-center items-center py-1.5 2xl:py-2 px-3 2xl:px-3.5  bg-purple97 dark:bg-gray10 border dark:border-gray15 border-white90 rounded-full gap-1 max-w-full">
      <span className="text-black dark:text-white w-5 h-5 min-[992px]:w-[9px] min-[992px]:h-[9px] min-[1300px]:w-5 min-[1300px]:h-5 2xl:w-6 2xl:h-6 flex items-center justify-center">
        {item.icon ? iconMap[item.icon] : null}
      </span>
      <span className="text-black dark:text-white text-sm min-[992px]:text-[9px] min-[1400px]:text-sm min-[1500px]:text-[12px] min-[1850px]:text-lg whitespace-nowrap">
        {item.label ?? "-"}
      </span>
    </div>
  );
});

type PropertiesCardProps = {
  property: PropertyType;
  showDetails?: boolean;
  showTags?: boolean;
};

function PropertiesCard({
  property,
  showDetails = true,
  showTags = false,
}: PropertiesCardProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewDetails = useCallback(() => {
    if (property.id) {
      navigate(`/properties/${property.id}`);
      scrollToTop();
    }
  }, [navigate, property.id]);

  const shortDesc = useMemo(() => {
    if (!property.desc) return "";
    const words = property.desc.split(" ");
    return words.length <= 10
      ? property.desc
      : words.slice(0, 10).join(" ") + "…";
  }, [property.desc]);

  const renderTags = useMemo(() => {
    if (!showTags || !property.tags) return null;
    return (
      <span className="text-nowrap text-[12px] font-medium text-black dark:text-white py-1.5 2xl:py-2 px-3 2xl:px-3.5 bg-white97 dark:bg-gray10 dark:border-gray15 border-white90 rounded-[28px]">
        {property.tags}
      </span>
    );
  }, [showTags, property.tags]);

  return (
    <div
      className="relative h-full p-6 lg-custom:p-[30px] 2xl:p-[40px] border dark:border-gray15 border-white90 rounded-xl overflow-hidden hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent 
       dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out "
    >
      {property.image && (
        <img
          src={property.image}
          alt={property.title ?? "Property Image"}
          className={`object-cover w-full h-[210px] lg-custom:h-[255px] 2xl:h-[318px] rounded-[10px] mb-4 lg-custom:mb-5 2xl:mb-[30px] transition-all duration-500
          ${isExpanded ? "scale-[300%] blur-md translate-y-1/2" : "scale-100"}
          `}
        />
      )}

      <div
        className={` transition-all duration-500  ${
          isExpanded &&
          "backdrop-blur-md absolute inset-0 p-5 rounded-xl bg-white/50 dark:bg-black/50 "
        }`}
      >
        {renderTags}

        <div className="mb-5 lg-custom:mb-6 mt-5 2xl:mb-[30px]">
          <h2 className="line-clamp-1 text-lg lg-custom:text-xl 2xl:text-2xl font-semibold dark:text-white text-black mb-0.5 lg-custom:mb-1 2xl:mb-1.5">
            {property.title ?? "No Title"}
          </h2>
          <p
            className={`${
              isExpanded
                ? "dark:text-white text-black "
                : " text-gray40 dark:text-gray60 "
            } inline text-sm lg-custom:text-base 2xl:text-lg font-medium`}
          >
            {isExpanded ? property.descriptionLong : shortDesc}
          </p>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`dark:text-purple97 text-black font-medium text-sm lg-custom:text-base 2xl:text-lg underline  ${
              isExpanded &&
              "block m-1.5 font-bold border border-transparent border-b-purple60 hover:border-purple60 hover:p-1.5 rounded-lg p-0.5 transition-all duration-200 ease-in-out"
            }`}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>

        {!isExpanded && showDetails && property.details?.length ? (
          <div className="flex max-[1300px]:flex-wrap gap-[6px] mb-4 lg-custom:mb-6 2xl:mb-[30px]">
            {property.details.map((item: PropertyDetailType, index: number) => (
              <PropertyDetail key={index} item={item} />
            ))}
          </div>
        ) : null}

        {!isExpanded && (
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex flex-col">
              <span className="text-sm 2xl:text-lg text-gray40 dark:text-gray60 font-medium">
                Price
              </span>
              <h2 className="text-lg lg-custom:text-xl 2xl:text-2xl dark:text-white text-black font-semibold">
                {property.Price ?? "N/A"}
              </h2>
            </div>
            {property.id && (
              <MainButton
                variant="normalPurple"
                onClick={handleViewDetails}
                className="whitespace-nowrap min-[767px]:text-[10px] min-[1400px]:text-sm min-[1500px]:text-[12px] min-[1850px]:text-lg 2xl:!py-[18px] max-[380px]:!px-1 2xl:!px-6"
              >
                View Property Details
              </MainButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(PropertiesCard);