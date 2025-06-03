import { useState } from "react";
import { ListSearchBar } from "./components/ListSearchBar";
import { HotelListSection } from "./sections/HotelListSection/HotelListSection";

// Define the filter state type
interface FilterState {
  sortBy: string;
  hotelName: string;
  starRating: string[];
  currency: string;
  meals: string[];
  payment: string[];
  distanceRange: number[];
  priceRange: number[];
  reviewsRating: string[];
  hotelFacilities: string[];
  roomFacilities: string[];
  accommodationFeatures: string[];
  green: string[];
  propertyTypes: string[];
}

export const List = (): JSX.Element => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "popularity",
    hotelName: "",
    starRating: [],
    currency: "USD",
    meals: [],
    payment: [],
    distanceRange: [25],
    priceRange: [1, 1255],
    reviewsRating: [],
    hotelFacilities: [],
    roomFacilities: [],
    accommodationFeatures: [],
    green: [],
    propertyTypes: []
  });

  const [searchLoading, setSearchLoading] = useState(false);

  const handleFiltersChange = (newFilters: FilterState) => {
    console.log("🔧 Filters updated:", newFilters);
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    console.log("🔍 Search query:", query);
    setSearchLoading(true);
    
    // TODO: Implement search logic
    setTimeout(() => {
      setSearchLoading(false);
    }, 1000);
  };

  return (
    <main className="flex flex-col w-full min-h-screen">
      <ListSearchBar 
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        loading={searchLoading}
      />
      <HotelListSection filters={filters} />
    </main>
  );
};