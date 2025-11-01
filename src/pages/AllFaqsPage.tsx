import { useEffect } from "react";
import PaginationComponent from "../components/PaginationComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SectionWrapper } from "../layouts/SectionWrapper";
import Title from "../components/shared/Title";
import FaqCard from "../components/cards/FaqCard/FaqCard";
import { fetchFaqs } from "../redux/slices/faqsSlice";
import type { Faqs } from "../redux/types/FAQ";

const AllFaqsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((state) => state.faqs);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const skeletonCount = items.length > 0 ? items.length : 3;

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchFaqs());
    }
  }, [dispatch, items.length]);

  const pageSize = 6;
  const totalPages = Math.ceil(items.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const displayedItems = items.slice(start, start + pageSize);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
  };
  return (
    <SectionWrapper className="mt-[118px] lg-custom:mt-[147px] 2xl:mt-[150px] mb-12">
      <Title
        heading="All FAQ’s"
        titleStyle="pb-5 lg-custom:pb-[30px] 2xl:pb-12"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((question: Faqs, index: number) => (
            <FaqCard key={index} question={question} />
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
};

export default AllFaqsPage;
