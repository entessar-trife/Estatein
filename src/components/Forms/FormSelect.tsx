import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { SelectProps } from "../../types/Form";
import { DropdownIcon } from "../icons/FormIcons";

function FormSelect({ label, name, value, placeholder, onChange, options, error, classExtra = "bg-white97 dark:bg-gray10", classIcon, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(value || "");
  const selectRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onChange(opt);
    onChange(opt);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col group shrink-0" ref={selectRef}>
      {label && (
        <label
          htmlFor={name}
          className="2xl:mb-4 lg-custom:mb-3.5 mb-2.5 2xl:text-xl text-base/[1.5] text-black dark:text-white font-semibold"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {label}
        </label>
      )}

      <div className={`relative bg-purple90 flex flex-col border-1 rounded-lg border-white90 dark:border-gray15 text-gray30 text-sm hover:text-purple75 transition-colors duration-300 ${classExtra}`}>
        <div className={`flex gap-2.5 px-4 py-5 h-[53.45px]  ${classExtra} items-center cursor-pointer`} onClick={() => setIsOpen(prev => !prev)}>
          {children}
          <span
            className={`${
              selected ? "text-black dark:text-white" : ""
            }`}
          >
            {selected || placeholder || "Select"}
          </span>

          <div className={`absolute top-1/2 transform -translate-y-1/2 ${classIcon}`} 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(prev => !prev);
          }}>
            <DropdownIcon
              className={`text-black dark:text-white transition-transform duration-200 cursor-pointer ${
                isOpen ? "rotate-180" : ""
              } `}
            />
          </div>
        </div>
      </div>

      {isOpen && createPortal(
        <ul
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            width: coords.width,
            maxHeight: "240px",
            overflow: "auto",
            zIndex: 9999,
          }}
          className="bg-white dark:bg-gray10 border border-gray-200 dark:border-gray15 text-gray40 rounded-lg shadow-lg"
        >
          {options.map(opt => (
            <li
              key={opt}
              className={`px-5 py-3 hover:bg-purple75 dark:hover:bg-purple90 cursor-pointer :text-gray40 text-sm font-medium ${selected === opt ? "bg-purple90 dark:bg-purple90" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>,
        document.body
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormSelect;
