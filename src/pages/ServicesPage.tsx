import { subHeroServices } from "../data/subHeroData";
import SiteFeaturesSection from "../sections/shared/SiteFeaturesSection";
import { SiteFeaturesServicesData } from "../data/SiteFeaturesData";
import SubHero from "../components/shared/SubHero";
import MainServicesSection from "../sections/services/MainServicesSection";
import {
  propertyValueData,
  propertyValueTitleData,
  UnlockCardPropertyData,
} from "../data/propertyValueData";
import {
  managementData,
  managementTitleData,
  unlockCardManagementData,
} from "../data/managementData";
import InvestmentsSection from "../sections/services/InvestmentsSection";

function ServicesPage() {
  return (
    <div className="">
      <SubHero
        title={subHeroServices.title}
        desc={subHeroServices.desc}
        classes="lg-custom:pb-[100px]"
      />
      <SiteFeaturesSection data={SiteFeaturesServicesData} />

      <MainServicesSection
        id="property"
        mainData={propertyValueData}
        titleData={propertyValueTitleData}
        unlockCardData={UnlockCardPropertyData}
      />

      <MainServicesSection
        id="management"
        mainData={managementData}
        titleData={managementTitleData}
        unlockCardData={unlockCardManagementData}
      />

      <InvestmentsSection />
    </div>
  );
}

export default ServicesPage;
