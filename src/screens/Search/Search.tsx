import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsSection } from "./sections/HotelListSection"; // Now using renamed section
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";
import { CallToActionSection } from "./sections/CallToActionSection";

interface SearchResults {
  hotels: any[];
  totalHotels: number;
  availableHotels: number;
  searchParams: {
    destination: string;
    destinationId: string;
    checkin: string;
    checkout: string;
    guests: number;
    rooms: number;
    formattedGuests: Array<{adults: number}>;
  };
  searchSessionId?: string;
  timestamp: string;
}

export const Search = (): JSX.Element => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearchStart = () => {
    console.log('🔄 Search started...');
    setIsSearching(true);
    setHasSearched(false);
    setSearchError(null);
  };

  const handleSearchComplete = (results: SearchResults) => {
    console.log('✅ Search completed with results:', results);
    setSearchResults(results);
    setHasSearched(true);
    setIsSearching(false);
    setSearchError(null);
  };

  const handleSearchError = (error: string) => {
    console.log('❌ Search failed:', error);
    setSearchError(error);
    setIsSearching(false);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setSearchResults(null);
    setHasSearched(false);
    setSearchError(null);
  };

  return (
    <main className="flex flex-col w-full">
      {/* Search Header Section */}
      <section style={{
        backgroundImage: "linear-gradient(90deg, rgba(52,78,65,0.95) 32%, rgba(0,0,0,0.13) 100%), url('/images/Header.png')"
      }} className="relative h-[50vh] bg-cover bg-center flex items-center pt-0 rounded-3xl pb-20">
        <div className="container md:px-[100px] w-full px-[25px] mx-0 py-[5px] my-[70px]">
          <div className="max-w-2xl mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading-very-big text-[#f3ecdc] mb-3 leading-tight whitespace-nowrap">
              Find the Perfect Hotel for Your Clients
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#ffffffbf] mb-8">
              Access exclusive rates and amenities for your valued customers
            </p>
          </div>
          
          <SearchBar 
            onSearchStart={handleSearchStart}
            onSearchComplete={handleSearchComplete}
            onSearchError={handleSearchError}
            isSearching={isSearching}
          />
        </div>
      </section>

      {/* Content Section - Show Results OR Default Sections */}
      <div className="pt-20 py-[100px]">
        {/* Show search results if we have them */}
        {hasSearched && searchResults && !searchError ? (
          <div>
            {/* Search Results Header */}
            <div className="container mx-auto px-4 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-heading-big text-app-accent mb-2">
                    Hotels in {searchResults.searchParams.destination}
                  </h2>
                  <p className="text-gray-600">
                    {searchResults.searchParams.checkin} - {searchResults.searchParams.checkout} • {searchResults.searchParams.guests} guests
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-app-accent font-medium">
                    {searchResults.hotels.length} hotels found
                  </p>
                  <button 
                    onClick={clearSearch}
                    className="text-sm text-app-primary hover:underline"
                  >
                    New Search
                  </button>
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <SearchResultsSection searchResults={searchResults} />
          </div>
        ) : hasSearched && searchError ? (
          /* Show error state */
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="text-red-600 text-xl mb-4">⚠️</div>
              <h2 className="text-2xl font-heading-big text-app-accent mb-4">Search Failed</h2>
              <p className="text-gray-600 mb-6">{searchError}</p>
              <button 
                onClick={clearSearch}
                className="bg-app-primary text-white px-6 py-3 rounded-lg hover:bg-app-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : isSearching ? (
          /* Show loading state */
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto mb-4"></div>
              <h2 className="text-2xl font-heading-big text-app-accent mb-4">Searching Hotels...</h2>
              <p className="text-gray-600">Finding the best rates from RateHawk</p>
            </div>
          </div>
        ) : (
          /* Show default sections when no search has been performed */
          <>
            <SearchResultsSection /> {/* Default/placeholder view */}
            <WhyChooseUsSection />
            <CallToActionSection />
          </>
        )}
      </div>
    </main>
  );
};