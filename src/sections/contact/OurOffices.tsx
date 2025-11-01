import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import OurOfficeTaps from "./OurOfficeTaps";

function OurOffices() {
  return (
    <SectionWrapper
      id="office"
      className="py-20 lg-custom:py-[120px] 2xl:py-[150px]"
    >
      <Title
        starImg={true}
        heading="Discover Our Office Locations"
        paragraph="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
        paragraphStyle="lg-custom:w-[81%] w-full"
        anamation="fade-up"
      />
      <OurOfficeTaps />
    </SectionWrapper>
  );
}

export default OurOffices;
