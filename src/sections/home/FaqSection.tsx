import GenericSlider from "../../components/shared/GenericSlider";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchFaqs } from "../../redux/slices/faqsSlice";
import Title from "../../components/shared/Title";
import FaqCard from "../../components/cards/FaqCard/FaqCard";
import { scrollToTop } from "../../utlis/scrollToTop";

function FaqSection() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.faqs);

  useEffect(() => {
    if (items.length === 0) {
      const unsubscribe = dispatch(fetchFaqs());

      return () => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      };
    }
  }, [dispatch, items.length]);

  const skeletonCount = items.length > 0 ? items.length : 3;

  return (
    <section id="faqs">
      <Title
        heading="Frequently Asked Questions"
        paragraph="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
        buttonLabel="View All FAQ’s"
        paragraphStyle="2xl:max-w-[1236px] lg-custom:max-w-[1003px] w-full"
        anamation="fade-up"
        navigateTo="/allFaq"
        onClick={() => scrollToTop()}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {[...Array(skeletonCount)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between border dark:border-gray15 border-white90 p-[30px] lg-custom:p-[40px] 2xl:p-[50px] rounded-[10px] 2xl:rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="h-8 lg-custom:h-9 2xl:h-10 rounded mb-[20px] lg-custom:mb-[24px] 2xl:mb-[30px] bg-gray-300 dark:bg-gray-600 w-3/4" />
              <div className="h-6 lg-custom:h-7 2xl:h-8 rounded mb-[20px] lg-custom:mb-[24px] 2xl:mb-[30px] bg-gray-300 dark:bg-gray-600 w-full" />
              <div className="h-10 rounded bg-gray10 opacity-70 w-24" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <GenericSlider
          items={items}
          renderSlide={(question, index) =>
            question ? <FaqCard key={index} question={question} /> : null
          }
          slidesPerView={{ lg: 3, md: 2, sm: 1 }}
          showCounter={true}
          titleBtnLabel="View All FAQ’s"
          navigateTo="/allFaq"
          onClick={() => scrollToTop()}
        />
      )}
    </section>
  );
}

export default FaqSection;
