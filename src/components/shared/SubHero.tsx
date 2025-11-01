import { SectionWrapper } from "../../layouts/SectionWrapper";
import Title from "./Title";

type SubHeroProps = {
  title: string;
  desc: string;
  classes?: string;
};

function SubHero({ title, desc, classes }: SubHeroProps) {
  return (
    <SectionWrapper
      id="find"
      className={`huge:!max-w-[1596px] pt-[122px] 2xl:pt-[240px] lg-custom:pt-[190px] pb-[50px] bg-gradient-to-l from-[#FBFAFF] via-[#DBCEFD] to-[#dbcefd] 
                  dark:bg-[linear-gradient(125deg,rgba(38,38,38,0.9)_0%,rgba(38,38,38,0.8)_5%,rgba(38,38,38,0.6)_10%,rgba(38,38,38,0.5)_25%,transparent_40%)]
               ${classes}`}
    >
      <Title
        anamation="fade-right"
        heading={title}
        paragraph={desc}
        starImg={false}
        paragraphStyle="w-full 2xl:w-[94.3015%] lg-custom:w-[90.5555%]"
      />
    </SectionWrapper>
  );
}

export default SubHero;
