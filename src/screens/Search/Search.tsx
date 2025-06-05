import { useState, useEffect } from "react";
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

  // ✅ NEW: Load previous search results on component mount
  useEffect(() => {
    console.log('🔄 Search component mounted, checking for previous results...');
    
    try {
      const savedResults = localStorage.getItem('hotelSearchResults');
      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);
        
        // Check if results are recent (within last 30 minutes)
        const resultAge = Date.now() - new Date(parsedResults.timestamp).getTime();
        const maxAge = 30 * 60 * 1000; // 30 minutes
        
        if (resultAge < maxAge) {
          console.log('✅ Found recent search results, restoring them:', {
            hotels: parsedResults.hotels?.length || 0,
            destination: parsedResults.searchParams?.destination,
            timestamp: parsedResults.timestamp
          });
          
          setSearchResults(parsedResults);
          setHasSearched(true);
          setSearchError(null);
        } else {
          console.log('⏰ Previous search results are too old, clearing them');
          localStorage.removeItem('hotelSearchResults');
        }
      } else {
        console.log('📭 No previous search results found');
      }
    } catch (error) {
      console.error('💥 Error loading previous search results:', error);
      localStorage.removeItem('hotelSearchResults'); // Clear corrupted data
    }
  }, []);

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
    
    // ✅ ENHANCED: Store results with timestamp for back navigation
    try {
      const enhancedResults = {
        ...results,
        timestamp: new Date().toISOString(),
        searchCompletedAt: Date.now()
      };
      localStorage.setItem('hotelSearchResults', JSON.stringify(enhancedResults));
      console.log('💾 Search results saved to localStorage for back navigation');
    } catch (error) {
      console.error('💥 Error saving search results:', error);
    }
  };

  const handleSearchError = (error: string) => {
    console.log('❌ Search failed:', error);
    setSearchError(error);
    setIsSearching(false);
    setHasSearched(true);
  };

  const clearSearch = () => {
    console.log('🗑️ Clearing search results and localStorage');
    setSearchResults(null);
    setHasSearched(false);
    setSearchError(null);
    
    // Clear from localStorage so we start fresh
    localStorage.removeItem('hotelSearchResults');
  };

  // ✅ NEW: Function to refresh/reload current search
  const handleRefreshSearch = () => {
    if (searchResults?.searchParams) {
      console.log('🔄 Refreshing current search...');
      
      // You could trigger a new search with the same parameters
      // For now, we'll just reload from localStorage if available
      const savedResults = localStorage.getItem('hotelSearchResults');
      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);
        setSearchResults(parsedResults);
        setHasSearched(true);
        setSearchError(null);
      }
    }
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
          
          {/* ✅ ENHANCED: Show different UI states based on current state */}
          {hasSearched && searchResults && !isSearching ? (
            // Show compact search bar when results are displayed
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-[30px] p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-app-accent mb-1">
                    Current Search: {searchResults.searchParams.destination}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {searchResults.searchParams.checkin} - {searchResults.searchParams.checkout} • {searchResults.searchParams.guests} guests • {searchResults.hotels.length} hotels found
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleRefreshSearch}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Refresh Results
                  </button>
                  <button 
                    onClick={clearSearch}
                    className="px-4 py-2 text-sm bg-app-primary text-white rounded-lg hover:bg-app-primary/90 transition-colors"
                  >
                    New Search
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Show full search bar when no results or searching
            <SearchBar 
              onSearchStart={handleSearchStart}
              onSearchComplete={handleSearchComplete}
              onSearchError={handleSearchError}
              isSearching={isSearching}
            />
          )}
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
                  {/* ✅ NEW: Show when results were loaded */}
                  <p className="text-xs text-gray-500 mt-1">
                    {searchResults.timestamp && (
                      <>Results from {new Date(searchResults.timestamp).toLocaleTimeString()}</>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-app-accent font-medium">
                    {searchResults.hotels.length} hotels found
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={handleRefreshSearch}
                      className="text-xs text-gray-600 hover:text-app-primary hover:underline"
                    >
                      Refresh
                    </button>
                    <span className="text-xs text-gray-400">•</span>
                    <button 
                      onClick={clearSearch}
                      className="text-xs text-app-primary hover:underline"
                    >
                      New Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <SearchResultsSection 
              searchResults={searchResults} 
              onSearchUpdate={setSearchResults}
            />
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

      {/* ✅ NEW: Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg max-w-sm">
          <strong>Search State Debug:</strong>
          <br />• Has searched: {hasSearched ? 'Yes' : 'No'}
          <br />• Has results: {searchResults ? 'Yes' : 'No'}
          <br />• Is searching: {isSearching ? 'Yes' : 'No'}
          <br />• Has error: {searchError ? 'Yes' : 'No'}
          <br />• Hotels count: {searchResults?.hotels?.length || 0}
          <br />• localStorage: {localStorage.getItem('hotelSearchResults') ? 'Has data' : 'Empty'}
        </div>
      )}
    </main>
  );
};