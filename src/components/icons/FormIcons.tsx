type IconProps = {
  className?: string;
  hoverClassName?: string;
  color?: string;
  onClick?: () => void;
};

export function PhoneIcon({ className = "", onClick }: IconProps) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300 w-5 h-5 2xl:w-6 2xl:h-6`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4.5C2 2.84315 3.34315 1.5 5 1.5H6.37163C7.232 1.5 7.98197 2.08556 8.19064 2.92025L9.29644 7.34343C9.47941 8.0753 9.20594 8.84555 8.60242 9.29818L7.3088 10.2684C7.17447 10.3691 7.14527 10.5167 7.183 10.6197C8.31851 13.7195 10.7805 16.1815 13.8803 17.317C13.9833 17.3547 14.1309 17.3255 14.2316 17.1912L15.2018 15.8976C15.6545 15.2941 16.4247 15.0206 17.1566 15.2036L21.5798 16.3094C22.4144 16.518 23 17.268 23 18.1284V19.5C23 21.1569 21.6569 22.5 20 22.5H17.75C9.05151 22.5 2 15.4485 2 6.75V4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EmailIcon({ className = "", onClick }: IconProps) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300 w-5 h-5 2xl:w-6 2xl:h-6`}
    >
      <path
        d="M1.75 8.6691V17.25C1.75 18.9069 3.09315 20.25 4.75 20.25H19.75C21.4069 20.25 22.75 18.9069 22.75 17.25V8.6691L13.8223 14.1631C12.8581 14.7564 11.6419 14.7564 10.6777 14.1631L1.75 8.6691Z"
        fill="currentColor"
      />
      <path
        d="M22.75 6.90783V6.75C22.75 5.09315 21.4069 3.75 19.75 3.75H4.75C3.09315 3.75 1.75 5.09315 1.75 6.75V6.90783L11.4639 12.8856C11.946 13.1823 12.554 13.1823 13.0361 12.8856L22.75 6.90783Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DropdownIcon({ className = "", onClick }: IconProps) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300 w-5 h-5 2xl:w-6 2xl:h-6`}
    >
      <path
        d="M19.5 8.25L12 15.75L4.5 8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationIcon({ className = "", onClick }: IconProps) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300 w-5 h-5 2xl:w-6 2xl:h-6`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5397 22.351C11.57 22.3685 11.5937 22.3821 11.6105 22.3915L11.6384 22.4071C11.8613 22.5294 12.1378 22.5285 12.3608 22.4075L12.3895 22.3915C12.4063 22.3821 12.43 22.3685 12.4603 22.351C12.5207 22.316 12.607 22.265 12.7155 22.1982C12.9325 22.0646 13.2388 21.8676 13.6046 21.6091C14.3351 21.0931 15.3097 20.3274 16.2865 19.3273C18.2307 17.3368 20.25 14.3462 20.25 10.5C20.25 5.94365 16.5563 2.25 12 2.25C7.44365 2.25 3.75 5.94365 3.75 10.5C3.75 14.3462 5.76932 17.3368 7.71346 19.3273C8.69025 20.3274 9.66491 21.0931 10.3954 21.6091C10.7612 21.8676 11.0675 22.0646 11.2845 22.1982C11.393 22.265 11.4793 22.316 11.5397 22.351ZM12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
