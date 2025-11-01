import { useEffect } from "react";
import PaginationComponent from "../components/PaginationComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SectionWrapper } from "../layouts/SectionWrapper";
import Title from "../components/shared/Title";
import PropertiesCard from "../components/cards/PropertiesCard";
import { listenToProperties } from "../utlis/firebaseListeners/propertiesListener";
import type { PropertyType } from "../types/Property";

const AllPropertiesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    all: items,
    loading,
    error,
  } = useAppSelector((state) => state.properties);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (items.length === 0) {
      dispatch(listenToProperties());
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
    <SectionWrapper className="mt-[118px] lg-custom:mt-[130px] 2xl:mt-[150px] mb-12">
      <Title
        heading="All Properties"
        titleStyle="pb-5 lg-custom:pb-[30px] 2xl:pb-12"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="p-6 lg-custom:p-[30px] 2xl:p-[40px] border dark:border-gray15 border-white90 rounded-xl animate-pulse bg-gray-200 dark:bg-gray-700"
            >
              <div className="w-full h-[210px] lg-custom:h-[255px] 2xl:h-[318px] rounded-[10px] mb-4 lg-custom:mb-5 2xl:mb-[30px] bg-gray-300 dark:bg-gray-600" />
              <div className="w-32 h-7 2xl:h-9 rounded-[28px] bg-gray-300 dark:bg-gray-600 mb-5" />
              <div className="h-7 lg-custom:h-8 2xl:h-9 bg-gray-300 dark:bg-gray-600 rounded mb-1 lg-custom:mb-1.5 2xl:mb-2 w-3/4" />
              <div className="h-5 lg-custom:h-6 2xl:h-7 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-full" />
              <div className="flex flex-wrap gap-1.5 2xl:gap-2.5 mb-5 lg-custom:mb-6 2xl:mb-[30px]">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[100px] 2xl:w-[120px] h-8 2xl:h-10 rounded-[28px] bg-gray-300 dark:bg-gray-600"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between gap-[30px] lg-custom:gap-[40px] 2xl:gap-[50px]">
                <div className="flex flex-col">
                  <div className="h-5 2xl:h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                  <div className="h-7 lg-custom:h-8 2xl:h-9 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
                <div className="w-48 h-10 2xl:h-12 bg-purple-500 rounded-lg opacity-70" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((property: PropertyType) => (
            <PropertiesCard key={property.id} property={property} />
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

export default AllPropertiesPage;
