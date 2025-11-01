import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { listenToTestimonials } from "../utlis/firebaseListeners/testimonialsListener";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { SectionWrapper } from "../layouts/SectionWrapper";
import Title from "../components/shared/Title";
import type { Client } from "../redux/types/client";
import Card from "../components/cards/TestimonialCard/Card";

function AllClientsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector(
    (state) => state.testimonials
  );

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (items.length === 0) {
      dispatch(listenToTestimonials());
    }
  }, [dispatch, items.length]);

  const pageSize = 6;
  const totalPages = Math.ceil(items.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const displayedItems = items.slice(start, start + pageSize);
  const skeletonCount = items.length > 0 ? items.length : 3;

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <SectionWrapper className="mt-[118px] lg-custom:mt-[147px] 2xl:mt-[150px] mb-12">
      <Title
        heading=" All Testimonials"
        titleStyle="pb-5 lg-custom:pb-[30px] 2xl:pb-12"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(skeletonCount)].map((_, i) => (
            <div
              key={i}
              className="p-[30px] lg-custom:p-[40px] 2xl:p-[50px] rounded-[10px] 2xl:rounded-xl border dark:border-gray15 border-white90 bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="flex gap-2 2xl:gap-2.5 mb-6 lg-custom:mb-[30px] 2xl:mb-10">
                {[...Array(5)].map((_, starIdx) => (
                  <div
                    key={starIdx}
                    className="w-[30px] h-[30px] lg-custom:w-[38px] lg-custom:h-[36px] 2xl:w-11 2xl:h-11 rounded-full bg-gray-300 dark:bg-gray-600"
                  />
                ))}
              </div>
              <div className="mb-6 lg-custom:mb-[30px] 2xl:mb-10">
                <div className="h-7 lg-custom:h-8 2xl:h-9 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3" />
                <div className="h-5 lg-custom:h-6 2xl:h-7 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              </div>
              <div className="flex gap-2.5 2xl:gap-3 items-center">
                <div className="w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-5 lg-custom:h-6 2xl:h-7 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                  <div className="h-4 lg-custom:h-5 2xl:h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((client: Client, index: number) => (
            <Card key={index} client={client} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="my-8">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </SectionWrapper>
  );
}

export default AllClientsPage;
