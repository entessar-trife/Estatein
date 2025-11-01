import type { OfficeLocation } from "../../redux/types/OfficeLocation";
import { officeCardAos, officeInfoItemAos } from "../../utlis/Anamation";
import { EmailIcon, LocationIcon, PhoneIcon } from "../icons/FormIcons";
import LocationInfoBox from "../ui/LocationInfoBox";
import MainButton from "../ui/MainButton";

function OfficeLocationCard({
  branch,
  address,
  details,
  email,
  phone,
  city,
  mapLink,
}: OfficeLocation) {
  return (
    <div
      {...officeCardAos()}
      className="flex flex-col min-h-[409px] lg-custom:min-h-[372px] 2xl:min-h-[472px] border border-white90 dark:border-gray15 rounded-lg 2xl:rounded-xl p-6 lg-custom:p-10 2xl:p-[50px] gap-6 lg-custom:gap-[30px] 2xl:gap-10 hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent 
       dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out"
    >
      <div>
        <p className="text-sm/[1.5] 2xl:text-lg font-medium text-black dark:text-white mb-1 lg-custom:mb-1.5 2xl:mb-2.5">
          {branch}
        </p>
        <h3 className="text-xl/[1.5] lg-custom:text-2xl 2xl:text-3xl font-semibold text-black dark:text-white mb-2 lg-custom:mb-2.5 2xl:mb-3.5 ">
          {address}
        </h3>
        <p className="text-sm/[1.5] lg-custom:text-base 2xl:text-lg font-medium line-clamp-3 text-gray40 dark:text-gray60">
          {details}
        </p>
      </div>
      <div
        {...officeInfoItemAos(0)}
        className="flex items-center flex-wrap lg-custom:gap-2.5 gap-2 "
      >
        <LocationInfoBox
          icon={
            <EmailIcon className="text-black dark:text-white group-hover:text-purple60 " />
          }
          text={email}
          className="group"
        />
        <div {...officeInfoItemAos(1)}>
          <LocationInfoBox
            icon={
              <PhoneIcon className="text-black dark:text-white group-hover:text-purple60 " />
            }
            text={phone}
            className="group"
          />
        </div>
        <div {...officeInfoItemAos(2)}>
          <LocationInfoBox
            icon={
              <LocationIcon className="text-black dark:text-white group-hover:text-purple60 " />
            }
            text={city}
            className="group"
          />
        </div>
      </div>

      <MainButton
        variant="normalPurple"
        className="2xl:text-lg"
        onClick={() => window.open(mapLink, "_blank")}
      >
        Get Direction
      </MainButton>
    </div>
  );
}

export default OfficeLocationCard;
