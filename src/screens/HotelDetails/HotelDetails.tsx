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

  // Load hotel data on mount
  useEffect(() => {
    loadHotelData();
  }, [hotelId]);

  const loadHotelData = async () => {
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
          
          // Check if we need to fetch detailed room data
          const hasDetailedRoomData = parsedData.hotel.ratehawk_data?.room_groups?.length > 0 || 
                                    parsedData.hotel.ratehawk_data?.rates?.length > 0;
          
          if (!hasDetailedRoomData) {
            console.log('🔍 No detailed room data found, fetching from API...');
            
            try {
              const userId = localStorage.getItem('userId') || '';
              const searchResults = localStorage.getItem('hotelSearchResults');
              
              if (searchResults && userId) {
                const searchData = JSON.parse(searchResults);
                
                const hotelDetailsData = {
                  userId: userId,
                  hotelId: hotelId,
                  searchSessionId: searchData.searchSessionId,
                  searchParams: {
                    checkin: parsedData.searchContext.checkin,
                    checkout: parsedData.searchContext.checkout,
                    guests: parsedData.searchContext.guests,
                    residency: 'en-us',
                    currency: 'USD'
                  }
                };
                
                console.log('📡 Fetching detailed hotel data:', hotelDetailsData);
                
                const { data } = await ratehawkApi.getHotelDetails(hotelDetailsData);
                
                if (data.success && data.hotelDetails) {
                  console.log('✅ Detailed hotel data fetched successfully:', {
                    roomGroups: data.hotelDetails.room_groups?.length || 0,
                    rates: data.hotelDetails.rates?.length || 0,
                    roomTypes: data.hotelDetails.roomTypes?.length || 0
                  });
                  
                  // Update the hotel data with detailed information
                  const updatedHotelData = {
                    ...parsedData,
                    hotel: {
                      ...parsedData.hotel,
                      ratehawk_data: {
                        ...parsedData.hotel.ratehawk_data,
                        room_groups: data.hotelDetails.room_groups || [],
                        rates: data.hotelDetails.rates || [],
                        roomTypes: data.hotelDetails.roomTypes || [],
                        bookingOptions: data.hotelDetails.bookingOptions || [],
                        detailedData: data.hotelDetails.detailedData
                      }
                    }
                  };
                  
                  // Update localStorage with enhanced data
                  localStorage.setItem('selectedHotel', JSON.stringify(updatedHotelData));
                  setHotelData(updatedHotelData);
                } else {
                  console.log('⚠️ Failed to fetch detailed hotel data, using basic data');
                  setHotelData(parsedData);
                }
              } else {
                console.log('⚠️ No search session found, using basic hotel data');
                setHotelData(parsedData);
              }
            } catch (fetchError) {
              console.error('💥 Error fetching detailed hotel data:', fetchError);
              console.log('⚠️ Using basic hotel data due to fetch error');
              setHotelData(parsedData);
            }
          } else {
            console.log('✅ Detailed room data already available');
            setHotelData(parsedData);
          }
          
          // Check if this hotel is in favorites
          const favorites = JSON.parse(localStorage.getItem('favoriteHotels') || '[]');
          setIsFavorite(favorites.includes(hotelId));
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

  // Navigation handlers
  const handleBackToResults = () => {
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
    
    console.log(`${isFavorite ? '💔' : '❤️'} Hotel ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  // Share functionality
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
  const handleRoomSelect = (room: ProcessedRoom, quantity: number) => {
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
  const handleBookNow = () => {
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

  const { hotel, searchContext } = hotelData;

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

            {/* Room Selection Section */}
            <RoomSelectionSection 
              hotel={hotel}
              searchContext={searchContext}
              onRoomSelect={handleRoomSelect}
              selectedRoomId={selectedRoom?.id}
              selectedQuantity={selectedQuantity}
            />

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
      {process.env.NODE_ENV === 'development' && hotel.ratehawk_data && (
        <Card className="max-w-7xl mx-auto mt-8 px-4 bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <details>
              <summary className="text-sm font-medium text-gray-600 cursor-pointer mb-2">
                Hotel Debug Data (Development Only)
              </summary>
              <div className="text-xs text-gray-600 space-y-2">
                <div><strong>Hotel ID:</strong> {hotel.id}</div>
                <div><strong>Is Favorite:</strong> {isFavorite ? 'Yes' : 'No'}</div>
                <div><strong>Selected Room:</strong> {selectedRoom?.name || 'None'}</div>
                <div><strong>Room Quantity:</strong> {selectedQuantity}</div>
                <div><strong>Room Price:</strong> {selectedRoom ? `${selectedRoom.price} × ${selectedQuantity} = ${selectedRoom.price * selectedQuantity}` : 'N/A'}</div>
                <div><strong>Total Amenities:</strong> {hotel.amenities?.length || 0}</div>
                <div><strong>RateHawk Rates:</strong> {hotel.ratehawk_data?.rates?.length || 0}</div>
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