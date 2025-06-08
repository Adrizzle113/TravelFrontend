import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";

// Import All Sections
import { HeroSection } from "./sections/HeroSection";
import { RoomSelectionSection } from "./sections/RoomSelectionSection";
import { BookingSection } from "./sections/BookingSection";
import { HotelInfoSection } from "./sections/HotelInfoSection";
import { FacilitiesGridSection } from "./sections/FacilitiesGridSection";
import { MapSection } from "./sections/MapSection";

// Import API
import { ratehawkApi } from "../../lib/api";

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
  cancellation: string;
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
  
  // NEW: Enhanced room details state
  const [enhancedHotelData, setEnhancedHotelData] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [hasDetailedRoomData, setHasDetailedRoomData] = useState(false);

  // Load hotel data on mount
  useEffect(() => {
    if (hotelId) {
      loadHotelData();
    }
  }, [hotelId]);

  const loadHotelData = async (): Promise<void> => {
    console.log('🏨 Loading hotel details for ID:', hotelId);
    setLoading(true);
    setError(null);
    
    try {
      const savedData = localStorage.getItem('selectedHotel');
      
      if (savedData) {
        const parsedData: HotelData = JSON.parse(savedData);
        
        if (parsedData.hotel.id === hotelId) {
          console.log('✅ Hotel data loaded successfully:', {
            hotelId: parsedData.hotel.id,
            hotelName: parsedData.hotel.name,
            destination: parsedData.searchContext.destination,
            hasRatehawkData: !!parsedData.hotel.ratehawk_data
          });
          
          setHotelData(parsedData);
          
          // Check if this hotel is in favorites
          const favorites = JSON.parse(localStorage.getItem('favoriteHotels') || '[]');
          setIsFavorite(favorites.includes(hotelId));
          
          // NEW: Fetch enhanced hotel details after basic data is loaded
          await fetchEnhancedHotelDetails(parsedData);
        } else {
          setError("Hotel information mismatch. Please search again.");
        }
      } else {
        setError("Hotel information not found. Please search for hotels first.");
      }
    } catch (err) {
      console.error('💥 Error loading hotel data:', err);
      setError("Failed to load hotel information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Fetch enhanced hotel details with room data
  const fetchEnhancedHotelDetails = async (basicHotelData: HotelData): Promise<void> => {
    if (!hotelId) return;

    setDetailsLoading(true);
    setDetailsError(null);

    try {
      console.log('🔍 Fetching enhanced hotel details from RateHawk...');
      
      const userId = localStorage.getItem('userId') || 
                     localStorage.getItem('userEmail')?.replace('@', '_').replace('.', '_') ||
                     'default_user';

      // Get search session if available
      const searchResults = localStorage.getItem('hotelSearchResults');
      let searchSessionId = null;
      if (searchResults) {
        const parsedResults = JSON.parse(searchResults);
        searchSessionId = parsedResults.searchSessionId;
      }

      // Create search parameters from context
      const searchParams = {
        checkin: basicHotelData.searchContext.checkin,
        checkout: basicHotelData.searchContext.checkout,
        guests: basicHotelData.searchContext.guests,
        residency: 'en-us',
        currency: 'USD'
      };

      console.log('📡 Calling hotel details API with:', {
        userId,
        hotelId,
        searchSessionId,
        searchParams
      });

      const { data } = await ratehawkApi.fetchHotelDetails({
        userId,
        hotelId,
        searchSessionId,
        searchParams
      });

      if (data.success && data.hotelDetails) {
        console.log('✅ Enhanced hotel details received:', {
          hasRates: data.hotelDetails.rates?.length > 0,
          hasRoomGroups: data.hotelDetails.room_groups?.length > 0,
          hasBookingOptions: data.hotelDetails.bookingOptions?.length > 0
        });

        // Merge enhanced data with basic hotel data
        const mergedHotelData = {
          ...basicHotelData,
          hotel: {
            ...basicHotelData.hotel,
            ratehawk_data: {
              ...basicHotelData.hotel.ratehawk_data,
              rates: data.hotelDetails.rates || [],
              room_groups: data.hotelDetails.room_groups || [],
              booking_options: data.hotelDetails.bookingOptions || [],
              detailed_data: data.hotelDetails.detailedData || null
            }
          }
        };

        setEnhancedHotelData(mergedHotelData);
        setHasDetailedRoomData(
          (data.hotelDetails.rates?.length > 0) || 
          (data.hotelDetails.room_groups?.length > 0)
        );

        // Update localStorage with enhanced data
        localStorage.setItem('selectedHotel', JSON.stringify(mergedHotelData));
        
        console.log('💾 Enhanced hotel data stored in localStorage');
        
      } else {
        console.log('⚠️ No enhanced details available:', data.error);
        setDetailsError(data.error || 'Unable to load detailed room information');
        setHasDetailedRoomData(false);
      }
    } catch (err: any) {
      console.error('💥 Error fetching enhanced hotel details:', err);
      setDetailsError(`Failed to load room details: ${err.message}`);
      setHasDetailedRoomData(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Navigation handlers
  const handleBackToResults = (): void => {
    console.log('🔙 Navigating back to search results...');
    
    const searchResults = localStorage.getItem('hotelSearchResults');
    
    if (searchResults) {
      try {
        const parsedResults = JSON.parse(searchResults);
        const resultAge = Date.now() - new Date(parsedResults.timestamp).getTime();
        const maxAge = 30 * 60 * 1000; // 30 minutes
        
        if (resultAge < maxAge) {
          navigate('/dashboard/search');
          return;
        } else {
          localStorage.removeItem('hotelSearchResults');
        }
      } catch (error) {
        localStorage.removeItem('hotelSearchResults');
      }
    }
    
    navigate('/dashboard/search');
  };

  // Favorite management
  const toggleFavorite = (): void => {
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
    
    console.log(`${isFavorite ? '💔' : '❤️'} Hotel ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  // Share functionality
  const shareHotel = async (): Promise<void> => {
    if (!hotelData) return;
    
    const shareData = {
      title: hotelData.hotel.name,
      text: `Check out this hotel: ${hotelData.hotel.name} in ${hotelData.hotel.location}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('✅ Hotel shared successfully');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        console.log('✅ Hotel link copied to clipboard');
        // You could show a toast notification here
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  // Room selection handler
  const handleRoomSelect = (room: ProcessedRoom, quantity: number): void => {
    console.log('🏨 Room selected:', {
      name: room.name,
      price: room.price,
      quantity: quantity,
      totalPrice: room.price * quantity
    });
    
    setSelectedRoom(room);
    setSelectedQuantity(quantity);
  };

  // Booking handler
  const handleBookNow = (): void => {
    const bookingPrice = selectedRoom ? (selectedRoom.price * selectedQuantity) : hotelData?.hotel.price.amount;
    const bookingCurrency = selectedRoom ? selectedRoom.currency : hotelData?.hotel.price.currency;
    
    console.log('🎯 Initiating booking:', {
      hotel: hotelData?.hotel.name,
      room: selectedRoom?.name || 'Default room',
      quantity: selectedQuantity,
      price: bookingPrice,
      currency: bookingCurrency
    });
    
    // Store booking data for potential booking page
    const bookingData = {
      hotel: hotelData?.hotel,
      selectedRoom: selectedRoom,
      quantity: selectedQuantity,
      searchContext: hotelData?.searchContext,
      totalPrice: bookingPrice,
      currency: bookingCurrency,
      bookingTimestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    
    // For now, open RateHawk in new tab
    window.open('https://www.ratehawk.com', '_blank');
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

  const { hotel, searchContext } = enhancedHotelData || hotelData;

  // Prepare images for hero section
  const heroImages = [
    { src: hotel.image, alt: hotel.name },
    // Add more images if available from ratehawk_data
    ...(hotel.ratehawk_data?.static_vm?.images?.slice(0, 4).map((img: any, index: number) => ({
      src: img.tmpl?.replace('{size}', '1024x768') || img.url || hotel.image,
      alt: `${hotel.name} - Image ${index + 2}`
    })) || [])
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

      {/* Enhanced Room Details Loading State */}
      {detailsLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <div className="text-blue-800 text-sm">
                  Loading detailed room information from RateHawk...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Room Details Error State */}
      {!detailsLoading && detailsError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-orange-800 font-medium text-sm mb-1">Room Details Unavailable</div>
                  <div className="text-orange-700 text-sm">
                    Could not load detailed room information. You can still view hotel information and proceed with booking through RateHawk directly.
                  </div>
                </div>
                <button
                  onClick={() => fetchEnhancedHotelDetails(hotelData)}
                  className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hotel Info Section */}
            <HotelInfoSection 
              hotel={hotel}
              searchContext={searchContext}
            />

            {/* Room Selection Section - Only show if we have detailed data */}
            {hasDetailedRoomData && !detailsLoading ? (
              <RoomSelectionSection 
                hotel={hotel}
                searchContext={searchContext}
                onRoomSelect={handleRoomSelect}
                selectedRoomId={selectedRoom?.id}
                selectedQuantity={selectedQuantity}
              />
            ) : !detailsLoading && (
              <Card className="rounded-[20px] shadow-shadow-shape">
                <CardContent className="p-6 lg:p-8 text-center">
                  <div className="text-gray-400 text-4xl mb-4">🏨</div>
                  <h3 className="text-xl font-heading-standar text-gray-600 mb-2">
                    Room Selection Unavailable
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Detailed room information is not available at the moment.
                  </p>
                  <button
                    onClick={() => window.open('https://www.ratehawk.com', '_blank')}
                    className="bg-app-primary text-white px-6 py-3 rounded-lg hover:bg-app-primary/90"
                  >
                    Book Directly on RateHawk
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Facilities Grid Section */}
            <FacilitiesGridSection 
              hotel={hotel}
              amenities={hotel.amenities}
            />

            {/* Map Section */}
            <MapSection 
              hotel={hotel}
              searchContext={searchContext}
            />

          </div>
          
          {/* Right Column - Booking Section */}
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
      {process.env.NODE_ENV === 'development' && (
        <Card className="max-w-7xl mx-auto mt-8 px-4 bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <details>
              <summary className="text-sm font-medium text-gray-600 cursor-pointer mb-2">
                Enhanced Hotel Debug Data (Development Only)
              </summary>
              <div className="text-xs text-gray-600 space-y-2">
                <div><strong>Hotel ID:</strong> {hotel.id}</div>
                <div><strong>Is Favorite:</strong> {isFavorite ? 'Yes' : 'No'}</div>
                <div><strong>Selected Room:</strong> {selectedRoom?.name || 'None'}</div>
                <div><strong>Room Quantity:</strong> {selectedQuantity}</div>
                <div><strong>Room Price:</strong> {selectedRoom ? `${selectedRoom.price} × ${selectedQuantity} = ${selectedRoom.price * selectedQuantity}` : 'N/A'}</div>
                <div><strong>Total Amenities:</strong> {hotel.amenities?.length || 0}</div>
                <div><strong>Has Enhanced Data:</strong> {hasDetailedRoomData ? 'Yes' : 'No'}</div>
                <div><strong>Details Loading:</strong> {detailsLoading ? 'Yes' : 'No'}</div>
                <div><strong>Details Error:</strong> {detailsError || 'None'}</div>
                <div><strong>RateHawk Rates:</strong> {hotel.ratehawk_data?.rates?.length || 0}</div>
                <div><strong>RateHawk Room Groups:</strong> {hotel.ratehawk_data?.room_groups?.length || 0}</div>
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