import AchievementsSection from "../sections/about/AchievementsSection";
import ExperienceSection from "../sections/about/ExperienceSection";
import Hero2 from "../sections/about/Hero2";
import OurValuesSection from "../sections/about/OurValuesSection";
import TeamSection from "../sections/about/TeamSection";
import ValuedClientsSection from "../sections/about/ValuedClientsSection";

function AboutPage() {
  return (
    <div>
      <Hero2 />
      <OurValuesSection />
      <AchievementsSection />
      <ExperienceSection />
      <TeamSection />
      <ValuedClientsSection />
    </div>
  );
}

export default AboutPage;
