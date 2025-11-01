import type { ReactNode, ChangeEvent } from "react";

type PreferredContactMethodProps = {
  icon: ReactNode;
  type: "tel" | "email";
  name: "phone" | "email";
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRadioChange: (value: string) => void; 
  checked: boolean; 
};

function PreferredContactMethod({
  icon,
  type,
  name,
  value,
  placeholder,
  onChange,
  onRadioChange,
  checked,
}: PreferredContactMethodProps) {
  return (
    <div className="relative w-full lg-custom:w-1/2 group">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md 2xl:rounded-lg border-1 border-white90 bg-white97 px-5 py-4 2xl:py-6 2xl:pr-12 pl-11.5 2xl:pl-15 font-medium [@media(min-width:1690px)]:text-lg [@media(min-width:1530px)]:text-[15px] text-sm/[20px] dark:border-gray15 dark:bg-gray10 text-black dark:text-gray30"
        disabled={!checked}
      />
      <input
        type="radio"
        name="preferredContact"
        value={name}
        checked={checked}
        onChange={() => onRadioChange(name)}
        className="absolute 2xl:right-6 right-5 top-1/2 w-2.5 h-2.5 2xl:h-4 2xl:w-4 -translate-y-1/2 appearance-none rounded-full border-1 border-purple60 bg-purple95 dark:bg-gray10 checked:bg-purple60 cursor-pointer"
      />
    </div>
  );
}

export default PreferredContactMethod;