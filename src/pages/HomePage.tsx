import FaqSection from "../sections/home/FaqSection";
import Hero from "../sections/home/Hero";
import OurClientsSection from "../sections/home/OurClientsSection";
import SiteFeaturesSection from "../sections/shared/SiteFeaturesSection";
import PropertiesSection from "../sections/home/PropertiesSection";
import { SectionWrapper } from "../layouts/SectionWrapper";
import { SiteFeaturesHomeData } from "../data/SiteFeaturesData";

function HomePage() {
  return (
    <>
      <Hero
        title="Discover Your Dream Property with Estatein"
        description="Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams."
      />
      <SiteFeaturesSection data={SiteFeaturesHomeData} />
      <div>
        <PropertiesSection
          heading="Featured Properties"
          paragraph={
            <>
              Explore our handpicked selection of featured properties. Each
              listing offers a glimpse into exceptional homes and investments
              available through Estatein.
              <span className="hidden sm:inline">
                {" "}
                Click "View Details" for more information.
              </span>
            </>
          }
          buttonLabel="View All Properties"
        />
        <OurClientsSection />
        <SectionWrapper className="pt-20 lg-custom:pt-[120px] 2xl:pt-[150px] pb-20 lg-custom:pb-[72px] 2xl:pb-[96px]">
          <FaqSection />
        </SectionWrapper>
      </div>
    </>
  );
}

export default HomePage;
