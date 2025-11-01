import { useEffect, useRef, useState, useMemo } from "react";

export default function RotatingText() {
  const text = "✨ Discover Your Dream Property ";
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(88);
  const [isFast, setIsFast] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      if (circleRef.current) {
        setRadius(circleRef.current.offsetWidth / 2);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    if (isFast) {
      const timer = setTimeout(() => setIsFast(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFast]);

  const letters = useMemo(() => text.split(""), [text]);

  return (
    <div  className="absolute bottom-[-55px] lg-custom:bottom-0 2xl:top-[144px] 2xl:left-[-80px] lg-custom:top-[100px] lg-custom:left-[-70px] inline-block z-40">
      <style>{`
        @keyframes rotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateFast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .rotate-slow {
          animation: rotateSlow 10s linear infinite;
        }

        .rotate-fast {
          animation: rotateFast 1s linear;
        }
      `}</style>

      <div className="border border-gray15 rounded-full">
        <div ref={circleRef} className="relative w-28 h-28 lg-custom:w-32 lg-custom:h-32 2xl:w-44 2xl:h-44 flex items-center justify-center rounded-full bg-grey08 overflow-hidden"
            onClick={() => setIsFast(true)} >
          <div className={`absolute w-full h-full rounded-full ${isFast ? "rotate-fast" : "rotate-slow"}`}>
            <div className="absolute w-full h-full rounded-full bg-white99 dark:bg-gray08 z-0" />
            {letters.map((char, i) => (
              <span key={i} className="absolute left-1/2 text-[11px] 2xl:text-[15px] font-semibold z-10 p-[8px]"
                style={{
                  transform: `rotate(${(360 / letters.length) * i}deg)`,
                  transformOrigin: `0 ${radius}px`,
                }}>
                {char}
              </span>
            ))}
          </div>

          <div className="bg-white90 dark:bg-gray10 p-3 md:p-5 2xl:p-7 rounded-full border border-white90 dark:border-gray15 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer">
            <img src="/assets/icons/arrowUpRight.svg" alt="Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}
