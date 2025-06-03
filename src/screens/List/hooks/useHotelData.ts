import { useState, useEffect } from 'react';
import { RateHawkHotel, SearchInfo, SearchParams } from '../types';
import { ratehawkApi } from '../../../lib/api';

export const useHotelData = () => {
  const [allHotels, setAllHotels] = useState<RateHawkHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInfo, setSearchInfo] = useState<SearchInfo | null>(null);
  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  const loadInitialResults = () => {
    try {
      setLoading(true);
      setError(null);

      const storedResults = localStorage.getItem('hotelSearchResults');
      
      if (storedResults) {
        const results = JSON.parse(storedResults);
        console.log("📊 Loading initial RateHawk results:", results);
        
        const newSearchInfo: SearchInfo = {
          destination: results.searchParams?.destination || "Unknown",
          checkin: results.searchParams?.checkin || "",
          checkout: results.searchParams?.checkout || "",
          guests: results.searchParams?.guests || 2,
          totalHotels: results.totalHotels || 0,
          availableHotels: results.availableHotels || 0
        };

        setSearchInfo(newSearchInfo);
        setCurrentSearchParams(results.searchParams);
        setAllHotels(results.hotels || []);
        setCurrentPage(1);
        setHasMorePages(results.hasMorePages !== false);
        
        console.log(`✅ Loaded ${results.hotels?.length || 0} initial hotels`);
      } else {
        setError("No search results found. Please perform a search first.");
        console.log("❌ No search results in localStorage");
      }
    } catch (err) {
      console.error("💥 Error loading search results:", err);
      setError("Failed to load search results. Please try searching again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreHotels = async () => {
    if (!currentSearchParams || !hasMorePages || loadingMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      console.log(`📄 Loading more hotels (page ${currentPage + 1})...`);

      const userId = localStorage.getItem('userId') || '';
      const nextPage = currentPage + 1;
      
      const searchData = {
        userId: userId,
        destination: currentSearchParams.destinationId,
        checkin: currentSearchParams.checkin,
        checkout: currentSearchParams.checkout,
        guests: currentSearchParams.formattedGuests,
        residency: 'en-us',
        currency: 'USD',
        page: nextPage
      };

      console.log("📡 Load more request:", searchData);

      const { data } = await ratehawkApi.searchHotels(searchData);

      if (data.success && data.hotels && data.hotels.length > 0) {
        console.log(`✅ Loaded ${data.hotels.length} more hotels from page ${nextPage}`);
        
        setAllHotels(prevHotels => {
          const existingIds = new Set(prevHotels.map(h => h.id));
          const newHotels = data.hotels.filter((hotel: RateHawkHotel) => !existingIds.has(hotel.id));
          const combinedHotels = [...prevHotels, ...newHotels];
          console.log(`📊 Total hotels after append: ${combinedHotels.length}`);
          return combinedHotels;
        });
        
        setCurrentPage(nextPage);
        setHasMorePages(data.hasMorePages !== false && data.hotels.length === 20);
        
      } else {
        console.log('📭 No more hotels available');
        setHasMorePages(false);
        if (data.error) {
          setError(data.error);
        }
      }
    } catch (err: any) {
      console.error("💥 Load more error:", err);
      setError(`Failed to load more hotels: ${err.message}`);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitialResults();
  }, []);

  return {
    allHotels,
    loading,
    loadingMore,
    error,
    searchInfo,
    hasMorePages,
    loadMoreHotels,
    loadInitialResults
  };
};