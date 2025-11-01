import { useEffect, useState } from "react";
import ArrowUpIcon from "../icons/ArrowUpIcons";
import { scrollToTop } from "../../utlis/scrollToTop";

const Scroll2Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 group 
        transform transition-all duration-500
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
    >
      <button
        onClick={scrollToTop}
        className="w-[50px] h-[50px] rounded-full bg-purple75 dark:bg-transparent border-none font-semibold flex items-center justify-center shadow-[0_0_0_4px_rgba(180,160,255,0.253)] cursor-pointer overflow-hidden transition-all duration-300 group-hover:w-[140px] group-hover:rounded-full group-hover:bg-purple70"
      >
        <ArrowUpIcon className="w-[12px] text-black dark:text-white transition-transform duration-300 group-hover:-translate-y-[200%]" />
        <span className="absolute text-white text-[0px] group-hover:text-[13px] group-hover:bottom-auto transition-all duration-300">
          Back to Top
        </span>
      </button>
    </div>
  );
};

export default Scroll2Top;
