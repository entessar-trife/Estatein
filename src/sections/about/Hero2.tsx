import CountUpComponent from "../../components/cards/CountUpComponent";
import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";

const Hero2 = () => {
  return (
    <SectionWrapper id="story">
      <div
        className={`flex flex-col-reverse lg-custom:flex-row gap-5 md:gap-[50px] 2xl:gap-20 2xl:mt-[200px] lg-custom:mt-[147px] mt-[118px]`}
      >
        <div className="flex flex-col 2xl:gap-20 lg-custom:gap-[50px] gap-10 lg-custom:w-[48%]">
          <Title
            heading="Our Journey"
            paragraph="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
            anamation="fade-left"
          />
          <CountUpComponent />
        </div>
        <div
          data-aos="fade-right"
          className="relative border border-white90 dark:border-gray15 rounded-xl overflow-hidden lg-custom:w-[48%] "
        >
          <img
            src="/assets/images/AbstractDesign5.webp"
            alt="Abstract Design"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative h-full flex items-end justify-center">
            <img
              src="/assets/images/MainHero/ourJourney.webp"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero2;
