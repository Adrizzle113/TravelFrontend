import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Badge } from "../../../../components/ui/badge";
import { Carousel } from "../../../../components/ui/carousel";
import { 
  UsersIcon, 
  BedIcon, 
  SquareIcon, 
  CheckCircleIcon,
  WifiIcon,
  CoffeeIcon,
  TvIcon,
  BathIcon // Use BathIcon instead of ShowerIcon
} from "lucide-react";

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
  availability: number; // Available rooms count
  originalRate?: any;
}

interface RoomSelectionSectionProps {
  hotel: any;
  searchContext: any;
  onRoomSelect: (room: ProcessedRoom, quantity: number) => void;
  selectedRoomId?: string;
  selectedQuantity?: number;
}

// Amenity icon mapping
const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <WifiIcon className="w-4 h-4" />;
  if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <CoffeeIcon className="w-4 h-4" />;
  if (amenityLower.includes('tv') || amenityLower.includes('television')) return <TvIcon className="w-4 h-4" />;
  if (amenityLower.includes('bathroom') || amenityLower.includes('shower')) return <BathIcon className="w-4 h-4" />;
  return <CheckCircleIcon className="w-4 h-4" />;
};

export const RoomSelectionSection = ({ 
  hotel, 
  searchContext, 
  onRoomSelect, 
  selectedRoomId,
  selectedQuantity = 1 
}: RoomSelectionSectionProps): JSX.Element => {
  const [roomQuantities, setRoomQuantities] = useState<{ [key: string]: number }>({});

  // Process room data from RateHawk
  const processRooms = (): ProcessedRoom[] => {
    if (!hotel.ratehawk_data?.rates || !Array.isArray(hotel.ratehawk_data.rates)) {
      console.log('⚠️ No room rates data available');
      return [];
    }

    console.log(`🔍 Processing ${hotel.ratehawk_data.rates.length} rate entries from RateHawk`);

    const processedRooms: ProcessedRoom[] = [];
    const roomTypesSeen = new Set<string>(); // Track unique room types

    hotel.ratehawk_data.rates.forEach((rate: any, index: number) => {
      try {
        // Extract room information - try multiple possible structures
        const roomInfo = rate.rooms?.[0] || rate.room || {};
        const paymentOptions = rate.payment_options || {};
        const paymentType = paymentOptions.payment_types?.[0] || {};

        // Calculate price (daily rate)
        let dailyPrice = 0;
        if (paymentType.show_amount) {
          dailyPrice = parseFloat(paymentType.show_amount);
        } else if (paymentType.amount) {
          dailyPrice = parseFloat(paymentType.amount);
        } else if (rate.daily_prices) {
          dailyPrice = parseFloat(rate.daily_prices);
        } else if (rate.price) {
          dailyPrice = parseFloat(rate.price);
        }

        // Extract room details with more fallback options
        const roomName = roomInfo.room_name || 
                        roomInfo.name || 
                        rate.room_name || 
                        rate.room_type ||
                        rate.rate_name ||
                        `Room Type ${index + 1}`;

        const roomType = roomInfo.room_type || 
                        rate.room_type || 
                        roomInfo.type ||
                        rate.rate_category ||
                        'Standard Room';

        const bedding = roomInfo.bedding || 
                       roomInfo.bed_type || 
                       roomInfo.beds || 
                       roomInfo.bed_info ||
                       rate.bed_type ||
                       "Standard bedding";

        const occupancy = roomInfo.max_occupancy || 
                         roomInfo.occupancy || 
                         rate.max_guests || 
                         rate.guests ||
                         roomInfo.capacity ||
                         "2 guests";

        const roomSize = roomInfo.room_size || 
                        roomInfo.size || 
                        roomInfo.area ||
                        rate.room_size ||
                        "Standard size";

        // Extract amenities from multiple sources
        const amenitiesData = roomInfo.amenities_data || 
                             roomInfo.amenities || 
                             rate.amenities || 
                             rate.room_amenities || 
                             [];
        
        const amenities = amenitiesData.map((amenity: any) => {
          if (typeof amenity === 'string') return amenity;
          if (amenity && amenity.name) return amenity.name;
          if (amenity && amenity.title) return amenity.title;
          if (amenity && amenity.text) return amenity.text;
          return 'Amenity';
        }).filter(Boolean).slice(0, 6);

        // Generate room image (use hotel image as fallback)
        const roomImages = roomInfo.images || 
                          rate.images || 
                          hotel.ratehawk_data?.static_vm?.images || 
                          [];
        let roomImage = hotel.image; // Default to hotel image
        
        if (roomImages.length > 0) {
          const firstImage = roomImages[0];
          if (firstImage && firstImage.tmpl) {
            roomImage = firstImage.tmpl.replace('{size}', '640x400');
          } else if (firstImage && firstImage.url) {
            roomImage = firstImage.url;
          } else if (typeof firstImage === 'string') {
            roomImage = firstImage;
          }
        }

        // Extract cancellation policy
        const cancellationPolicy = rate.cancellation_penalties || rate.cancellation;
        const cancellation = cancellationPolicy ? 
          (cancellationPolicy.free_cancellation_before ? 'Free cancellation' : 'Restricted cancellation') :
          'Non-refundable';

        // Payment types
        const paymentTypes = paymentOptions.payment_types_available || 
                           paymentOptions.payment_methods ||
                           ['Pay at hotel'];
        const paymentType_display = Array.isArray(paymentTypes) ? 
          paymentTypes.join(', ') : 
          (paymentTypes || 'Pay at hotel');

        // Mock availability (2-9 rooms available)
        const availability = Math.floor(Math.random() * 8) + 2;

        // Create unique room identifier
        const roomKey = `${roomName}_${roomType}_${dailyPrice}`.toLowerCase();
        
        // Skip if we've already processed this exact room type
        if (roomTypesSeen.has(roomKey)) {
          console.log(`⏭️ Skipping duplicate room: ${roomName}`);
          return;
        }
        
        roomTypesSeen.add(roomKey);

        const processedRoom: ProcessedRoom = {
          id: rate.rate_id || rate.id || `room_${index}`,
          name: roomName,
          type: roomType,
          price: dailyPrice,
          currency: paymentType.show_currency_code || paymentType.currency_code || rate.currency || 'USD',
          image: roomImage,
          bedding: bedding,
          occupancy: occupancy.toString(),
          size: roomSize,
          amenities: amenities,
          cancellation: cancellation,
          paymentType: paymentType_display,
          availability: availability,
          originalRate: rate
        };

        processedRooms.push(processedRoom);

        // Enhanced logging for first few rooms
        if (processedRooms.length <= 3) {
          console.log(`🏨 Processed Room ${processedRooms.length}:`, {
            id: processedRoom.id,
            name: processedRoom.name,
            type: processedRoom.type,
            price: `${processedRoom.price} ${processedRoom.currency}`,
            amenities: processedRoom.amenities.length,
            originalRateId: rate.rate_id || rate.id
          });
        }

      } catch (error) {
        console.error(`💥 Error processing room ${index}:`, error);
        console.log('📋 Rate data that failed:', rate);
      }
    });

    console.log(`✅ Successfully processed ${processedRooms.length} unique room types from ${hotel.ratehawk_data.rates.length} rate entries`);
    
    // If no rooms were processed, create a fallback room
    if (processedRooms.length === 0) {
      console.log('⚠️ No rooms processed, creating fallback room');
      processedRooms.push({
        id: 'fallback_room',
        name: 'Standard Room',
        type: 'Standard',
        price: hotel.price?.amount || 100,
        currency: hotel.price?.currency || 'USD',
        image: hotel.image,
        bedding: 'Double bed',
        occupancy: '2 guests',
        size: 'Standard size',
        amenities: hotel.amenities?.slice(0, 4) || ['Free WiFi'],
        cancellation: 'Standard cancellation',
        paymentType: 'Pay at hotel',
        availability: 5,
        originalRate: null
      });
    }

    return processedRooms;
  };

  const rooms = processRooms();

  // Calculate stay duration
  const getStayDuration = (): number => {
    if (!searchContext.checkin || !searchContext.checkout) return 1;
    
    const checkinDate = new Date(searchContext.checkin);
    const checkoutDate = new Date(searchContext.checkout);
    const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    return duration;
  };

  const handleRoomSelect = (room: ProcessedRoom) => {
    const quantity = roomQuantities[room.id] || 1;
    onRoomSelect(room, quantity);
  };

  const handleQuantityChange = (roomId: string, quantity: number) => {
    setRoomQuantities(prev => ({
      ...prev,
      [roomId]: quantity
    }));
  };

  const stayDuration = getStayDuration();

  if (rooms.length === 0) {
    return (
      <section className="mb-8">
        <Card className="rounded-[20px] border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">🏨</div>
            <h3 className="text-xl font-heading-standar text-gray-600 mb-2">
              No Room Information Available
            </h3>
            <p className="text-gray-500">
              Room details are not available for this hotel at the moment.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading-big text-app-accent mb-2">
          Choose Your Room
        </h2>
        <p className="text-gray-600">
          {rooms.length} room type{rooms.length !== 1 ? 's' : ''} available • {stayDuration} night{stayDuration !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {rooms.map((room, index) => {
          const isSelected = selectedRoomId === room.id;
          const currentQuantity = roomQuantities[room.id] || selectedQuantity || 1;
          const totalPrice = room.price * stayDuration * currentQuantity;
          const maxAvailable = Math.min(room.availability, 9);

          return (
            <Card 
              key={room.id} 
              className={`rounded-[20px] border-2 transition-all duration-200 ${
                isSelected 
                  ? 'border-app-primary bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Room Image */}
                  <div className="relative">
                    <div className="relative w-full h-48 rounded-[15px] overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-hotel.jpg";
                        }}
                      />
                      {room.availability <= 3 && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-red-500 text-white">
                            Only {room.availability} left
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="md:col-span-1">
                    <div className="mb-4">
                      <h3 className="text-lg font-heading-standar text-app-accent mb-1">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {room.type}
                      </p>
                      
                      {/* Room Specs */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <UsersIcon className="w-4 h-4 mr-2" />
                          <span>{room.occupancy}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BedIcon className="w-4 h-4 mr-2" />
                          <span>{room.bedding}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <SquareIcon className="w-4 h-4 mr-2" />
                          <span>{room.size}</span>
                        </div>
                      </div>

                      {/* Room Amenities */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Room Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {room.amenities.slice(0, 4).map((amenity, amenityIndex) => (
                            <div key={amenityIndex} className="flex items-center text-xs text-gray-600">
                              {getAmenityIcon(amenity)}
                              <span className="ml-1 truncate">{amenity}</span>
                            </div>
                          ))}
                        </div>
                        {room.amenities.length > 4 && (
                          <p className="text-xs text-app-primary mt-1">
                            +{room.amenities.length - 4} more amenities
                          </p>
                        )}
                      </div>

                      {/* Cancellation Policy */}
                      <div className="text-xs">
                        <Badge 
                          variant="outline" 
                          className={
                            room.cancellation.includes('Free') 
                              ? 'border-green-500 text-green-600' 
                              : 'border-yellow-500 text-yellow-600'
                          }
                        >
                          {room.cancellation}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Selection */}
                  <div className="md:col-span-1">
                    <div className="h-full flex flex-col justify-between">
                      <div className="mb-4">
                        {/* Price Display */}
                        <div className="text-right mb-4">
                          <div className="text-2xl font-bold text-app-accent">
                            ${room.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            per night
                          </div>
                          {currentQuantity > 1 && (
                            <div className="text-sm text-gray-500 mt-1">
                              × {currentQuantity} room{currentQuantity !== 1 ? 's' : ''} × {stayDuration} night{stayDuration !== 1 ? 's' : ''}
                            </div>
                          )}
                          <div className="text-lg font-semibold text-app-primary mt-1">
                            Total: ${totalPrice.toLocaleString()}
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of rooms:
                          </label>
                          <Select 
                            value={currentQuantity.toString()} 
                            onValueChange={(value) => handleQuantityChange(room.id, parseInt(value))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: maxAvailable }, (_, i) => i + 1).map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} room{num !== 1 ? 's' : ''} 
                                  {num > 1 && ` (${num} × $${room.price} = $${num * room.price}/night)`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">
                            {room.availability} rooms available
                          </p>
                        </div>
                      </div>

                      {/* Select Button */}
                      <Button
                        onClick={() => handleRoomSelect(room)}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-app-primary hover:bg-app-primary/90 text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select This Room'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Room Selection Summary */}
      {selectedRoomId && (
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">
                  Room selected: {rooms.find(r => r.id === selectedRoomId)?.name}
                </span>
              </div>
              <div className="text-sm text-green-600">
                {selectedQuantity} room{selectedQuantity !== 1 ? 's' : ''} for {stayDuration} night{stayDuration !== 1 ? 's' : ''}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};