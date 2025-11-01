import { useParams } from "react-router-dom";
import PricingDetailsSection from "../sections/propertyDetails/PricingDetailsSection";
import PropertyDetailsForm from "../sections/propertyDetails/PropertyDetailsForm";
import PropertyGallery from "../sections/propertyDetails/PropertyGallery";
import FaqSection from "../sections/home/FaqSection";
import { SectionWrapper } from "../layouts/SectionWrapper";

function PropertyDetailsPage() {
  const { id } = useParams();

  return (
    <div className="mt-32 lg-custom:mt-[157px] 2xl:mt-[219px]">
      <SectionWrapper>{id && <PropertyGallery id={id} />}</SectionWrapper>
      <PropertyDetailsForm />
      <PricingDetailsSection />
      <SectionWrapper className="py-20 lg-custom:py-[120px] 2xl:py-[150px]">
        <FaqSection />
      </SectionWrapper>
    </div>
  );
}

export default PropertyDetailsPage;
