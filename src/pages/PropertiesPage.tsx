import ContactForm from "../sections/properties/ContactForm";
import { subHeroProperties } from "../data/subHeroData";
import FilterProperty from "../sections/properties/FilterProperty";
import PropertiesSection from "../sections/home/PropertiesSection";
import SubHero from "../components/shared/SubHero";

function PropertiesPage() {
  return (
    <div>
      <SubHero
        title={subHeroProperties.title}
        desc={subHeroProperties.desc}
        classes="lg-custom:pb-[130px]"
      />
      <FilterProperty />
      <PropertiesSection
        heading="Discover a World of Possibilities"
        paragraph={`Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home`}
        showDetails={false}
        showTags={true}
      />
      <ContactForm
        starImg={true}
        heading="Let's Make it Happen"
        paragraph="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
        type="inquiry"
      />
    </div>
  );
}

export default PropertiesPage;
