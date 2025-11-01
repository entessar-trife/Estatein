import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utlis/scrollToTop";

const UnderProcessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-white97)] text-[var(--color-gray20)] dark:bg-[var(--color-gray08)] dark:text-[var(--color-white97)] transition-colors duration-300 py-[50px]">
      
      <img
        src="/assets/images/UnderConstruction.svg" 
        alt="Under Process"
        className="max-w-md w-[80%] mb-8"
      />

      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--color-purple65)] dark:text-[var(--color-purple75)]">
        This Page is Under Process
      </h1>

      <p className="text-lg text-center max-w-lg mb-8 text-[var(--color-gray40)] dark:text-[var(--color-gray60)]">
        We’re working hard to bring this feature to life. Please check back
        later — it’ll be worth the wait!
      </p>

      <Link
        to="/"
        onClick={scrollToTop}
        className="px-6 py-3 rounded-full font-medium text-white bg-[var(--color-purple65)] hover:bg-[var(--color-purple70)] dark:bg-[var(--color-purple70)] dark:hover:bg-[var(--color-purple60)] transition-colors duration-200 shadow-lg"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default UnderProcessPage;
