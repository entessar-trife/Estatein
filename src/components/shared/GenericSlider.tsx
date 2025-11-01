import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import TitleBtn from "../ui/TitleBtn";
import { NextArrowIcon, PrevArrowIcon } from "../icons/SliderArrows";
import { useLocation } from "react-router-dom";

type SlidesPerView = {
  lg: number;
  md?: number;
  sm?: number;
};

type Props<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  slidesPerView?: SlidesPerView;
  showCounter?: boolean;
  titleBtnLabel?: string;
  counterClassName?: string;
  navigateTo?: string;
  onClick?: () => void;
  debug?: boolean;
};

const clamp = (v: number, a = 0, b = Infinity) => Math.max(a, Math.min(b, v));

const GenericSlider = <T,>({
  items,
  renderSlide,
  slidesPerView = { lg: 4, md: 2, sm: 1 },
  showCounter = true,
  titleBtnLabel = "",
  counterClassName = "",
  navigateTo,
  onClick,
  debug = false,
}: Props<T>) => {
  const [perViewCurrent, setPerViewCurrent] = useState<number>(
    slidesPerView.lg
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<number>(1);

  const [spacing, setSpacing] = useState<number>();

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: { perView: perViewCurrent, spacing: spacing },
    rubberband: false,
    drag: false,
    created: (s) => {
      const rel = Math.round(s.track?.details?.rel ?? 0);
      setCurrentIndex(rel);
      requestAnimationFrame(() => syncDerivedFromIndex(rel, s));
    },
    slideChanged: (s) => {
      const rel = Math.round(s.track?.details?.rel ?? 0);
      setCurrentIndex(rel);
      requestAnimationFrame(() => syncDerivedFromIndex(rel, s));
    },
  });

  const syncDerivedFromIndex = (index: number, s?: any) => {
    const perView = getPerViewFromSlider(s, perViewCurrent);
    const maxStart = Math.max(0, items.length - perView);
    const safeIndex = clamp(Math.round(index), 0, maxStart);

    const group = Math.ceil(safeIndex / perView) + 1;
    setCurrentGroup(group);
    setIsBeginning(safeIndex <= 0);
    setIsEnd(safeIndex >= maxStart);

    if (debug) {
      console.log("[syncDerivedFromIndex]", {
        safeIndex,
        perView,
        maxStart,
        group,
      });
    }
  };

  const getPerViewFromSlider = (s: any, fallback = perViewCurrent) => {
    try {
      const opt = s?.options?.slides;
      if (opt && typeof opt === "object" && "perView" in opt) {
        const pv = Number(opt.perView);
        if (!Number.isNaN(pv) && pv > 0) return pv;
      }
    } catch (e) {}
    return fallback;
  };

  useEffect(() => {
    const handleResize = () => {
      if (!slider.current) return;
      const width = window.innerWidth;
      let perView = slidesPerView.sm ?? 1;
      if (width >= 992) perView = slidesPerView.lg;
      else if (width >= 768) perView = slidesPerView.md ?? 2;

      let newSpacing;
      if (width >= 1920) {
        newSpacing = perView === 2 ? 50 : 30;
      } else if (width >= 1440) {
        newSpacing = perView === 2 ? 40 : 20;
      } else {
        newSpacing = perView === 2 ? 30 : 20;
      }

      setPerViewCurrent(perView);
      setSpacing(newSpacing);

      slider.current.update({ slides: { perView, spacing: newSpacing } });

      const maxStart = Math.max(0, items.length - perView);
      if (currentIndex > maxStart) {
        setCurrentIndex(maxStart);
        slider.current.moveToIdx(maxStart);
      }

      requestAnimationFrame(() =>
        syncDerivedFromIndex(currentIndex, slider.current)
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slidesPerView, items.length]);

  useEffect(() => {
    if (!slider.current) return;
    const perView = getPerViewFromSlider(slider.current, perViewCurrent);
    const maxStart = Math.max(0, items.length - perView);
    const safeIdx = clamp(Math.round(currentIndex), 0, maxStart);

    const relRaw = slider.current.track?.details?.rel ?? 0;
    const relRounded = Math.round(relRaw);
    if (relRounded !== safeIdx) {
      slider.current.moveToIdx(safeIdx);
    }

    syncDerivedFromIndex(safeIdx, slider.current);
  }, [currentIndex, perViewCurrent, items.length]);

  const effectivePerView =
    (slider &&
      slider.current &&
      (slider.current.options as any)?.slides?.perView) ||
    perViewCurrent;
  const totalGroups = Math.max(
    1,
    Math.ceil(items.length / Number(effectivePerView))
  );

  const onPrev = () => {
    const perView = getPerViewFromSlider(slider.current, perViewCurrent);
    const maxStart = Math.max(0, items.length - perView);
    const nextIdx = clamp(currentIndex - 1, 0, maxStart);

    setCurrentIndex(nextIdx);

    if (debug) {
      console.log("[onPrev] currentIndex ->", {
        from: currentIndex,
        to: nextIdx,
        perView,
        maxStart,
      });
    }
    if (slider.current) slider.current.moveToIdx(nextIdx);
    requestAnimationFrame(() => syncDerivedFromIndex(nextIdx, slider.current));
  };

  const onNext = () => {
    const perView = getPerViewFromSlider(slider.current, perViewCurrent);
    const maxStart = Math.max(0, items.length - perView);
    const nextIdx = clamp(currentIndex + 1, 0, maxStart);

    setCurrentIndex(nextIdx);

    if (debug) {
      console.log("[onNext] currentIndex ->", {
        from: currentIndex,
        to: nextIdx,
        perView,
        maxStart,
      });
    }
    if (slider.current) slider.current.moveToIdx(nextIdx);
    requestAnimationFrame(() => syncDerivedFromIndex(nextIdx, slider.current));
  };

  const location = useLocation();
  const sliderBtnsStyle = location.pathname.includes("/properties")
    ? "max-md:w-full max-md:justify-between"
    : "";

  return (
    <div className="w-full mt-[40px] lg-custom:mt-[60px] 2xl:mt-[80px]">
      <div
        ref={sliderRef}
        className="keen-slider mb-[30px] lg-custom:mb-10 2xl:mb-[50px] w-full"
      >
        {items.map((item, index) => {
          const isVisible =
            index >= currentIndex && index < currentIndex + perViewCurrent;

          return (
            <div
              key={index}
              className="keen-slider__slide"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {renderSlide(item, index)}
            </div>
          );
        })}
      </div>

      <div
        className={`${counterClassName} flex justify-between items-center pt-4 border-t border-t-white90 dark:border-t-gray15`}
      >
        {showCounter && (
          <p className="text-black dark:text-white text-base 2xl:text-xl font-medium hidden md:block">
            {String(currentGroup).padStart(2, "0")}
            <span className="text-gray40 dark:text-gray60">
              {" "}
              of {String(totalGroups).padStart(2, "0")}
            </span>
          </p>
        )}

        {titleBtnLabel && (
          <div className="block md:hidden">
            <TitleBtn
              label={titleBtnLabel}
              className="whitespace-pre-wrap"
              navigateTo={navigateTo}
              onClick={onClick}
            />
          </div>
        )}

        <div className={`flex items-center gap-2.5 ${sliderBtnsStyle}`}>
          <button
            data-testid="prev-btn"
            disabled={isBeginning}
            onClick={onPrev}
            className={`p-2.5 2xl:p-3.5 border rounded-full w-[44px] 2xl:w-[58px] transition-all duration-300 border-white90 dark:border-gray15 ${
              isBeginning
                ? "bg-inherit opacity-50 cursor-not-allowed"
                : "bg-white97 dark:bg-gray10"
            }`}
          >
            <PrevArrowIcon />
          </button>
          {showCounter && (
            <p className="text-black dark:text-white text-base 2xl:text-xl font-medium block md:hidden ">
              {String(currentGroup).padStart(2, "0")}
              <span className="text-gray40 dark:text-gray60">
                {" "}
                of {String(totalGroups).padStart(2, "0")}
              </span>
            </p>
          )}
          <button
            data-testid="next-btn"
            disabled={isEnd}
            onClick={onNext}
            className={`p-2.5 2xl:p-3.5 border rounded-full w-[44px] 2xl:w-[58px] transition-all duration-300 border-white90 dark:border-gray15 ${
              isEnd
                ? "bg-inherit opacity-50 cursor-not-allowed"
                : "bg-white97 dark:bg-gray10"
            }`}
          >
            <NextArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericSlider;
