// Loader.tsx
import BlobIcon from "../icons/BlobIcon";

function Loader() {
  return (
    <div className="fixed inset-0 bg-purple95 dark:bg-gray15 flex items-center justify-center z-90 transition-opacity duration-700 opacity-100">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FBFAFF] via-[#DBCEFD] to-[#703BF7] dark:hidden opacity-30 blur-2xl" />
      <div className="absolute inset-0 bg-gray15 hidden dark:block" />
      <div className="relative z-10 flex space-x-2">
        <span className="w-10 h-10 animate-dotBounce animation-delay-[0.4s]">
          <BlobIcon />
        </span>
        <span className="w-10 h-10 animate-dotBounce animation-delay-[0.25s]">
          <BlobIcon />
        </span>
        <span className="w-10 h-10 animate-dotBounce animation-delay-[0.1s]">
          <BlobIcon />
        </span>
      </div>
    </div>
  );
}

export default Loader;
