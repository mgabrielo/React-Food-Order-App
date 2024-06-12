import { useSearchRestaurant } from "@/api/RestaurantAPI";
import { CuisineFilter } from "@/components/lib/CuisineFilter";
import { PaginationSelector } from "@/components/lib/PaginationSelector";
import { SearchBar, SearchForm } from "@/components/lib/SearchBar";
import { SearchResultCard } from "@/components/lib/SearchResultCard";
import { SearchResultInfo } from "@/components/lib/SearchResultInfo";
import { SortOptionDropDown } from "@/components/lib/SortOptionDropDown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page?: number;
  selectedCuisines: string[];
  sortOption: string;
};

export const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading } = useSearchRestaurant(city, searchState);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const getSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city || results?.data === undefined) {
    return <span>No Results Found</span>;
  }

  const getSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  const getPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const getSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={getSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={getSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
          <SearchResultInfo city={city} total={results.pagination.total} />
          <SortOptionDropDown
            sortOption={searchState.sortOption}
            onChange={(value: string) => getSortOption(value)}
          />
        </div>
        {results.data.length > 0 &&
          results?.data.map((restaurant, idx) => (
            <SearchResultCard key={idx} restaurant={restaurant} />
          ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={getPage}
        />
      </div>
    </div>
  );
};
