type CloseIconProps = {
  className?: string;
  onClick?: () => void;
};

const CloseIcon = ({
  className = "w-6 h-6 text-gray-700",
  onClick,
}: CloseIconProps) => (
  <svg
    className={`${className} cursor-pointer absolute top-2 right-2.5 lg-custom:top-5 lg-custom:right-5`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
