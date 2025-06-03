import { useNavigate } from "react-router-dom";
import { MapPinIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { HotelCard } from "../../components/HotelCard";
import { useHotelData } from "../../hooks/useHotelData";
import { applyFilters } from "../../utils/filterUtils";
import { FilterState } from "../../types";

interface HotelListSectionProps {
  filters: FilterState;
}

export const HotelListSection = ({ filters }: HotelListSectionProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    allHotels,
    loading,
    loadingMore,
    error,
    searchInfo,
    hasMorePages,
    loadMoreHotels
  } = useHotelData();

  const handleViewMore = (hotelId: string) => {
    const selectedHotel = allHotels.find(h => h.id === hotelId);
    if (selectedHotel) {
      localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
    }
    navigate(`/hoteldetails/${hotelId}`);
  };

  const handleQuickBook = (hotelId: string) => {
    console.log("Quick book:", hotelId);
  };

  // Apply filters to get displayed hotels
  const displayedHotels = applyFilters(allHotels, filters);

  // Loading state
  if (loading) {
    return (
      <section className="bg-[#f3ecdc] py-10 px-4 md:px-14">
        <div className="max-w-[1323px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto mb-4"></div>
              <p className="text-app-accent text-lg">Loading hotels from RateHawk...</p>
              <p className="text-gray-600 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state (no hotels loaded)
  if (error && allHotels.length === 0) {
    return (
      <section className="bg-[#f3ecdc] py-10 px-4 md:px-14">
        <div className="max-w-[1323px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">⚠️</div>
              <p className="text-app-accent text-lg mb-4">{error}</p>
              <Button 
                onClick={() => navigate("/dashboard/search")}
                className="bg-app-primary text-white"
              >
                Back to Search
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No results after filtering
  if (displayedHotels.length === 0 && allHotels.length > 0) {
    return (
      <section className="bg-[#f3ecdc] py-10 px-4 md:px-14">
        <div className="max-w-[1323px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <p className="text-app-accent text-xl mb-4">No hotels match your filters</p>
              <p className="text-gray-600 mb-6">Try adjusting your filter criteria to see more results</p>
              <p className="text-sm text-gray-500">
                Showing 0 of {allHotels.length} loaded hotels
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No hotels found at all
  if (allHotels.length === 0) {
    return (
      <section className="bg-[#f3ecdc] py-10 px-4 md:px-14">
        <div className="max-w-[1323px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🏨</div>
              <p className="text-app-accent text-xl mb-4">No hotels found</p>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or selecting a different destination</p>
              <Button 
                onClick={() => navigate("/dashboard/search")}
                className="bg-app-primary text-white"
              >
                Search Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f3ecdc] py-10 px-4 md:px-14">
      <div className="max-w-[1323px] mx-auto">
        {/* Search Results Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-heading-big text-app-accent mb-2">
                Hotels in {searchInfo?.destination || "Your Destination"}
              </h1>
              <p className="text-gray-600">
                {searchInfo?.checkin && searchInfo?.checkout ? (
                  <>
                    {searchInfo.checkin} - {searchInfo.checkout} • {searchInfo.guests} guests
                  </>
                ) : (
                  "Search results"
                )}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-app-accent font-medium">
                  {displayedHotels.length} hotels shown
                </p>
                <p className="text-sm text-gray-600">
                  {allHotels.length} loaded of {searchInfo?.totalHotels || 0} total hotels
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error display for load more errors */}
        {error && allHotels.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col w-full lg:w-2/3 gap-6">
            {/* Hotel Cards */}
            {displayedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onViewMore={handleViewMore}
                onQuickBook={handleQuickBook}
              />
            ))}

            {/* Load More Hotels Button */}
            {hasMorePages && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMoreHotels}
                  disabled={loadingMore}
                  className="w-full max-w-[400px] h-[54px] rounded-[1000px] bg-[#588157] text-[#f3ecdc] font-normal text-[15px] hover:bg-[#588157]/90 transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Loading More Hotels...
                    </>
                  ) : (
                    'Load More Hotels'
                  )}
                </Button>
              </div>
            )}

            {/* No more hotels message */}
            {!hasMorePages && allHotels.length >= 20 && (
              <div className="text-center mt-8 py-4">
                <p className="text-gray-600 text-sm">
                  🎉 You've seen all available hotels for this search
                </p>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-heading-very-big text-[#588157] text-[length:var(--heading-very-big-font-size)] mb-6">
              Hotel Locations
            </h2>
            <Card className="rounded-[20px] overflow-hidden border-[10px] border-solid h-[600px] lg:h-[972px]">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Showing {displayedHotels.length} hotels
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Search Button */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/search")}
            className="border-app-primary text-app-primary hover:bg-app-primary hover:text-white transition-colors"
          >
            Modify Search
          </Button>
        </div>
      </div>
    </section>
  );
};