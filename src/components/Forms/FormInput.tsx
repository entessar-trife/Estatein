import type { InputProps } from "../../types/Form";

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  className
}: InputProps) {
  return (
    <div className="flex flex-col w-full relative">
      <label
        htmlFor={name}
        className="2xl:mb-4 lg-custom:mb-3.5 mb-2.5 text-base/[1.5] 2xl:text-xl text-black dark:text-white font-semibold"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={`rounded-md 2xl:rounded-lg bg-white97 dark:bg-gray10 text-black dark:text-gray30 2xl:text-lg text-sm/[20px] font-medium border-1 border-white90 dark:border-gray15 2xl:py-6 px-5 py-4 ${className}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 absolute left-0 top-full">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
