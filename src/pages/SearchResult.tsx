import React from "react";
import { useLocation } from "react-router-dom";
import { SectionWrapper } from "../layouts/SectionWrapper";
import Title from "../components/shared/Title";
import PaginationComponent from "../components/PaginationComponent";
import type { PropertyType } from "../types/Property";
import PropertiesCard from "../components/cards/PropertiesCard";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const results: PropertyType[] = location.state?.data ?? [];
  const pageSize = 6;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(results.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const displayedResults = results.slice(start, start + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <SectionWrapper className="mt-[118px] lg-custom:mt-[147px] 2xl:mt-[150px] mb-12">
      <Title
        heading="Search Results"
        titleStyle="pb-5 lg-custom:pb-[30px] 2xl:pb-12"
      />

      {results.length === 0 ? (
        <p className="text-black dark:text-white">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedResults.map((property, idx) => (
            <PropertiesCard
              key={property.id || idx}
              property={{
                image: property.images?.[0],
                title: property.title,
                desc: property.description,
                descriptionLong:property.descriptionLong ,
                details: [
                  { label: property.bedrooms?.toString(), icon: "bed" },
                  { label: property.bathrooms?.toString(), icon: "bath" },
                  { label: property.type, icon: "villa" },
                ],
                Price: property.Price,
                id: property.id,
                tags: property.tags,
              }}
              showDetails={true}
              showTags={true}
            />
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

export default SearchResults;