import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  onClick,
  mobile = false,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? mobile
            ? "block py-2 px-4 rounded-md  bg-gray15/60 text-white dark:bg-gray15"
            : "dark:bg-gray08 bg-gray08/60 text-white md:py-3 md:px-5 2xl:py-3.5 2xl:px-6 md:rounded-lg 2xl:rounded-[10px] dark:border dark:border-gray15  transition-all duration-150 ease-in-out "
          : mobile
          ? "block py-2 px-4 text-white "
          : " transition-all duration-75 ease-in-out relative md:py-3 md:px-5 2xl:py-3.5 2xl:px-6 md:rounded-lg 2xl:rounded-[10px] before:absolute before:top-0 before:left-0 before:w-0 before:h-0  before:border-t-0 before:border-l-0 before:border-purple60 before:md:rounded-lg before:2xl:rounded-[10px]  after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0  after:border-b-0 after:border-r-0 after:border-purple60 after:md:rounded-lg after:2xl:rounded-[10px]    before:transition-all before:duration-300 before:ease-in-out  after:transition-all after:duration-300 after:ease-in-out    hover:before:w-full hover:before:h-full hover:before:border-t-1 hover:before:border-l-1  hover:after:w-full hover:after:h-full hover:after:border-b-1 hover:after:border-r-1"
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
