import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/NavBar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { defaultLinks } from "../data/footerData";
import { CTA } from "../sections/shared/CTA";
import Scroll2Top from "../components/ui/Scroll2Top";
import Loader from "../components/ui/Loader";
import TopBanner from "../components/shared/TopBanner";
import { useEffect, useState } from "react";
import ChatBot from "../components/shared/ChatBot/ChatBot";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hideBanner, showBanner } from "../redux/slices/bannerSlice";
import CustomCursor from "../components/shared/CustomCursor";
import "aos/dist/aos.css";
import AOS from "aos";
import LogoIcon from "../components/icons/LogoIcon";
import { navData } from "../data/NavData";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const isBannerVisible = useAppSelector((state) => state.banner.isVisible);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasClosedBanner, setHasClosedBanner] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 0,
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        dispatch(hideBanner());
      } else if (window.scrollY === 0 && !hasClosedBanner) {
        dispatch(showBanner());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, hasClosedBanner]);

  const handleBannerClose = () => {
    setHasClosedBanner(true);
    dispatch(hideBanner());
  };

  return (
    <div className="flex flex-col min-h-screen font-urbanist flex-grow  overflow-hidden ">
      <CustomCursor />
      <ChatBot />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {isBannerVisible && !hasClosedBanner && (
            <TopBanner
              isVisible={isBannerVisible}
              onClose={handleBannerClose}
              message="✨ Discover Your Dream Property with Estatein"
              linkText="Learn More"
              link="/properties"
            />
          )}
          <Navbar
            isBannerVisible={isBannerVisible && !hasClosedBanner}
            logo={LogoIcon}
            navData={navData}
          />

          <main className="bg-white99 dark:bg-gray08">
            <Outlet />
            <CTA
              title="Start Your Real Estate Journey Today"
              description="Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance."
              buttonLabel="Explore Properties"
            />
          </main>

          <Scroll2Top />
          <Footer
            links={defaultLinks}
            footerNote="@2023 Estatein. All Rights Reserved."
            logo="/assets/icons/Footer/logo.svg"
          />
        </>
      )}
    </div>
  );
};

export default MainLayout;
