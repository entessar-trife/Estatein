import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";

import Gallery from "../../components/Sliders/Gallery";
import DescriptionComponent from "../../components/cards/DescriptionComponent";
import KeyFeaturesComponent from "../../components/cards/KeyFeaturesComponent";
import { LocationIcon } from "../../components/icons/FormIcons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPropertyById } from "../../redux/thunks/propertyByIdThunk";

interface PropertyGalleryProps {
  id: string;
}

const PropertyGallery = ({ id }: PropertyGalleryProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { current, error, loading } = useAppSelector(
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

  useEffect(() => {
    if (error === "not-found") navigate("/properties");
  }, [error, navigate]);

  const galleryDesktop = useMemo(
    () =>
      current?.images && (
        <Gallery
          perView={2}
          thumbNumber={9}
          images={current.images}
          className="hidden lg-custom:flex"
        />
      ),
    [current?.images]
  );

  const galleryMobile = useMemo(
    () =>
      current?.images && (
        <Gallery
          perView={1}
          thumbNumber={4}
          images={current.images}
          className="lg-custom:hidden"
        />
      ),
    [current?.images]
  );

  // main SkeletonBox style
  const SkeletonBox = ({ className = "" }) => (
    <div
      className={`rounded-[10px] 2xl:rounded-lg bg-gray-300 dark:bg-gray-600 animate-pulse ${className}`}
    ></div>
  );

  if (loading)
    return (
      // Skeleton Loader
      <div className="flex flex-col gap-12">
        <div className="flex min-md:justify-between items-end md:items-center gap-5">
          <div className="flex flex-col lg-custom:flex-row items-center gap-5">
            <SkeletonBox className="h-9 w-24" />
            <SkeletonBox className="h-9 w-24" />
          </div>
          <SkeletonBox className="h-9 w-24" />
        </div>

        <div
          className="bg-gray-200 dark:bg-gray-700 rounded-xl p-5 md:p-10 2xl:p-12 
        flex flex-col items-center gap-5 2xl:gap-8 w-full mx-auto"
        >
          {/* Thumbnails Skeleton */}
          <SkeletonBox className="w-full h-36 rounded-lg bg-gray-300 dark:bg-gray-600" />

          {/* Main Image Skeleton */}
          <div className="flex justify-between gap-5 w-full">
            <SkeletonBox className="max-lg-custom:w-full w-1/2 h-[583px]" />
            <SkeletonBox className="max-lg-custom:hidden w-1/2 h-[583px]" />
          </div>

          {/* Controls Skeleton */}
          <div
            className="p-2.5 rounded-[100px] bg-white99 dark:bg-gray08 flex gap-2.5 items-center
           order-3 w-full max-w-[200px] justify-center"
          >
            <SkeletonBox className="w-12 h-12 !rounded-full" />
            <div className="flex gap-[3px] flex-1 justify-center">
              <SkeletonBox className="w-5 h-1.5 rounded-[60px]" />
            </div>
            <SkeletonBox className="w-12 h-12 !rounded-full" />
          </div>
        </div>

        <div className="flex flex-col lg-custom:flex-row gap-5">
          {/* description box */}
          <div className="p-5 lg-custom:p-10 2xl:p-[50px] bg-gray-200 dark:bg-gray-700 rounded-[10px] border border-white90 dark:border-gray15 flex flex-col gap-5 lg-custom:gap-10 2xl:gap-[50px] w-full lg-custom:w-1/2 h-fit">
            <SkeletonBox className="h-9 w-[30%]" />
            <SkeletonBox className="h-9 w-full" />
            <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-5 lg-custom:gap-10 pt-4 justify-between">
              <SkeletonBox className="flex-1 h-16" />
              <SkeletonBox className="flex-1 h-16" />
              <SkeletonBox className="flex-1 h-16" />
            </div>
          </div>

          {/* key Features box */}
          <div className="p-5 lg-custom:p-10 2xl:p-[50px] bg-gray-200 dark:bg-gray-700 rounded-xl border border-white90 dark:border-gray15 flex flex-col gap-5 lg-custom:gap-10 2xl:gap-[50px] w-full lg-custom:w-1/2">
            <SkeletonBox className="h-9 w-1/2" />
            <SkeletonBox className="h-60 w-full" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-[30px] lg-custom:gap-10 2xl:gap-[50px] text-black dark:text-white">
      <div className="flex min-md:justify-between items-end md:items-center">
        <div className="flex max-md:flex-col items-start md:items-center gap-2.5 md:gap-5">
          <h1 className="font-semibold text-xl lg-custom:text-2xl 2xl:text-3xl">
            {current?.title}
          </h1>
          <div className="border border-white90 dark:border-gray15 lg-custom:rounded-md rounded-lg p-2  flex gap-1.5">
            <LocationIcon />
            <h2 className="font-medium text-sm 2xl:text-lg">
              {current?.location}
            </h2>
          </div>
        </div>
        <div className="flex lg-custom:flex-col items-center lg-custom:items-start gap-1 lg-custom:gap-0.5 max-md:mb-[5px] max-md:-ml-16">
          <p className="text-gray40 dark:text-gray60 text-sm 2xl:text-[16px] font-medium">
            Price
          </p>
          <p className="font-semibold text-lg lg-custom:text-xl 2xl:text-2xl">
            ${current?.price}
          </p>
        </div>
      </div>

      {galleryDesktop}
      {galleryMobile}

      <div className="flex flex-col lg-custom:flex-row gap-5 2xl:gap-6">
        <DescriptionComponent />
        <KeyFeaturesComponent />
      </div>
    </div>
  );
};

export default PropertyGallery;
