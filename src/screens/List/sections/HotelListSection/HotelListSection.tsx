import { useState, useEffect } from "react";
import { StarIcon, MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

interface RateHawkHotel {
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
  hotels: RateHawkHotel[];
  totalHotels: number;
  availableHotels: number;
  searchParams: any;
  filters: any;
  searchSessionId: string;
  timestamp: string;
}

export const HotelListSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<RateHawkHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInfo, setSearchInfo] = useState<any>(null);

  // Load search results when component mounts
  useEffect(() => {
    loadSearchResults();
  }, []);

  const loadSearchResults = () => {
    try {
      setLoading(true);
      setError(null);

      // Get search results from localStorage
      const storedResults = localStorage.getItem('hotelSearchResults');
      
      if (storedResults) {
        const results: SearchResults = JSON.parse(storedResults);
        console.log("📊 Loading RateHawk search results:", results);
        
        setSearchInfo({
          destination: results.searchParams?.destination || "Unknown",
          checkin: results.searchParams?.checkin || "",
          checkout: results.searchParams?.checkout || "",
          guests: results.searchParams?.guests || 2,
          totalHotels: results.totalHotels || 0,
          availableHotels: results.availableHotels || 0
        });

        // Set hotels directly from results
        setHotels(results.hotels || []);
        
        console.log(`✅ Loaded ${results.hotels?.length || 0} hotels from RateHawk`);
        
        // Debug first hotel data
        if (results.hotels && results.hotels.length > 0) {
          const firstHotel = results.hotels[0];
          console.log("🔍 First hotel debug:", {
            name: firstHotel.name,
            price: firstHotel.price,
            priceAmount: firstHotel.price?.amount,
            image: firstHotel.image,
            rating: firstHotel.rating
          });
        }
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

  const handleViewMore = (hotelId: string) => {
    // Store the selected hotel data for the details page
    const selectedHotel = hotels.find(h => h.id === hotelId);
    if (selectedHotel) {
      localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
    }
    navigate(`/hoteldetails/${hotelId}`);
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    // Ensure amount is a number
    const numericAmount = Number(amount) || 0;
    
    if (currency === 'USD') {
      return `$${numericAmount}`;
    }
    return `${numericAmount} ${currency}`;
  };

  const getRatingText = (score: number) => {
    if (score >= 9) return "Excellent";
    if (score >= 8) return "Very Good";
    if (score >= 7) return "Good";
    if (score >= 6) return "Pleasant";
    return "Fair";
  };

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

  // Error state
  if (error) {
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

  // No results state
  if (hotels.length === 0) {
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
                  {hotels.length} hotels found
                </p>
                {searchInfo?.totalHotels && (
                  <p className="text-sm text-gray-600">
                    {searchInfo.availableHotels} available of {searchInfo.totalHotels} total
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col w-full lg:w-2/3 gap-6">
            {hotels.map((hotel: RateHawkHotel, index: number) => (
              <Card
                key={hotel.id}
                className="rounded-[20px] shadow-shadow-shape hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <div className="p-6 lg:p-11">
                    <div className="flex flex-col md:flex-row justify-between mb-8">
                      <div className="max-w-[446px]">
                        <h2 className="font-normal text-[#073937] text-[22px] tracking-[-0.18px] leading-[32px] mb-2">
                          {hotel.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {hotel.rating > 0 && (
                              <>
                                {[...Array(5)].map((_, starIndex) => (
                                  <StarIcon 
                                    key={starIndex}
                                    className={`h-[18px] w-[18px] ${
                                      starIndex < hotel.rating 
                                        ? 'text-[#f3a427] fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                                <span className="font-bold text-[#073937] text-[16.5px] ml-2">
                                  {hotel.rating} stars
                                </span>
                              </>
                            )}
                          </div>
                          {hotel.reviewScore > 0 && (
                            <div className="flex items-center ml-2">
                              <span className="font-bold text-[#073937] text-[16.5px]">
                                {hotel.reviewScore}/10
                              </span>
                              <span className="text-[#073937] text-[14px] ml-1">
                                {getRatingText(hotel.reviewScore)}
                              </span>
                              {hotel.reviewCount > 0 && (
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

                      <div className="mt-4 md:mt-0">
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 5).map((amenity, amenityIndex) => (
                            <Badge
                              key={amenityIndex}
                              className="h-[30px] bg-[#eaece2] text-[#073937] rounded-[15px] font-normal text-[11.5px] tracking-[0.09px]"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                      {/* Hotel Image */}
                      <div className="relative w-full md:w-[400px] lg:w-[500px] h-[250px] lg:h-[300px] rounded-[15px] overflow-hidden flex-shrink-0">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log(`❌ Image failed to load: ${hotel.image}`);
                            e.currentTarget.src = "/placeholder-hotel.jpg";
                          }}
                          onLoad={() => {
                            console.log(`✅ Image loaded successfully: ${hotel.image}`);
                          }}
                        />
                        <div className="absolute bottom-[6px] left-0 w-full flex justify-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-[7px] h-[7px] bg-[#fffbf2] rounded-[7px] ${i > 0 ? "opacity-50" : ""}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Hotel Details */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-4">
                          <span className="text-[#073937] text-[9.5px] tracking-[0.60px] leading-3 uppercase">
                            PRICING & AVAILABILITY
                          </span>
                        </div>

                        {/* Price Display - FIXED */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center py-3 border-b-2 border-[#0000001a]">
                            <span className="text-[#073937] text-[16px] font-medium">
                              Starting from
                            </span>
                            <div className="text-right">
                              <div className="text-[#073937] text-[24px] font-bold">
                                {formatCurrency(hotel.price?.amount || 0, hotel.price?.currency || 'USD')}
                              </div>
                              <div className="text-[#073937] text-[12px]">
                                per {hotel.price?.period || 'night'}
                              </div>
                            </div>
                          </div>
                          
                          {/* Additional pricing info */}
                          {hotel.ratehawk_data?.rates && hotel.ratehawk_data.rates.length > 1 && (
                            <div className="mt-2">
                              <span className="text-[#073937] text-[12px] text-gray-600">
                                {hotel.ratehawk_data.rates.length} room types available
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {hotel.description && (
                          <div className="mb-6">
                            <p className="text-[#073937] text-[14px] leading-5 line-clamp-3">
                              {hotel.description}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            className="bg-[#588157] text-[#f3ecdc] rounded-full border-4 border-solid px-7 py-4 text-[15.4px] hover:bg-[#588157]/90 transition-colors"
                            onClick={() => handleViewMore(hotel.id)}
                          >
                            Lihat Selengkapnya
                          </Button>
                          
                          <Button 
                            variant="outline"
                            className="border-[#588157] text-[#588157] rounded-full px-7 py-4 text-[15.4px] hover:bg-[#588157]/10 transition-colors"
                            onClick={() => {
                              console.log("Quick book:", hotel.id);
                            }}
                          >
                            Quick Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Load More Button */}
            {hotels.length >= 10 && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="w-full max-w-[400px] h-[54px] rounded-[1000px] border border-solid border-[#073937] text-[#073937] font-normal text-[15px] hover:bg-[#073937] hover:text-white transition-colors"
                  onClick={() => {
                    console.log("Load more hotels");
                  }}
                >
                  Load More Hotels
                </Button>
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
                      Showing {hotels.length} hotels
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