import type { TextareaProps } from "../../types/Form";
function FormTextarea({
  label,
  name,
  value,
  onChange,
  error,
  className,
}: TextareaProps) {
  return (
    <div className={`${className} flex flex-col col-span-2`}>
      <label
        htmlFor={name}
        className="lg-custom:mb-4 mb-2.5 2xl:text-xl text-base/[1.5] dark:text-white text-black font-semibold"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder="Enter your Message here.."
        value={value}
        onChange={onChange}
        className="rounded-md 2xl:rounded-lg dark:bg-gray10 bg-white97 dark:text-gray30 text-black 2xl:text-lg lg-custom:text-sm/[20px] font-medium border-1 dark:border-gray15 border-white90 2xl:px-5 2xl:py-6 px-5 py-4 2xl:h-42.5 lg-custom:h-30.5 h-22.5"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormTextarea;
