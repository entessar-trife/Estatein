import React from "react";
import { Link } from "react-router-dom";
import type { CommonCardProps } from "../../types/CommonCard";

const CommonCard = ({
  HeadingTag = "h5",
  titleLink,
  cardImg,
  cardTitle,
  titleStyle,
  titleSize = "text-xl lg-custom:text-2xl",
  cardDesc,
  cardStyle,
  isArrow,
  links,
}: CommonCardProps) => {
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.getElementById(href.slice(1));
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`group relative rounded-[10px] 2xl:rounded-xl border flex flex-col ${cardStyle}`}
    >
      {isArrow && (
        <img
          src="/assets/icons/CardUnderHero/arrowRight.svg"
          className="absolute top-5 right-5 w-[26px] h-[26px]"
          alt="arrow icon"
        />
      )}

      <div
        className={`flex items-center gap-2.5 md:gap-4 2xl:gap-5 ${titleStyle}`}
      >
        <div
          className="relative border-gradient-base border-gradient-2 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
        >
          <div
            className="relative m-1.5 border-gradient-base border-gradient-1 transition-transform duration-500 ease-in-out group-hover:rotate-[-360deg]"
          >
            <img src={cardImg} alt="card image" className="p-2" />
          </div>
        </div>

        {links && links.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2.5 lg-custom:gap-5 2xl:gap-[30px]">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href || link.link}
                onClick={(e) =>
                  handleAnchorClick(e, link.href || link.link || "#")
                }
                className={`text-black dark:text-white font-semibold border-b border-transparent hover:border-purple-500 transform duration-300 ${titleSize}`}
                target={link.href?.startsWith("http") ? "_blank" : undefined}
                rel={link.href?.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.title}
              </a>
            ))}
          </div>
        ) : HeadingTag === "link" ? (
          <Link
            to={titleLink!}
            className={`text-black dark:text-white font-semibold border-b border-transparent hover:border-purple-500 transform duration-300 ${titleSize}`}
          >
            {cardTitle}
          </Link>
        ) : HeadingTag === "a" ? (
          <a
            href={titleLink}
            onClick={(e) => handleAnchorClick(e, titleLink || "")}
            className={`text-black dark:text-white font-semibold border-b border-transparent hover:border-purple-500 transform duration-300 ${titleSize}`}
          >
            {cardTitle}
          </a>
        ) : (
          <HeadingTag
            className={`text-black dark:text-white font-semibold ${titleSize}`}
          >
            {cardTitle}
          </HeadingTag>
        )}
      </div>

      {cardDesc && (
        <p className="text-sm md:text-base 2xl:text-lg font-medium leading-[150%] text-gray40 dark:text-gray60">
          {cardDesc}
        </p>
      )}
    </div>
  );
};

export default CommonCard;
