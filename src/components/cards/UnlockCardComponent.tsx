import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utlis/scrollToTop";

export type unlockCardComponentProps = {
  cardStyle?: string;
  title: string;
  titleStyle?: string;
  desc: string;
  descStyle?: string;
  investments?: boolean;
};

const UnlockCardComponent = ({
  cardStyle,
  title,
  titleStyle,
  desc,
  descStyle,
  investments,
}: unlockCardComponentProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`relative rounded-xl bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 ${cardStyle}`}
    >
      <div className="flex flex-wrap justify-between gap-5 md:gap-3.5 2xl:gap-5 items-center mb-5 2xl:mb-[30px]">
        <h2 className={`text-black dark:text-white ${titleStyle}`}>
          {" "}
          {title}{" "}
        </h2>
        {!investments && (
          <button
            onClick={() => {
              navigate("/properties"), scrollToTop();
            }}
            className="bg-purple90 hover:bg-purple75 dark:bg-gray08 dark:hover:bg-gray15 text-sm 2xl:text-lg font-medium text-black dark:text-white rounded-lg 2xl:rounded-xl border border-white90 dark:border-gray15 max-md:w-full py-3.5 px-5 2xl:py-[18px] 2xl:px-6 "
          >
            Learn More
          </button>
        )}
      </div>

      <p
        className={`text-sm md:text-base 2xl:text-lg font-medium ${descStyle}`}
      >
        {desc}
      </p>

      {investments && (
        <button
          onClick={() => {
            navigate("/properties"), scrollToTop();
          }}
          className="bg-purple90 hover:bg-purple75 dark:bg-gray08 dark:hover:bg-gray15 text-sm 2xl:text-lg font-medium text-black dark:text-white rounded-lg 2xl:rounded-xl border border-white90 dark:border-gray15 py-[18px] px-6 w-full mt-[30px]"
        >
          Learn More
        </button>
      )}
    </div>
  );
};

export default UnlockCardComponent;
