import { useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, shallowEqual } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import { fetchPropertyById } from "../../redux/thunks/propertyByIdThunk";
import { useAppSelector } from "../../redux/hooks";

const InquiryForm = lazy(() => import("../../components/Forms/InquiryForm"));

const FormSkeleton: React.FC = () => (
  
  <SectionWrapper className="py-20 lg-custom:py-[120px] 2xl:py-[150px]">
    <div className="grid grid-cols-1 xl:grid-cols-[32.21%_61.53%] 2xl:grid-cols-[33.38%_61.38%] gap-y-10 md:gap-x-10 xl:gap-x-[80px] 2xl:gap-x-[100px]">
      {/* left side */}
      <div className="animate-pulse">
        <div className="h-10 w-52 rounded bg-gray-300 dark:bg-gray-600 opacity-70 mb-2 lg-custom:mb-1.5 2xl:mb-3.5" />
        <div className="h-6 lg-custom:h-7 2xl:h-8 rounded bg-gray-300 dark:bg-gray-600" />
      </div>

      {/* right side */}
      <div className="flex flex-col gap-5 lg-custom:gap-[30px] rounded-lg bg-gray-200 dark:bg-gray-700 p-5 lg-custom:p-10 2xl:p-[50px] animate-pulse">
        {/* first row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg-custom:gap-[30px]">
          <SkeletonBox />
          <SkeletonBox />
        </div>

        {/* second row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg-custom:gap-[30px]">
          <SkeletonBox />
          <SkeletonBox />
        </div>

        {/* third row */}
        <SkeletonBox height="h-[90px] lg-custom:h-[122px] 2xl:h-[170px]" />

        {/* buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 lg-custom:gap-[50px] mt-2.5 2xl:mt-5">
          <div className="h-6 lg-custom:h-7 2xl:h-8 w-full md:w-xs rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-[52px] 2xl:h-[60px] w-full md:w-[191px] 2xl:w-[250px] bg-purple-500 rounded-lg opacity-70" />
        </div>
      </div>
    </div>
  </SectionWrapper>
);

const SkeletonBox: React.FC<{ height?: string }> = ({ height = "h-[52px]" }) => (
  <div>
    <div className="h-10 rounded bg-gray-300 dark:bg-gray-600 opacity-70 w-24 2xl:mb-4 lg-custom:mb-3.5 mb-2.5" />
    <div className={`${height} rounded bg-gray-300 dark:bg-gray-600 w-full`} />
  </div>
);

function PropertyDetailsForm() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useAppSelector(
    (state) => ({
      current: state.properties.current,
      error: state.properties.error,
      loading: state.properties.loading,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    if (id) {
      console.log("Fetching property with id:", id);
      dispatch(fetchPropertyById(id));
    }
  }, [id, dispatch]);
  
  useEffect(() => {
    if (current) {
      console.log("Current property data:", current);
    }
  }, [current]);

  if (loading || !current) {
    return <FormSkeleton />;
  }

  return (
    <SectionWrapper className="py-20 lg-custom:py-[120px] 2xl:py-[150px]">
      <div className="grid grid-cols-1 xl:grid-cols-[38.51%_61.49%] 2xl:grid-cols-[38%_61.7%] gap-y-10 ">
        <Title
          titleStyle="w-full"
          starImg
          heading={`Inquire About ${current.title}`}
          paragraph="Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
          paragraphStyle="lg-custom:w-[85%] 2xl:w-[86%] w-full"
          data-aos="fade-left"
        />

        <div className="w-full">
          <Suspense
            fallback={
              <div className="animate-pulse h-[400px] rounded-xl bg-gray-200 dark:bg-gray-700" />
            }
          >
            <InquiryForm
              type="property"
              propertyTitle={current.title}
              propertyLocation={current.location ?? "Unknown Location"}
            />
          </Suspense>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PropertyDetailsForm;
