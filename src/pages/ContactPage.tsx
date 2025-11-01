import { useEffect } from "react";
import SubHero from "../components/shared/SubHero";
import { subHeroContact } from "../data/subHeroData";
import { listenToCardData } from "../redux/slices/contactSlice";
import OurOffices from "../sections/contact/OurOffices";
import TeamGallery from "../sections/contact/TeamGallery";
import ContactForm from "../sections/properties/ContactForm";
import SiteFeaturesSection from "../sections/shared/SiteFeaturesSection";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

function ContactPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading } = useSelector(
    (state: RootState) => state.contactLinks
  );

  useEffect(() => {
    dispatch(listenToCardData());
  }, [dispatch]);

  //main skeltonBox style
  const SkeltonBox = () => (
    <div className="flex flex-col items-center gap-2.5 md:gap-4 2xl:gap-5 bg-gray-200 dark:bg-gray-700 py-5 px-3.5 md:py-[30px] md:px-4 2xl:py-10 2xl:px-5 border border-white90 dark:border-gray15 h-full relative rounded-[10px] 2xl:rounded-xl">
      <div className="w-[52px] h-[52px] bg-purple70 rounded-full "></div>
      <div className="w-full h-[52px] bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  );

  return (
    <div>
      <SubHero
        title={subHeroContact.title}
        desc={subHeroContact.desc}
        classes="lg-custom:pb-[100px]"
      />

      {loading ? (
        // Skeleton Loader
        <div
          className="animate-pulse grid grid-cols-2 min-lg-custom:grid-cols-4 gap-2.5 2xl:gap-5
      p-2.5 2xl:p-5 bg-white99 dark:bg-gray08 border border-white90 dark:border-gray15 dark:shadow-[0px_0px_0px_10px_#191919] rounded-[10px] 2xl:rounded-xl mt-2.5"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeltonBox key={index} />
          ))}
        </div>
      ) : (
        <SiteFeaturesSection data={cards} />
      )}

      <ContactForm
        starImg={true}
        heading="Let's Connect"
        paragraph="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need."
        type="contact"
      />
      <OurOffices />
      <TeamGallery />
    </div>
  );
}

export default ContactPage;
