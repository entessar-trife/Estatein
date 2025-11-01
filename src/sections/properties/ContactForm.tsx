import InquiryForm from "../../components/Forms/InquiryForm";
import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";

type ContactFormProps = {
  starImg: boolean;
  heading: string;
  paragraph: string;
  type: "inquiry" | "contact" | "property";
};

function ContactForm({ starImg, heading, paragraph, type }: ContactFormProps) {
  return (
    <SectionWrapper
      id="form"
      className="py-20 lg-custom:py-[120px] 2xl:py-[150px]"
    >
      <Title
        anamation="fade-up"
        starImg={starImg}
        heading={heading}
        paragraph={paragraph}
        paragraphStyle="lg-custom:w-[81%] w-full"
      />

      <InquiryForm type={type} />
    </SectionWrapper>
  );
}

export default ContactForm;
