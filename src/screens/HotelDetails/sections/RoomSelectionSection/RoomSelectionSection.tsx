import { useState } from "react";
import { 
  BedIcon, 
  UsersIcon, 
  SquareIcon, 
  CheckCircleIcon,
  WifiIcon,
  CoffeeIcon,
  TvIcon,
  BathIcon,
  AirVentIcon
} from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";

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
  originalRate?: any;
}

interface RoomSelectionSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
  onRoomSelect?: (room: ProcessedRoom) => void;
  selectedRoomId?: string;
}

const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'USD') return `$${Math.round(amount).toLocaleString()}`;
  return `${Math.round(amount).toLocaleString()} ${currency}`;
};

// Extract room amenity icon
const getRoomAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
    return <WifiIcon className="w-4 h-4" />;
  }
  if (amenityLower.includes('coffee') || amenityLower.includes('tea')) {
    return <CoffeeIcon className="w-4 h-4" />;
  }
  if (amenityLower.includes('tv') || amenityLower.includes('television')) {
    return <TvIcon className="w-4 h-4" />;
  }
  if (amenityLower.includes('bath') || amenityLower.includes('shower')) {
    return <BathIcon className="w-4 h-4" />;
  }
  if (amenityLower.includes('air') || amenityLower.includes('conditioning')) {
    return <AirVentIcon className="w-4 h-4" />;
  }
  
  return <CheckCircleIcon className="w-4 h-4" />;
};

// Process RateHawk room data
const processRoomData = (hotel: Hotel): ProcessedRoom[] => {
  const rates = hotel.ratehawk_data?.rates || [];
  
  if (rates.length === 0) {
    // Return a default room if no rates available
    return [{
      id: 'default',
      name: 'Standard Room',
      type: 'Standard',
      price: hotel.price.amount,
      currency: hotel.price.currency,
      image: hotel.image,
      bedding: 'Queen Bed',
      occupancy: `${hotel.ratehawk_data?.search_params?.paxes?.[0]?.adults || 2} Adults`,
      size: '25 m²',
      amenities: ['Free WiFi', 'Air Conditioning', 'Private Bathroom'],
      cancellation: 'Free cancellation',
      paymentType: 'Pay later'
    }];
  }

  return rates.map((rate: any, index: number) => {
    // Extract room information from rate
    const room = rate.rooms?.[0] || {};
    const paymentOption = rate.payment_options?.payment_types?.[0] || {};
    
    // Extract price
    const price = parseFloat(paymentOption.show_amount || paymentOption.amount || rate.daily_prices || hotel.price.amount);
    const currency = paymentOption.show_currency_code || paymentOption.currency_code || hotel.price.currency;
    
    // Extract room details
    const roomName = room.name || 
                    room.room_name || 
                    rate.room_name || 
                    `Room Type ${index + 1}`;
    
    const bedding = room.bedding || 
                   room.bed_type || 
                   (room.room_data_trans?.bedding) ||
                   'Standard Bedding';
    
    // Calculate occupancy from search params or room data
    const searchGuests = hotel.ratehawk_data?.search_params?.paxes?.[0]?.adults || 2;
    const roomOccupancy = room.max_occupancy || searchGuests;
    
    // Extract amenities from various sources
    const roomAmenities = [
      ...(room.amenities_data || []),
      ...(room.facilities || []),
      ...(rate.amenities || []),
      'Free WiFi', // Common amenity
      'Private Bathroom'
    ].filter(Boolean).slice(0, 5);

    // Extract cancellation policy
    const cancellationPolicy = rate.cancellation_penalties?.free_cancellation_before ? 
      'Free cancellation' : 
      paymentOption.cancellation_penalties?.free_cancellation_before ?
      'Free cancellation' :
      'Check cancellation policy';

    // Determine payment type
    const paymentType = paymentOption.payment_type === 'now' ? 'Pay now' : 'Pay later';

    // Generate room image (use hotel image or try to get room-specific image)
    const roomImage = room.images?.[0]?.url || 
                     room.main_image || 
                     hotel.image;

    return {
      id: rate.ruid || `room_${index}`,
      name: roomName,
      type: room.room_group || 'Standard',
      price: price,
      currency: currency,
      image: roomImage,
      bedding: bedding,
      occupancy: `${roomOccupancy} Adults`,
      size: room.room_size || '25 m²',
      amenities: roomAmenities,
      cancellation: cancellationPolicy,
      paymentType: paymentType,
      originalRate: rate
    };
  });
};

export const RoomSelectionSection = ({ 
  hotel, 
  searchContext, 
  onRoomSelect,
  selectedRoomId 
}: RoomSelectionSectionProps): JSX.Element => {
  const [rooms] = useState<ProcessedRoom[]>(() => processRoomData(hotel));

  const handleRoomSelect = (room: ProcessedRoom) => {
    onRoomSelect?.(room);
  };

  const getStayDuration = () => {
    const checkin = new Date(searchContext.checkin);
    const checkout = new Date(searchContext.checkout);
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const duration = getStayDuration();

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-heading-big text-app-accent mb-2">
          Available Rooms
        </h3>
        <p className="text-gray-600">
          Choose from {rooms.length} room type{rooms.length !== 1 ? 's' : ''} for your {duration}-night stay
        </p>
      </div>

      <div className="space-y-6">
        {rooms.map((room) => (
          <Card 
            key={room.id} 
            className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
              selectedRoomId === room.id ? 'ring-2 ring-app-primary shadow-lg' : ''
            }`}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                
                {/* Room Image */}
                <div className="lg:col-span-1 relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 lg:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = hotel.image;
                    }}
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                    {room.type}
                  </Badge>
                </div>

                {/* Room Details */}
                <div className="lg:col-span-1 p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {room.name}
                    </h4>
                    
                    {/* Room Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <BedIcon className="w-4 h-4 mr-2" />
                        <span>{room.bedding}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <UsersIcon className="w-4 h-4 mr-2" />
                        <span>{room.occupancy}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <SquareIcon className="w-4 h-4 mr-2" />
                        <span>{room.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Amenities */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Room Features</h5>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 rounded-full px-2 py-1">
                          {getRoomAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                      {room.amenities.length > 4 && (
                        <div className="text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-1">
                          +{room.amenities.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      <span>{room.cancellation}</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      <span>{room.paymentType}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Selection */}
                <div className="lg:col-span-1 bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold text-app-accent">
                        {formatCurrency(room.price, room.currency)}
                      </div>
                      <div className="text-sm text-gray-600">per night</div>
                      
                      {duration > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatCurrency(room.price * duration, room.currency)}
                          </div>
                          <div className="text-xs text-gray-600">
                            total for {duration} nights
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Room Benefits */}
                    <div className="space-y-2 text-xs text-gray-600 mb-4">
                      <div>✓ Instant confirmation</div>
                      <div>✓ Best rate guarantee</div>
                      <div>✓ Secure booking</div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button
                    onClick={() => handleRoomSelect(room)}
                    className={`w-full ${
                      selectedRoomId === room.id
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-app-primary hover:bg-app-primary/90 text-white'
                    }`}
                  >
                    {selectedRoomId === room.id ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select Room'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Debug Information (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
          <summary className="font-medium cursor-pointer">Room Debug Data</summary>
          <div className="mt-2 space-y-2">
            <div><strong>Total Rates Found:</strong> {hotel.ratehawk_data?.rates?.length || 0}</div>
            <div><strong>Processed Rooms:</strong> {rooms.length}</div>
            <div><strong>Selected Room ID:</strong> {selectedRoomId || 'None'}</div>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
              {JSON.stringify(rooms, null, 2)}
            </pre>
          </div>
        </details>
      )}
    </section>
  );
};