{/*}
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { AmenitiesWrapperSection } from "./sections/AmenitiesWrapperSection/AmenitiesWrapperSection";
import { ImageGallerySection } from "./sections/ImageGallerySection/ImageGallerySection";
import { ImageGalleryWrapperSection } from "./sections/ImageGalleryWrapperSection";
import { RoomDetailsSection } from "./sections/RoomDetailsSection/RoomDetailsSection";
import { RoomDetailsWrapperSection } from "./sections/RoomDetailsWrapperSection/RoomDetailsWrapperSection";

export const HotelDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <RoomDetailsSection />
      <ImageGallerySection />
      <ImageGalleryWrapperSection />
      <RoomDetailsWrapperSection />
      <AmenitiesSection />
      <AmenitiesWrapperSection />
    </div>
  );
};
*/}

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  StarIcon, 
  MapPinIcon, 
  ArrowLeftIcon, 
  CalendarIcon, 
  UsersIcon,
  WifiIcon,
  CarIcon,
  UtensilsIcon,
  DumbbellIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { formatCurrency, getRatingText } from "../List/utils/filterUtils";

// Types for our hotel data
interface HotelData {
  hotel: {
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
  };
  searchContext: {
    destination: string;
    destinationId: string;
    checkin: string;
    checkout: string;
    guests: number;
    totalHotels: number;
    availableHotels: number;
    searchTimestamp: string;
  };
  allAvailableHotels: number;
  selectedFromPage: number;
}

export const HotelDetails = (): JSX.Element => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🏨 Loading hotel details for ID:', hotelId);
    
    try {
      // Try to load hotel data from localStorage
      const savedData = localStorage.getItem('selectedHotel');
      
      if (savedData) {
        const parsedData: HotelData = JSON.parse(savedData);
        console.log('✅ Hotel data loaded from localStorage:', {
          hotelId: parsedData.hotel.id,
          hotelName: parsedData.hotel.name,
          searchDestination: parsedData.searchContext.destination
        });
        
        // Verify this is the correct hotel (URL hotel ID matches stored hotel ID)
        if (parsedData.hotel.id === hotelId) {
          setHotelData(parsedData);
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
  }, [hotelId]);

  // Calculate stay duration
  const getStayDuration = () => {
    if (!hotelData?.searchContext.checkin || !hotelData?.searchContext.checkout) {
      return 1;
    }
    
    const checkin = new Date(hotelData.searchContext.checkin);
    const checkout = new Date(hotelData.searchContext.checkout);
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3ecdc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto mb-4"></div>
          <p className="text-app-accent text-lg">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !hotelData) {
    return (
      <div className="min-h-screen bg-[#f3ecdc] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-600 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-heading-big text-app-accent mb-4">
            Hotel Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The hotel information could not be loaded."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/dashboard/search")}
              className="bg-app-primary text-white hover:bg-app-primary/90"
            >
              New Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { hotel, searchContext } = hotelData;
  const stayDuration = getStayDuration();
  const totalPrice = hotel.price.amount * stayDuration;

  return (
    <div className="min-h-screen bg-[#f3ecdc]">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="flex items-center text-app-accent hover:text-app-primary"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Results
            </Button>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Hotel {hotelData.selectedFromPage} of {hotelData.allAvailableHotels} in {searchContext.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            
            {/* Hotel Basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-heading-big text-app-accent mb-4">
                {hotel.name}
              </h1>
              
              {/* Rating and Reviews */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {hotel.rating > 0 && (
                  <div className="flex items-center">
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
                    <span className="ml-2 text-app-accent font-medium">
                      {hotel.rating} stars
                    </span>
                  </div>
                )}
                
                {hotel.reviewScore > 0 && (
                  <div className="flex items-center">
                    <span className="bg-app-primary text-white px-2 py-1 rounded text-sm font-bold">
                      {hotel.reviewScore}
                    </span>
                    <div className="ml-2">
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
              
              {/* Search Context */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-medium text-app-accent mb-3">Your Search Details</h3>
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
                  <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-gray-600">
                    <span className="font-medium">{stayDuration} night{stayDuration !== 1 ? 's' : ''}</span> • 
                    <span className="ml-1">Found {searchContext.availableHotels} of {searchContext.totalHotels} hotels</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Pricing Card */}
            <Card className="lg:w-80 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-app-accent">
                    {formatCurrency(hotel.price.amount, hotel.price.currency)}
                  </div>
                  <div className="text-gray-600">per {hotel.price.period}</div>
                </div>
                
                {stayDuration > 1 && (
                  <div className="text-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Total for {stayDuration} nights</div>
                    <div className="text-xl font-bold text-app-accent">
                      {formatCurrency(totalPrice, hotel.price.currency)}
                    </div>
                  </div>
                )}
                
                <Button className="w-full bg-app-primary text-white hover:bg-app-primary/90 py-3 text-lg">
                  Book Now
                </Button>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Free cancellation available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hotel Image and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Image */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-hotel.jpg";
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="text-xl font-heading-standar text-app-accent mb-4">
              Hotel Amenities
            </h3>
            <div className="space-y-3">
              {hotel.amenities.length > 0 ? (
                hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">
                  Amenity information not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {hotel.description && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading-standar text-app-accent mb-4">
                About This Hotel
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {hotel.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <details>
                <summary className="text-sm font-medium text-gray-600 cursor-pointer">
                  Debug Information (Development Only)
                </summary>
                <div className="mt-4 text-xs text-gray-600 space-y-2">
                  <div><strong>Hotel ID:</strong> {hotel.id}</div>
                  <div><strong>Search Timestamp:</strong> {searchContext.searchTimestamp}</div>
                  <div><strong>Selected from Page:</strong> {hotelData.selectedFromPage}</div>
                  <div><strong>Available Hotels:</strong> {hotelData.allAvailableHotels}</div>
                  {hotel.ratehawk_data && (
                    <div>
                      <strong>RateHawk Data Available:</strong> Yes
                      <details className="mt-2">
                        <summary className="cursor-pointer">Raw RateHawk Data</summary>
                        <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded border">
                          {JSON.stringify(hotel.ratehawk_data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              </details>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
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
          
          <Button className="bg-app-primary text-white hover:bg-app-primary/90">
            Share Hotel
          </Button>
        </div>
      </div>
    </div>
  );
};