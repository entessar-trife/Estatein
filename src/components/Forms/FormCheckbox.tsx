import type { CheckboxProps } from "../../types/Form";

function FormCheckbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center text-lg font-medium text-gray40 dark:text-gray60 space-x-[6px] 2xl:space-x-2.5 relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <div
        className="
           w-6 h-6 2xl:w-7 2xl:h-7 rounded-sm
          border border-gray15
          bg-white97 dark:bg-gray10
          transition-colors duration-200
          flex items-center justify-center
           peer-checked:border-purple60
          focus-within:ring-2 focus-within:ring-purple60/30
          hover:border-purple60
        "
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 8.5L7 11.5L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className="text-sm lg-custom:text-base 2xl:text-lg"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </label>
  );
}

export default FormCheckbox;
