import type { ReactNode } from "react";

type LocationInfoBoxProps = {
  icon: ReactNode;
  text: string;
  className: string;
};

function LocationInfoBox({ icon, text, className }: LocationInfoBoxProps) {
  return (
    <div className={`${className} flex justify-between items-center bg-white97 dark:bg-gray10 border-1 border-white90 dark:border-gray15 rounded-[28px] 2xl:py-[14px] 2xl:px-5 py-[10px] px-4 space-x-1 2xl:space-x-1.5}`}>
      {icon}
      <p className="text-sm/[1.5] lg:!text-[12px]  2xl:text-lg font-medium text-black dark:text-white">{text}</p>
    </div>
  );
}

export default LocationInfoBox;

