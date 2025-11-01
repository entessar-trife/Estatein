import { SectionWrapper } from "../../layouts/SectionWrapper";
import FormSelect from "../../components/Forms/FormSelect";
import MainButton from "../../components/ui/MainButton";
import {
  SearchIcon,
  LocationIcon,
  PropertyIcon,
  PricingIcon,
  PropertySizeIcon,
  BuildIcon,
} from "../../components/icons/FilterPropertyIcons";
import { useState, useMemo, useCallback, type JSX } from "react";
import { fetchFilteredProperties } from "../../redux/thunks/filteredProperties";
import { useAppDispatch } from "../../redux/types/typed-hooks";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utlis/scrollToTop";
import AlertMessage from "../../components/ui/AlertMessage";

type Filters = {
  searchTerm: string;
  location: string;
  propertyType: string;
  pricingRange: string;
  propertySize: string;
  buildYear: string;
};

type SelectField = {
  name: keyof Filters;
  placeholder: string;
  options: string[];
  icon: JSX.Element;
};

const FilterProperty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    location: "",
    propertyType: "",
    pricingRange: "",
    propertySize: "",
    buildYear: "",
  });

  const handleChange = useCallback((name: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback(async () => {
    const hasAnyValue = Object.values(filters).some((val) => val.trim() !== "");
    if (!hasAnyValue) {
      setShowAlert(true);
      return;
    }

    try {
      const resultAction = await dispatch(fetchFilteredProperties(filters));
      if (fetchFilteredProperties.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        navigate("/search-results", { state: { data } });
        scrollToTop();
      } else {
        alert("Something wrong happened...");
      }
    } catch (error) {
      console.error(error);
      alert("Something wrong happened...");
    }
  }, [filters, dispatch, navigate]);

  const selectFields: SelectField[] = useMemo(
    () => [
      {
        name: "location",
        placeholder: "Location",
        options: ["Dharwad", "Hubli", "Belgaum", "Mysore", "Bangalore"],
        icon: <LocationIcon className="text-black dark:text-white" />,
      },
      {
        name: "propertyType",
        placeholder: "Property Type",
        options: ["villa", "apartment", "house"],
        icon: <PropertyIcon className="text-black dark:text-white" />,
      },
      {
        name: "pricingRange",
        placeholder: "Pricing Range",
        options: ["100 - 99999", "100000-200000", "200000-500000", "500000+"],
        icon: <PricingIcon className="text-black dark:text-white" />,
      },
      {
        name: "propertySize",
        placeholder: "Property Size",
        options: ["1", "2", "3+"],
        icon: <PropertySizeIcon className="text-black dark:text-white" />,
      },
      {
        name: "buildYear",
        placeholder: "Build Year",
        options: ["2023", "2024", "2025"],
        icon: <BuildIcon className="text-black dark:text-white" />,
      },
    ],
    []
  );

  return (
    <SectionWrapper className="mt-0 lg-custom:-mt-12 2xl:-mt-16 py-5 lg:py-0 w-full">
      {showAlert && (
        <AlertMessage
          message="Oops! Looks like you forgot to choose a filter"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="mb-5 lg:mb-0 rounded-xl bg-purple70/60 dark:bg-gray10 border-r border-l border-1 border-gray08/60 dark:border-gray15 w-full lg:w-[81.4536%] lg:mx-auto pt-2.5 px-2.5">
        <div
          data-aos="fade-up"
          className="px-4 py-2 flex justify-between items-center mb-2.5 rounded-lg bg-white99 dark:bg-gray08 text-black dark:text-white focus:outline-none focus:border-purple-500"
        >
          <input
            type="text"
            placeholder="Search For A Property"
            className="w-full md:w-8/12 outline-none bg-transparent placeholder:text-black dark:placeholder:text-gray40"
            value={filters.searchTerm}
            onChange={(e) => handleChange("searchTerm", e.target.value)}
          />
          <MainButton
            variant="normalPurple"
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-2 font-semibold rounded-lg"
          >
            <SearchIcon className="text-black dark:text-white" />
            <span className="hidden lg:block">Find Property</span>
          </MainButton>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-2.5 space-y-[50px] rounded-xl w-full bg-purple70/60 dark:bg-gray10 border-1 border-gray15"
      >
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 lg-custom:grid-cols-5 gap-5"
        >
          {selectFields.map((field) => (
            <FormSelect
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={filters[field.name]}
              onChange={(val) => handleChange(field.name, val)}
              options={field.options}
              error=""
              classExtra="bg-white99 dark:bg-gray08 rounded-lg 2xl:rounded-xl"
              classNameCustom="py-[12px] pr-10.5 pl-3.5 2xl:p-5 2xl:pr-[52px] text-black dark:text-gray60 text-sm/[1.5] 2xl:text-lg"
              classIcon="bg-purple90 dark:bg-gray10 rounded-full right-[14px] md:right-1 lg:right-[14px] 2xl:right-5 p-1"
            >
              <div className="flex items-center border-r border-white90 dark:border-gray15 pr-2.5">
                {field.icon}
              </div>
            </FormSelect>
          ))}
        </div>
      </form>
    </SectionWrapper>
  );
};

export default FilterProperty;
