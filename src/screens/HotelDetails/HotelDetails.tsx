import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { ratehawkApi } from "../../lib/api";

// Import All Sections
import { BookingSection } from "./sections/BookingSection";
import { FacilitiesGridSection } from "./sections/FacilitiesGridSection";
import { HeroSection } from "./sections/HeroSection";
import { HotelInfoSection } from "./sections/HotelInfoSection";
import { MapSection } from "./sections/MapSection";
import { RoomSelectionSection } from "./sections/RoomSelectionSection";
import { RateHawkDataSection } from "./sections/RateHawkDataSection";
import { useBookingStore } from "../../store/bookingStore";
import { jsonToQueryString } from "../../lib/utils";

// Helper function for consistent rating text
const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  if (score > 0) return "Fair";
  return "No Rating";
};

// Types
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

interface SearchContext {
  destination: string;
  destinationId: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalHotels: number;
  availableHotels: number;
  searchTimestamp: string;
}

interface HotelData {
  hotel: Hotel;
  searchContext: SearchContext;
  allAvailableHotels: number;
  selectedFromPage: number;
}

interface ProcessedRoom {
  id: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  image: string;
  bedding: string;
  occupancy: string;
  size: string;
  amenities: string[];
  cancellation: string | any;
  paymentType: string;
  availability: number;
  originalRate?: any;
}

export const HotelDetails = (): JSX.Element => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  // State Management
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ProcessedRoom | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { setSelectedHotelRoom, setHotel } = useBookingStore();
  // Load hotel data on mount
  useEffect(() => {
    loadHotelData();
  }, [hotelId]);

  const loadHotelData = async () => {
    console.log("🏨 Loading hotel details for ID:", hotelId);
    setLoading(true);
    setError(null);

    if (!hotelId) {
      setError("Hotel ID is required");
      setLoading(false);
      return;
    }

    try {
      // First try to get data from localStorage
      const savedData = localStorage.getItem("selectedHotel");
      const searchedDataString = localStorage.getItem("searchedData");

      const { currency, residency } = searchedDataString
        ? JSON.parse(searchedDataString)
        : {};

      console.log("searchedData:", residency, currency);
      let hotelData: HotelData | null = null;

      if (savedData) {
        const parsedData: HotelData = JSON.parse(savedData);
        if (parsedData.hotel.id === hotelId) {
          console.log("✅ Found saved hotel data:", {
            hotelId: parsedData.hotel.id,
            hotelName: parsedData.hotel.name,
            destination: parsedData.searchContext.destination,
          });
          hotelData = parsedData;
        }
      }

      // Always fetch fresh data from the new API
      console.log("🔍 Fetching fresh hotel details from API...", currency);

      try {
        const { data } = await ratehawkApi.getHotelDetails(
          hotelId,
          hotelData?.searchContext || {},
          residency,
          currency
        );
        setHotel(data.data.data);
        console.log(data.data.data, "dataaaaaaaaaaaaaaaaa");
        if (data.error) {
          throw new Error(data.error);
        }

        let ratehawkData = null;

        // Check for new API format first (data.data.hotels[0])
        if (data.data.data.hotels.length > 0) {
          ratehawkData = data.data.data.hotels[0];
          console.log(
            "🚀 ~ loadHotelData ~ NEW FORMAT ratehawkData ============= :",
            ratehawkData
          );
        }
        // Fallback to old API format (data.data.av_resp[0])
        else if (
          data.data &&
          data.data.av_resp &&
          data.data.av_resp.length > 0
        ) {
          ratehawkData = data.data.av_resp[0];
          console.log(
            "🚀 ~ loadHotelData ~ OLD FORMAT ratehawkData ============= :",
            ratehawkData
          );
        }

        if (ratehawkData) {
          // Extract rating data from RateHawk API response
          const extractRatingData = () => {
            // Try to get rating from various possible fields in RateHawk response
            const staticData = data.data?.data?.hotels?.[0] || ratehawkData;

            // Star rating (1-5): look for stars_rating, rating_class, or category
            let starRating = hotelData?.hotel.rating || 0;
            if (staticData.stars_rating) {
              starRating = parseFloat(staticData.stars_rating) || starRating;
            } else if (staticData.rating_class) {
              starRating = parseFloat(staticData.rating_class) || starRating;
            } else if (staticData.category) {
              starRating = parseFloat(staticData.category) || starRating;
            }

            // Guest review score (0-10): look for guest_rating, review_score, or rating
            let guestScore = hotelData?.hotel.reviewScore || 0;
            let reviewCount = hotelData?.hotel.reviewCount || 0;

            if (staticData.guest_rating) {
              guestScore = parseFloat(staticData.guest_rating) || guestScore;
            } else if (staticData.review_score) {
              guestScore = parseFloat(staticData.review_score) || guestScore;
            } else if (staticData.rating && typeof staticData.rating === 'number') {
              // If rating is 0-10 scale, use it for review score
              const ratingValue = parseFloat(staticData.rating);
              if (ratingValue > 5 && ratingValue <= 10) {
                guestScore = ratingValue;
              }
            }

            if (staticData.reviews_count || staticData.review_count) {
              reviewCount = parseInt(staticData.reviews_count || staticData.review_count) || reviewCount;
            }

            // Ensure values are in valid ranges
            starRating = Math.max(0, Math.min(5, starRating));
            guestScore = Math.max(0, Math.min(10, guestScore));
            reviewCount = Math.max(0, reviewCount);

            console.log('📊 Extracted rating data:', {
              starRating,
              guestScore,
              reviewCount,
              source: 'RateHawk API'
            });

            return { starRating, guestScore, reviewCount };
          };

          const { starRating, guestScore, reviewCount } = extractRatingData();

          // Create enhanced hotel data
          const enhancedHotelData: HotelData = {
            hotel: {
              id: hotelId,
              name: hotelData?.hotel.name || `Hotel ${hotelId}`,
              location: hotelData?.hotel.location || "Location not available",
              rating: starRating,
              reviewScore: guestScore,
              reviewCount: reviewCount,
              price: hotelData?.hotel.price || {
                amount: 0,
                currency: "USD",
                period: "night",
              },
              image: hotelData?.hotel.image || "/images/bedroom_interior.png",
              amenities: hotelData?.hotel.amenities || [],
              description: hotelData?.hotel.description || "",
              ratehawk_data: {
                ...hotelData?.hotel.ratehawk_data,
                // For new format, pass the entire response structure
                data: data.data,
                rates: ratehawkData.rates || [],
                hotel_lookup_info: ratehawkData.hotel_lookup_info,
                requested_hotel_id: ratehawkData.requested_hotel_id,
                ota_hotel_id: ratehawkData.ota_hotel_id,
                master_id: ratehawkData.master_id,
                // Add the new response metadata
                response_metadata: {
                  timestamp: data.timestamp,
                  duration: data.duration,
                  sessionId: data.sessionId,
                  searchUuid: data.searchUuid,
                },
              },
            },
            searchContext: hotelData?.searchContext || {
              destination: "Unknown",
              destinationId: "",
              checkin: "2025-08-31",
              checkout: "2025-09-02",
              guests: 2, // Fixed: guests should be a number, not an array
              totalHotels: 1,
              availableHotels: 1,
              searchTimestamp: new Date().toISOString(),
            },
            allAvailableHotels: hotelData?.allAvailableHotels || 1,
            selectedFromPage: hotelData?.selectedFromPage || 1,
          };

          // Update localStorage with fresh data
          localStorage.setItem(
            "selectedHotel",
            JSON.stringify(enhancedHotelData)
          );
          setHotelData(enhancedHotelData);

          console.log("✅ Hotel data updated with fresh RateHawk data:", {
            ratesCount: ratehawkData.rates?.length || 0,
            hotelId: ratehawkData.requested_hotel_id,
            sessionId: data.sessionId,
            searchUuid: data.searchUuid,
            duration: data.duration,
          });
        } else {
          console.log("⚠️ No RateHawk data in response, using saved data");
          if (hotelData) {
            setHotelData(hotelData);
          } else {
            throw new Error("No hotel data available");
          }
        }
      } catch (apiError) {
        console.error("💥 Error fetching hotel details from API:", apiError);

        // Fallback to saved data if available
        if (hotelData) {
          console.log("⚠️ Using saved hotel data due to API error");
          setHotelData(hotelData);
        } else {
          throw new Error(
            `Failed to load hotel details: ${
              apiError instanceof Error ? apiError.message : "Unknown error"
            }`
          );
        }
      }

      // Check if this hotel is in favorites
      const favorites = JSON.parse(
        localStorage.getItem("favoriteHotels") || "[]"
      );
      setIsFavorite(favorites.includes(hotelId));
    } catch (err) {
      console.error("💥 Error loading hotel data:", err);
      setError("Failed to load hotel information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers
  const handleBackToResults = () => {
    console.log("🔙 Navigating back to search results...");

    const searchResults = localStorage.getItem("hotelSearchResults");

    if (searchResults) {
      try {
        const parsedResults = JSON.parse(searchResults);
        const resultAge =
          Date.now() - new Date(parsedResults.timestamp).getTime();
        const maxAge = 30 * 60 * 1000; // 30 minutes

        if (resultAge < maxAge) {
          navigate("/dashboard/search");
          return;
        } else {
          localStorage.removeItem("hotelSearchResults");
        }
      } catch (error) {
        localStorage.removeItem("hotelSearchResults");
      }
    }

    navigate("/dashboard/search");
  };

  // Favorite management
  const toggleFavorite = () => {
    if (!hotelId) return;

    const favorites = JSON.parse(
      localStorage.getItem("favoriteHotels") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== hotelId);
    } else {
      newFavorites = [...favorites, hotelId];
    }

    localStorage.setItem("favoriteHotels", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    console.log(
      `${isFavorite ? "💔" : "❤️"} Hotel ${
        isFavorite ? "removed from" : "added to"
      } favorites`
    );
  };

  // Share functionality
  const shareHotel = async () => {
    if (!hotelData) return;

    const shareData = {
      title: hotelData.hotel.name,
      text: `Check out this hotel: ${hotelData.hotel.name} in ${hotelData.hotel.location}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("✅ Hotel shared successfully");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        console.log("✅ Hotel link copied to clipboard");
        // You could show a toast notification here
      }
    } catch (error) {
      console.log("Share failed:", error);
    }
  };

  // Room selection handler
  const handleRoomSelect = (room: ProcessedRoom, quantity: number) => {
    console.log("🏨 Room selected:", {
      name: room.name,
      price: room.price,
      quantity: quantity,
      totalPrice: room.price * quantity,
    });

    setSelectedRoom(room);
    setSelectedHotelRoom(room);
    setSelectedQuantity(quantity);
  };

  // Booking handler
  const handleBookNow = async () => {
    const bookingPrice = selectedRoom
      ? selectedRoom.price * selectedQuantity
      : hotelData?.hotel.price.amount;
    const bookingCurrency = selectedRoom
      ? selectedRoom.currency
      : hotelData?.hotel.price.currency;

    console.log("🎯 Initiating booking:", {
      hotel: hotelData?.hotel.name,
      room: selectedRoom?.name || "Default room",
      quantity: selectedQuantity,
      price: bookingPrice,
      currency: bookingCurrency,
    });

    // Store booking data for potential booking page
    const bookingData = {
      hotel: hotelData?.hotel,
      selectedRoom: selectedRoom,
      quantity: selectedQuantity,
      searchContext: hotelData?.searchContext,
      totalPrice: bookingPrice,
      currency: bookingCurrency,
      bookingTimestamp: new Date().toISOString(),
    };

    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    const response = await ratehawkApi.bookingForm(selectedRoom?.id);
    console.log("📥 Booking form response:", response);
    // Navigate to booking form page
    navigate(
      `/hotel_booking_form/${hotelId}/${selectedRoom?.id}${jsonToQueryString(
        searchContext
      )}`
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3ecdc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-app-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-heading-standar text-app-accent mb-2">
            Loading Hotel Details
          </h2>
          <p className="text-gray-600">
            Please wait while we load the information...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !hotelData) {
    return (
      <div className="min-h-screen bg-[#f3ecdc] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-heading-big text-app-accent mb-4">
              Hotel Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The hotel information could not be loaded."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleBackToResults}
                className="border border-app-primary text-app-primary hover:bg-app-primary hover:text-white px-4 py-2 rounded transition-colors"
              >
                Back to Search
              </button>
              <button
                onClick={() => navigate("/dashboard/search")}
                className="bg-app-primary text-white hover:bg-app-primary/90 px-4 py-2 rounded transition-colors"
              >
                New Search
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { hotel, searchContext } = hotelData;

  // Prepare images for hero section
  const heroImages = [
    { src: hotel.image, alt: hotel.name },
    // Add more images if available from ratehawk_data
    ...(hotel.ratehawk_data?.static_vm?.images
      ?.slice(0, 4)
      .map((img: any, index: number) => ({
        src: img.tmpl?.replace("{size}", "1024x768") || img.url || hotel.image,
        alt: `${hotel.name} - Image ${index + 2}`,
      })) || []),
  ];

  return (
    <div className="min-h-screen bg-[#f3ecdc]">
      {/* Hero Section - Full Width */}
      <HeroSection
        hotel={hotel}
        searchContext={searchContext}
        images={heroImages}
        onBack={handleBackToResults}
        onShare={shareHotel}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Main Content - Traditional Layout with RateHawk Room Data */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Details Section */}
            <HotelInfoSection hotel={hotel} searchContext={searchContext} />

            {/* RateHawk Room Selection Section - Replaces the old RoomSelectionSection */}
            {hotel.ratehawk_data && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Choose Your Rooms
                  </h2>
                  <RateHawkDataSection
                    ratehawkData={hotel.ratehawk_data}
                    onRoomSelect={handleRoomSelect}
                    selectedRoomId={selectedRoom?.id}
                    selectedQuantity={selectedQuantity}
                  />
                </CardContent>
              </Card>
            )}

            {/* Hotel Facilities Section */}
            <FacilitiesGridSection hotel={hotel} amenities={hotel.amenities} />

            {/* Location & Map Section */}
            <MapSection hotel={hotel} searchContext={searchContext} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingSection
                hotel={hotel}
                searchContext={searchContext}
                onBookNow={handleBookNow}
                selectedRoom={selectedRoom}
                selectedQuantity={selectedQuantity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel (Development Only) */}
      {process.env.NODE_ENV === "development" && hotel.ratehawk_data && (
        <Card className="max-w-7xl mx-auto mt-8 px-4 bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <details>
              <summary className="text-sm font-medium text-gray-600 cursor-pointer mb-2">
                Hotel Debug Data (Development Only)
              </summary>
              <div className="text-xs text-gray-600 space-y-2">
                <div>
                  <strong>Hotel ID:</strong> {hotel.id}
                </div>
                <div>
                  <strong>Is Favorite:</strong> {isFavorite ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Selected Room:</strong> {selectedRoom?.name || "None"}
                </div>
                <div>
                  <strong>Room Quantity:</strong> {selectedQuantity}
                </div>
                <div>
                  <strong>Room Price:</strong>{" "}
                  {selectedRoom
                    ? `${selectedRoom.price} × ${selectedQuantity} = ${
                        selectedRoom.price * selectedQuantity
                      }`
                    : "N/A"}
                </div>
                <div>
                  <strong>Total Amenities:</strong>{" "}
                  {hotel.amenities?.length || 0}
                </div>
                <div>
                  <strong>RateHawk Rates:</strong>{" "}
                  {hotel.ratehawk_data?.rates?.length || 0}
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer">
                    Raw RateHawk Data
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded border max-h-40">
                    {JSON.stringify(hotel.ratehawk_data, null, 2)}
                  </pre>
                </details>
              </div>
            </details>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
