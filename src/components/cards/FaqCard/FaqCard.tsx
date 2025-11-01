import { useState } from "react";
import TitleBtn from "../../ui/TitleBtn";
import FaqPopup from "./FaqPopup";

type Props = {
  question: {
    question?: string;
    answer?: string;
  };
};

function FaqCard({ question }: Props) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div
        className="h-full 2xl:!min-h-[346px] 2xl:!max-h-[346px] xl:!min-h-[282px] xl:!max-h-[282px] flex flex-col gap-5 xl:gap-6 2xl:gap-[30px] items-start justify-between
        border dark:border-gray15 border-white90 p-[30px] lg-custom:p-[40px] 2xl:p-[50px] rounded-[10px] 2xl:rounded-xl
       hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent 
       dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out"
      >
        <h2 className="  dark:text-white line-clamp-2 text-black text-lg lg-custom:text-xl 2xl:text-2xl font-semibold ">
          {question.question}
        </h2>
        <p className="  text-gray40 dark:text-gray60 text-sm lg-custom:text-base 2xl:text-lg  font-medium  ">
          {question.answer}
        </p>
        <TitleBtn label="Read More" btnStyle={true} onClick={handleShowPopup} />
      </div>

      {showPopup && (
        <FaqPopup
          key="faq-popup"
          question={question.question}
          answer={question.answer}
          onClick={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default FaqCard;
