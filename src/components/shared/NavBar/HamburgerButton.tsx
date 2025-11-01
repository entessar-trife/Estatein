interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({isOpen, onClick}) => {
  return (
    <button className="lg-custom:hidden flex flex-col justify-center items-center w-8 h-8 relative" onClick={onClick} aria-label="Toggle Menu">
      <span className={`w-6 h-0.5 bg-gray20 dark:bg-white absolute right-0 transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-2"}`}>
      </span>

      <span
        className={`w-6 h-0.5 bg-gray20 dark:bg-white absolute right-0 transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"}`}>
        </span>
      <span
        className={` h-0.5 bg-gray20 dark:bg-white absolute right-0 transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-0.5 w-6" : "translate-y-2 w-3" }`}>
      </span>
    </button>
  )
}

export default HamburgerButton
