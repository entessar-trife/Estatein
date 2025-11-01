import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import ReviewModal from "../../components/cards/ReviewModal";
import { listenToTestimonials } from "../../utlis/firebaseListeners/testimonialsListener";
import type { Client } from "../../redux/types/client";
import { scrollToTop } from "../../utlis/scrollToTop";
import Card from "../../components/cards/TestimonialCard/Card";
import type { RootState } from "../../redux/store";
import GenericSlider from "../../components/shared/GenericSlider";

function OurClientsSection() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.testimonials
  );

  useEffect(() => {
    const reviewed = localStorage.getItem("hasReviewed");
    if (reviewed === "true") setHasReviewed(true);
  }, []);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(listenToTestimonials());
    }
  }, [dispatch, items]);

  const handleCloseModal = () => setShowReviewModal(false);
  const skeletonCount = items?.length > 0 ? items.length : 3;

  return (
    <SectionWrapper
      id="testimonials"
      className="pt-20 lg-custom:pt-[120px] 2xl:pt-[150px]"
    >
      <section className="relative" id="testimonials">
        <Title
          heading="What Our Clients Say"
          paragraph="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
          buttonLabel="View All Testimonials"
          paragraphStyle="2xl:max-w-[1181px] lg-custom:max-w-[960px] w-full"
          onClick={() => scrollToTop()}
          anamation="fade-up"
          navigateTo="allTestimonials"
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {[...Array(skeletonCount)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-6 xl:gap-[30px] 2xl:gap-[40px] h-full 2xl:!min-h-[442px] 2xl:!max-h-[442px] xl:!min-h-[363px] xl:!max-h-[363px] p-[30px] xl:p-[40px] 2xl:p-[50px] rounded-[10px] 2xl:rounded-xl border dark:border-gray15 border-white90 bg-gray-200 dark:bg-gray-700 animate-pulse"
              >
                {/* Star Rating Skeleton */}
                <div className="flex gap-2">
                  {[...Array(5)].map((_, starIdx) => (
                    <div
                      key={starIdx}
                      className="w-[30px] h-[30px] lg-custom:w-[38px] lg-custom:h-[36px] 2xl:w-11 2xl:h-11 rounded-full bg-gray-300 dark:bg-gray-600"
                    />
                  ))}
                </div>

                {/* Subject & Review Skeleton */}
                <div className="flex flex-col gap-1.5 xl:gap-2.5 2xl:gap-3.5">
                  <div className="h-6 xl:h-7 2xl:h-8 rounded bg-gray-300 dark:bg-gray-600 w-3/4"></div>
                  <div className="h-4 xl:h-5 2xl:h-6 rounded bg-gray-300 dark:bg-gray-600 w-full"></div>
                </div>

                {/* Client Info Skeleton */}
                <div className="flex gap-2.5 2xl:gap-3 items-center">
                  <div className="w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-4 xl:h-5 2xl:h-6 rounded bg-gray-300 dark:bg-gray-600 w-1/2"></div>
                    <div className="h-3 xl:h-4 2xl:h-5 rounded bg-gray-300 dark:bg-gray-600 w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <GenericSlider<Client>
              items={items}
              renderSlide={(client: Client) => (
                <Card key={client.name} client={client} />
              )}
              slidesPerView={{ lg: 3, md: 2, sm: 1 }}
              showCounter
              titleBtnLabel="View All Testimonials"
              navigateTo="allTestimonials"
              onClick={() => scrollToTop()}
            />

            {!hasReviewed && (
              <button
                className="text-base cursor-pointer text-black dark:text-white underline mt-6 hover:text-purple60 hover:scale-105 duration-300"
                onClick={() => setShowReviewModal(true)}
              >
                Add a review
              </button>
            )}
          </>
        )}

        {showReviewModal && (
          <ReviewModal
            onSuccess={() => {
              localStorage.setItem("hasReviewed", "true");
              setHasReviewed(true);
            }}
            closeModal={handleCloseModal}
          />
        )}
      </section>
    </SectionWrapper>
  );
}

export default OurClientsSection;
