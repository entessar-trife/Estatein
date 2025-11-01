import { Link } from "react-router-dom";
import CountUpComponent from "../../components/cards/CountUpComponent";
import RotatingText from "../../components/cards/RotatingText";
import { useAppSelector } from "../../redux/hooks";

interface HeroProps {
  title: string;
  description: string;
}

const Hero = ({ title, description }: HeroProps) => {
  const isBannerVisible = useAppSelector((state) => state.banner.isVisible);

  return (
    // === Main Hero Section Container ===

    <div
      id="hero"
      className={`relative max-w-[1920px] huge:mx-auto lg-custom:pl-[80px] 2xl:pl-[162px] huge:pr-[162px]  ${
        isBannerVisible
          ? "lg-custom:h-[calc(100vh-142px)] lg-custom:mt-[77px] 2xl:mt-[94px] 2xl:h-[calc(100vh-157px)] "
          : "lg-custom:h-[calc(100vh-77px)] lg-custom:mt-[77px] 2xl:h-[calc(100vh-94px)] ]"
      }  flex flex-col-reverse lg-custom:flex-row lg-custom:items-stretch lg-custom:gap-[60px] 2xl:gap-[80px] text-black dark:text-white`}
    >
      {/* === Left Side: Text, Buttons, and CountUp === */}
      <div className="flex justify-center lg-custom:w-[50%] flex-col gap-10 lg-custom:gap-[4vh] 2xl:gap-[5vh]  ">
        {/* === Title and Description === */}
        <div
          data-aos="fade-right"
          data-aos-delay="300"
          className="px-4 lg-custom:px-0 flex flex-col gap-4 lg-custom:gap-5 2xl:gap-6 mt-20 lg-custom:mt-0"
        >
          <h1 className="text-[28px] lg-custom:text-[47px] 2xl:text-[60px] font-semibold leading-[120%]">
            {title}
          </h1>

          <p className="text-sm lg-custom:text-base 2xl:text-lg font-medium text-gray40 dark:text-gray60 leading-[150%]">
            {description}
          </p>
        </div>

        {/* === Call-to-Action Buttons === */}
        <div
          data-aos="fade-right"
          className="flex flex-col lg-custom:flex-row gap-4 px-4 lg-custom:px-0"
        >
          <Link
            to="/about"
            className="text-center py-3.5 px-5 2xl:py-[18px] text-sm 2xl:text-lg 2xl:px-6 border  border-white90 dark:border-gray15 rounded-lg hover:bg-purple97 dark:hover:bg-gray10"
          >
            Learn More
          </Link>
          <Link
            to="/properties"
            className="text-center py-3.5 px-5 2xl:py-[18px] 2xl:px-6 text-sm 2xl:text-lg bg-purple90 dark:bg-purple60 rounded-lg hover:bg-purple90/60"
          >
            Browse Properties
          </Link>
        </div>

        {/* === Count Up Statistics Component === */}
        <CountUpComponent />
      </div>

      {/* === Right Side: Hero Image, Background, and RotatingText === */}

      <div className="relative  mt-30 lg-custom:mt-0 lg-custom:h-full mx-4 lg-custom:mx-0 lg-custom:px-0 lg-custom:w-[55%]  flex items-end border border-white90 dark:border-gray15 lg-custom:border-none rounded-xl lg-custom:rounded-none bg-white97 dark:bg-gray10 bg-[linear-gradient(to_bottom_left,_#2A213F,_#19191900,_#19191900)]">
        {/* === Background Abstract Design Image === */}
        <img
          rel="preload"
          src="/assets/images/AbstractDesign5.webp"
          alt="Abstract Design"
          className="w-full h-full object-cover"
        />

        {/* === Foreground Hero Image === */}
        <img
          src="/assets/images/MainHero/main.webp"
          alt="Hero"
          className="lg-custom:hidden absolute object-cover object-bottom bottom-0 right-0"
        />

        {/* === Rotating Text Component === */}
        <RotatingText />
        {/* === Foreground Hero Image === */}

        <img
          rel="preload"
          data-aos="fade-up"
          data-aos-delay="300"
          src="/assets/images/MainHero/main.webp"
          alt="Hero"
          className="hidden lg-custom:block  absolute bottom-0 lg-custom:h-[calc(100vh-142px)] object-contain lg-custom:object-cover object-bottom right-10"
        />
      </div>
    </div>
  );
};

export default Hero;
