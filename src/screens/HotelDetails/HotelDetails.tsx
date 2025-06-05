import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  StarIcon, 
  MapPinIcon, 
  ArrowLeftIcon, 
  CalendarIcon, 
  UsersIcon,
  ShareIcon,
  HeartIcon,
  WifiIcon,
  CarIcon,
  UtensilsIcon,
  DumbbellIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  RefreshCwIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

// Types for hotel data
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

export const HotelDetails = (): JSX.Element => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load hotel data on mount
  useEffect(() => {
    loadHotelData();
  }, [hotelId]);

  const loadHotelData = () => {
    console.log('🏨 Loading hotel details for ID:', hotelId);
    setLoading(true);
    setError(null);
    
    try {
      const savedData = localStorage.getItem('selectedHotel');
      
      if (savedData) {
        const parsedData: HotelData = JSON.parse(savedData);
        
        // Verify this is the correct hotel
        if (parsedData.hotel.id === hotelId) {
          console.log('✅ Hotel data loaded successfully:', {
            hotelId: parsedData.hotel.id,
            hotelName: parsedData.hotel.name,
            destination: parsedData.searchContext.destination
          });
          
          setHotelData(parsedData);
          
          // Check if this hotel is in favorites
          const favorites = JSON.parse(localStorage.getItem('favoriteHotels') || '[]');
          setIsFavorite(favorites.includes(hotelId));
        } else {
          console.log('⚠️ Hotel ID mismatch:', {
            urlHotelId: hotelId,
            storedHotelId: parsedData.hotel.id
          });
          setError("Hotel information mismatch. Please search again.");
        }
      } else {
        console.log('❌ No hotel data found in localStorage');
        setError("Hotel information not found. Please search for hotels first.");
      }
    } catch (err) {
      console.error('💥 Error loading hotel data:', err);
      setError("Failed to load hotel information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Enhanced back navigation
  const handleBackToResults = () => {
    console.log('🔙 Navigating back to search results...');
    
    // Check if we have recent search results
    const searchResults = localStorage.getItem('hotelSearchResults');
    
    if (searchResults) {
      try {
        const parsedResults = JSON.parse(searchResults);
        const resultAge = Date.now() - new Date(parsedResults.timestamp).getTime();
        const maxAge = 30 * 60 * 1000; // 30 minutes
        
        if (resultAge < maxAge) {
          console.log('✅ Recent search results found, navigating back');
          navigate('/dashboard/search');
          return;
        } else {
          console.log('⏰ Search results expired, clearing...');
          localStorage.removeItem('hotelSearchResults');
        }
      } catch (error) {
        console.error('💥 Error checking search results:', error);
        localStorage.removeItem('hotelSearchResults');
      }
    }
    
    // Fallback: navigate to search page
    navigate('/dashboard/search');
  };

  // Calculate stay duration and total price
  const getStayInfo = () => {
    if (!hotelData?.searchContext.checkin || !hotelData?.searchContext.checkout) {
      return { duration: 1, totalPrice: hotelData?.hotel.price.amount || 0 };
    }
    
    const checkin = new Date(hotelData.searchContext.checkin);
    const checkout = new Date(hotelData.searchContext.checkout);
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = (hotelData?.hotel.price.amount || 0) * duration;
    
    return { duration, totalPrice };
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    if (currency === 'USD') return `$${amount.toLocaleString()}`;
    return `${amount.toLocaleString()} ${currency}`;
  };

  // Get rating text
  const getRatingText = (score: number): string => {
    if (score >= 9) return "Excellent";
    if (score >= 8) return "Very Good";
    if (score >= 7) return "Good";
    if (score >= 6) return "Pleasant";
    return "Fair";
  };

  // Toggle favorite
  const toggleFavorite = () => {
    if (!hotelId) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteHotels') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== hotelId);
    } else {
      newFavorites = [...favorites, hotelId];
    }
    
    localStorage.setItem('favoriteHotels', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Share hotel
  const shareHotel = async () => {
    if (!hotelData) return;
    
    const shareData = {
      title: hotelData.hotel.name,
      text: `Check out this hotel: ${hotelData.hotel.name} in ${hotelData.hotel.location}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You could show a toast notification here
        console.log('✅ Hotel link copied to clipboard');
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
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
          <p className="text-gray-600">Please wait while we load the information...</p>
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
              <Button
                onClick={handleBackToResults}
                variant="outline"
                className="border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
              <Button
                onClick={() => navigate("/dashboard/search")}
                className="bg-app-primary text-white hover:bg-app-primary/90"
              >
                New Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { hotel, searchContext } = hotelData;
  const { duration, totalPrice } = getStayInfo();

  return (
    <div className="min-h-screen bg-[#f3ecdc]">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToResults}
                variant="ghost"
                className="flex items-center text-app-accent hover:text-app-primary"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Results
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  Hotel {hotelData.selectedFromPage} of {hotelData.allAvailableHotels} in {searchContext.destination}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleFavorite}
                variant="ghost"
                size="sm"
                className={isFavorite ? "text-red-500" : "text-gray-500"}
              >
                <HeartIcon className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              
              <Button
                onClick={shareHotel}
                variant="ghost"
                size="sm"
                className="text-gray-500"
              >
                <ShareIcon className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={loadHotelData}
                variant="ghost"
                size="sm"
                className="text-gray-500"
              >
                <RefreshCwIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Hotel Info */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-heading-big text-app-accent mb-4">
                  {hotel.name}
                </h1>
                
                {/* Rating and Reviews */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  {hotel.rating > 0 && (
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i}
                            className={`h-5 w-5 ${
                              i < hotel.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-app-accent font-medium">
                        {hotel.rating} stars
                      </span>
                    </div>
                  )}
                  
                  {hotel.reviewScore > 0 && (
                    <div className="flex items-center">
                      <Badge variant="secondary" className="bg-app-primary text-white px-3 py-1">
                        {hotel.reviewScore}/10
                      </Badge>
                      <div className="ml-3">
                        <span className="text-app-accent font-medium">
                          {getRatingText(hotel.reviewScore)}
                        </span>
                        {hotel.reviewCount > 0 && (
                          <span className="text-gray-600 text-sm ml-1">
                            ({hotel.reviewCount.toLocaleString()} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span className="text-lg">{hotel.location}</span>
                </div>
              </div>
              
              {/* Search Context Card */}
              <Card className="bg-blue-50 border-blue-200 mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-app-accent">Your Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <div className="font-medium">Check-in</div>
                        <div className="text-gray-600">{searchContext.checkin}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <div className="font-medium">Check-out</div>
                        <div className="text-gray-600">{searchContext.checkout}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <div className="font-medium">Guests</div>
                        <div className="text-gray-600">{searchContext.guests}</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{duration} night{duration !== 1 ? 's' : ''}</span> • 
                    <span className="ml-1">Found among {searchContext.availableHotels} available hotels</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Pricing Card */}
            <Card className="lg:w-80 bg-white shadow-lg sticky top-24 h-fit">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-app-accent">
                    {formatCurrency(hotel.price.amount, hotel.price.currency)}
                  </div>
                  <div className="text-gray-600">per {hotel.price.period}</div>
                </div>
                
                {duration > 1 && (
                  <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Total for {duration} nights</div>
                    <div className="text-2xl font-bold text-app-accent">
                      {formatCurrency(totalPrice, hotel.price.currency)}
                    </div>
                  </div>
                )}
                
                <Button className="w-full bg-app-primary text-white hover:bg-app-primary/90 py-3 text-lg mb-4">
                  Book Now
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    ✅ Free cancellation available
                  </p>
                  <p className="text-xs text-gray-500">
                    💳 Pay now or at the hotel
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://www.ratehawk.com', '_blank')}
                    className="text-sm"
                  >
                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                    View on RateHawk
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hotel Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Image */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={imageError ? "/placeholder-hotel.jpg" : hotel.image}
                    alt={hotel.name}
                    className="w-full h-96 object-cover"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge 
                    className="absolute top-4 left-4 bg-white/90 text-app-accent"
                  >
                    Verified Hotel
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Amenities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                  Hotel Amenities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {hotel.amenities.length > 0 ? (
                    hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm italic">
                      Amenity information not available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        {hotel.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About This Hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {hotel.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleBackToResults}
            variant="outline"
            className="border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          
          <Button
            onClick={() => navigate("/dashboard/search")}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            New Search
          </Button>
          
          <Button 
            onClick={shareHotel}
            className="bg-app-primary text-white hover:bg-app-primary/90"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Share Hotel
          </Button>
        </div>
      </div>

      {/* Debug Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && hotel.ratehawk_data && (
        <Card className="max-w-7xl mx-auto mt-8 mx-4 bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              Debug Information (Development Only)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <details>
              <summary className="text-sm font-medium text-gray-600 cursor-pointer mb-2">
                Hotel Debug Data
              </summary>
              <div className="text-xs text-gray-600 space-y-2">
                <div><strong>Hotel ID:</strong> {hotel.id}</div>
                <div><strong>Search Timestamp:</strong> {searchContext.searchTimestamp}</div>
                <div><strong>Selected from Page:</strong> {hotelData.selectedFromPage}</div>
                <div><strong>Available Hotels:</strong> {hotelData.allAvailableHotels}</div>
                <div><strong>Image Error:</strong> {imageError ? 'Yes' : 'No'}</div>
                <div><strong>Is Favorite:</strong> {isFavorite ? 'Yes' : 'No'}</div>
                <details className="mt-2">
                  <summary className="cursor-pointer">Raw RateHawk Data</summary>
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