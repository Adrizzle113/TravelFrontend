import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { StarIcon, MapPinIcon, Loader2 } from "lucide-react";
import { ratehawkApi } from "../../../../lib/api";
import { getNights } from "../../../../lib/utils";

// Types for the search results
interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewScore: number;
  reviewCount: number;
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  image: string;
  amenities: string[];
  description?: string;
  ratehawk_data?: any;
}

interface SearchResults {
  hotels: Hotel[];
  totalHotels: number;
  availableHotels: number;
  searchParams: {
    destination: string;
    destinationId: string;
    checkin: string;
    checkout: string;
    guests: number;
    rooms: number;
    formattedGuests: Array<{ adults: number }>;
  };
  searchSessionId?: string;
  timestamp: string;
  hasMorePages?: boolean;
  currentPage?: number;
}

interface SearchResultsSectionProps {
  searchResults?: SearchResults;
  onSearchUpdate?: (updatedResults: SearchResults) => void;
}

const formatCurrency = (amount: number, currency: string = "USD"): string => {
  const numericAmount = Number(amount) || 0;
  if (currency === "USD") {
    return `$${numericAmount}`;
  }
  return `${numericAmount} ${currency}`;
};

const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};

export const SearchResultsSection = ({
  searchResults,
  onSearchUpdate,
}: SearchResultsSectionProps): JSX.Element => {
  const navigate = useNavigate();
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  // If no search results provided, show the default gallery view
  if (!searchResults) {
    // Data for hotel images (default view)
    const hotelImages = [
      {
        id: 1,
        src: "/rectangle-4.png",
        alt: "Luxury villa with pool",
      },
      {
        id: 2,
        src: "/rectangle-5.png",
        alt: "Beachfront pool area",
      },
      {
        id: 3,
        src: "/rectangle-6.png",
        alt: "Resort with mountain view",
      },
      {
        id: 4,
        src: "/rectangle-7.png",
        alt: "Palm trees by pool at sunset",
      },
    ];

    return (
      <section className="w-full py-12 bg-[#f3ecdc]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-[18px] mb-12">
            <h3 className="opacity-80 font-semibold text-[15.4px] leading-[24.7px] tracking-[0] text-[#0e1629] font-['Open_Sans',Helvetica]">
              FITUR
            </h3>
            <h2 className="text-5xl tracking-[2.40px] leading-normal text-[#0e1629] font-['Merriweather',Helvetica] font-normal max-w-[840px]">
              Kenyamanan &amp; Kemewahan dalam Satu Pengalaman
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4 relative">
            {/* First column - 2 images stacked */}
            <div className="col-span-4 flex flex-col gap-4">
              <Card className="rounded-none border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    className="w-full h-[331px] object-cover"
                    alt={hotelImages[0].alt}
                    src={hotelImages[0].src}
                  />
                </CardContent>
              </Card>
              <Card className="rounded-none border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    className="w-full h-[304px] object-cover"
                    alt={hotelImages[1].alt}
                    src={hotelImages[1].src}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Middle column - large image and text overlay */}
            <div className="col-span-5 relative">
              <Card className="rounded-none border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    className="w-full h-[462px] object-cover"
                    alt={hotelImages[2].alt}
                    src={hotelImages[2].src}
                  />
                </CardContent>
              </Card>
              <div className="absolute bottom-0 left-0 right-0 bg-[#588157] p-6">
                <p className="text-[31.9px] text-[#f3ecdc] font-['Abril_Fatface',Helvetica] font-normal leading-normal">
                  Kami Memberikan Hasil Layanan Terbaik Untuk Penginapan Anda
                </p>
              </div>
            </div>

            {/* Last column - tall image */}
            <div className="col-span-3">
              <Card className="rounded-none border-0 overflow-hidden h-full">
                <CardContent className="p-0 h-full">
                  <img
                    className="w-full h-[604px] object-cover"
                    alt={hotelImages[3].alt}
                    src={hotelImages[3].src}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle hotel view more
  const handleViewMore = (hotelId: string) => {
    console.log(`🔗 Navigating to hotel details: ${hotelId}`);

    const selectedHotel = searchResults.hotels.find((h) => h.id === hotelId);
    if (selectedHotel) {
      // Create comprehensive hotel data package
      const hotelDataPackage = {
        hotel: selectedHotel,
        searchContext: {
          destination: searchResults.searchParams.destination,
          destinationId: searchResults.searchParams.destinationId,
          checkin: searchResults.searchParams.checkin,
          checkout: searchResults.searchParams.checkout,
          guests: searchResults.searchParams.guests,
          totalHotels: searchResults.totalHotels,
          availableHotels: searchResults.availableHotels,
          searchTimestamp: searchResults.timestamp,
        },
        allAvailableHotels: searchResults.hotels.length,
        selectedFromPage: Math.ceil(
          (searchResults.hotels.findIndex((h) => h.id === hotelId) + 1) / 20
        ),
      };

      console.log("💾 Storing hotel data package:", {
        hotelId: selectedHotel.id,
        hotelName: selectedHotel.name,
        searchContext: hotelDataPackage.searchContext,
      });

      // Store the comprehensive data
      localStorage.setItem("selectedHotel", JSON.stringify(hotelDataPackage));
      localStorage.setItem("selectedHotelTimestamp", Date.now().toString());
    }

    // Navigate to hotel details page
    navigate(`/hoteldetails/${hotelId}`);
  };

  // ✅ NEW: Load more hotels function
  const loadMoreHotels = async () => {
    if (loadingMore || !searchResults.hasMorePages) return;

    setLoadingMore(true);
    setLoadMoreError(null);

    try {
      console.log("📄 Loading more hotels...");

      const userId = localStorage.getItem("userId") || "";
      const nextPage = (searchResults.currentPage || 1) + 1;

      const searchData = {
        userId: userId,
        destination: searchResults.searchParams.destinationId,
        checkin: searchResults.searchParams.checkin,
        checkout: searchResults.searchParams.checkout,
        guests: searchResults.searchParams.formattedGuests,
        residency: "en-us",
        currency: "USD",
        page: nextPage,
      };

      console.log("📡 Load more request:", searchData);

      const { data } = await ratehawkApi.searchHotels(searchData);

      if (data.success && data.hotels && data.hotels.length > 0) {
        console.log(
          `✅ Loaded ${data.hotels.length} more hotels from page ${nextPage}`
        );

        // Combine existing hotels with new hotels (avoid duplicates)
        const existingIds = new Set(searchResults.hotels.map((h) => h.id));
        const newHotels = data.hotels.filter(
          (hotel: Hotel) => !existingIds.has(hotel.id)
        );
        const combinedHotels = [...searchResults.hotels, ...newHotels];

        // Create updated search results
        const updatedResults: SearchResults = {
          ...searchResults,
          hotels: combinedHotels,
          hasMorePages:
            data.hasMorePages !== false && data.hotels.length === 20,
          currentPage: nextPage,
          timestamp: new Date().toISOString(),
        };

        console.log(
          `📊 Total hotels after load more: ${combinedHotels.length}`
        );

        // Update localStorage with new results
        localStorage.setItem(
          "hotelSearchResults",
          JSON.stringify(updatedResults)
        );

        // Notify parent component
        onSearchUpdate?.(updatedResults);
      } else {
        console.log("📭 No more hotels available");
        const updatedResults = {
          ...searchResults,
          hasMorePages: false,
        };
        localStorage.setItem(
          "hotelSearchResults",
          JSON.stringify(updatedResults)
        );
        onSearchUpdate?.(updatedResults);

        if (data.error) {
          setLoadMoreError(data.error);
        }
      }
    } catch (err: any) {
      console.error("💥 Load more error:", err);
      setLoadMoreError(`Failed to load more hotels: ${err.message}`);
    } finally {
      setLoadingMore(false);
    }
  };
  console.log(searchResults);
  return (
    <section className="w-full py-12 bg-[#f3ecdc]">
      <div className="container mx-auto px-4">
        {/* Search Results Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-heading-big text-app-accent mb-2">
                Hotels in {searchResults.searchParams.destination}
              </h1>
              <p className="text-gray-600">
                {searchResults.searchParams.checkin} -{" "}
                {searchResults.searchParams.checkout} •{" "}
                {searchResults.searchParams.guests} guests
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-app-accent font-medium">
                  {searchResults.hotels.length} hotels loaded
                </p>
                <p className="text-sm text-gray-600">
                  {searchResults.availableHotels} available of{" "}
                  {searchResults.totalHotels} total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Error */}
        {loadMoreError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{loadMoreError}</p>
          </div>
        )}

        {/* Hotel Cards */}
        <div className="space-y-6">
          {searchResults.hotels.map((hotel) => {
            const nights = getNights(
              searchResults?.searchParams.checkin,
              searchResults?.searchParams.checkout
            );
            const perNightPrice =
              nights > 0 ? Math.round((hotel.price?.amount || 0) / nights) : 0;

            return (
              <Card
                key={hotel.id}
                className="rounded-[20px] shadow-shadow-shape hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <div className="p-6 lg:p-11">
                    {/* -------------------- HEADER -------------------- */}
                    <div className="flex flex-col md:flex-row justify-between mb-8">
                      <div className="max-w-[446px]">
                        <h2 className="font-normal text-[#073937] text-[22px] tracking-[-0.18px] leading-[32px] mb-2">
                          {hotel.name}
                        </h2>

                        {/* star rating */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, starIndex) => (
                              <StarIcon
                                key={starIndex}
                                className={`h-[18px] w-[18px] ${
                                  starIndex < hotel.rating
                                    ? "text-[#f3a427] fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="font-bold text-[#073937] text-[16.5px] ml-2">
                              {hotel.rating} stars
                            </span>
                          </div>

                          {/* review score */}
                          {hotel.reviewScore > 0 && (
                            <div className="flex items-center ml-2">
                              <span className="font-bold text-[#073937] text-[16.5px]">
                                {hotel.reviewScore}/10
                              </span>
                              <span className="text-[#073937] text-[14px] ml-1">
                                {getRatingText(hotel.reviewScore)}
                              </span>
                              {!!hotel.reviewCount && (
                                <span className="text-[#073937] text-[14px] ml-1">
                                  ({hotel.reviewCount.toLocaleString()} reviews)
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-[#073937] text-[16.9px]">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {hotel.location}
                        </div>
                      </div>

                      {/* badges */}
                      <div className="mt-4 md:mt-0">
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 5).map((a, i) => (
                            <Badge
                              key={i}
                              className="h-[30px] bg-[#eaece2] text-[#073937] rounded-[15px] font-normal text-[11.5px]"
                            >
                              {a}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* -------------------- DETAILS SECTION -------------------- */}
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                      {/* IMAGE */}
                      <div className="relative w-full md:w-[400px] lg:w-[500px] h-[250px] lg:h-[300px] rounded-[15px] overflow-hidden flex-shrink-0">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder-hotel.jpg")
                          }
                        />
                      </div>

                      {/* PRICE */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-4">
                          <span className="text-[#073937] text-[9.5px] tracking-[0.60px] leading-3 uppercase">
                            PRICING & AVAILABILITY
                          </span>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between items-center py-3 border-b-2 border-[#0000001a]">
                            <span className="text-[#073937] text-[16px] font-medium">
                              Starting from
                            </span>
                            <div className="text-right">
                              <div className="text-[#073937] text-[24px] font-bold">
                                {formatCurrency(
                                  perNightPrice,
                                  hotel.price?.currency || "USD"
                                )}
                              </div>
                              <div className="text-[#073937] text-[12px]">
                                per night
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* DESCRIPTION */}
                        {hotel.description && (
                          <div className="mb-6">
                            <p className="text-[#073937] text-[14px] leading-5 line-clamp-3">
                              {hotel.description}
                            </p>
                          </div>
                        )}

                        {/* ACTION BUTTON */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            className="bg-[#588157] text-white rounded-full border-4 px-7 py-4 text-[15.4px]"
                            onClick={() => handleViewMore(hotel.id)}
                          >
                            View Hotel Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ✅ FIXED: Load More Hotels Button (No Navigation) */}
        {(searchResults.hasMorePages ||
          searchResults.hotels.length < searchResults.totalHotels) && (
          <div className="mt-8 text-center">
            <Button
              onClick={loadMoreHotels}
              disabled={loadingMore}
              className="bg-app-primary text-white px-8 py-3 rounded-lg hover:bg-app-primary/90 disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading More Hotels...
                </>
              ) : (
                <>
                  Load More Hotels
                  {searchResults.totalHotels > searchResults.hotels.length && (
                    <span className="ml-2 text-sm opacity-80">
                      ({searchResults.totalHotels - searchResults.hotels.length}{" "}
                      more available)
                    </span>
                  )}
                </>
              )}
            </Button>
          </div>
        )}

        {/* No More Hotels Message */}
        {!searchResults.hasMorePages &&
          searchResults.hotels.length >= searchResults.totalHotels &&
          searchResults.hotels.length > 5 && (
            <div className="text-center mt-8 py-4">
              <p className="text-gray-600 text-sm">
                🎉 You've seen all {searchResults.hotels.length} available
                hotels for this search
              </p>
            </div>
          )}
      </div>
    </section>
  );
};
