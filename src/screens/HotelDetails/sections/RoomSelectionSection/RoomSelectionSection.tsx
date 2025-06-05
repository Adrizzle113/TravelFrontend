import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { 
  BedIcon, 
  UsersIcon, 
  CheckCircleIcon, 
  WifiIcon, 
  BathIcon,
  AirVentIcon,
  TvIcon
} from "lucide-react";

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
  ratehawk_data?: {
    room_groups?: RoomGroup[];
    rates?: Rate[];
    [key: string]: any;
  };
}

interface RoomGroup {
  rg_hash: string;
  name_struct: {
    main_name: string;
    bedding_type?: string;
  };
  room_group_id: number;
}

interface Rate {
  rg_hash: string;
  payment_options?: {
    payment_types?: Array<{
      show_amount?: string;
      amount?: string;
      show_currency_code?: string;
      currency_code?: string;
      type?: string;
    }>;
  };
  daily_prices?: string;
  price?: string;
  currency?: string;
  amenities?: string[];
  room_amenities?: string[];
  rooms?: Array<{
    amenities_data?: string[];
    size?: string;
  }>;
  cancellation_policy?: {
    type?: string;
  };
  [key: string]: any;
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
  availability: number;
  originalRate?: any;
  rgHash?: string;
}

interface RoomSelectionSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
  onRoomSelect: (room: ProcessedRoom, quantity: number) => void;
  selectedRoomId?: string;
  selectedQuantity?: number;
}

// Utility function to calculate stay duration
const getStayDuration = (checkin: string, checkout: string): number => {
  if (!checkin || !checkout) return 1;
  
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  return duration;
};

// Format currency display
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'USD') return `$${amount.toLocaleString()}`;
  return `${amount.toLocaleString()} ${currency}`;
};

export const RoomSelectionSection = ({ 
  hotel, 
  searchContext, 
  onRoomSelect, 
  selectedRoomId, 
  selectedQuantity 
}: RoomSelectionSectionProps): JSX.Element => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // FIXED: Enhanced room processing using room_groups structure
  const processRooms = (hotel: Hotel): ProcessedRoom[] => {
    const roomGroups = hotel.ratehawk_data?.room_groups || [];
    const rates = hotel.ratehawk_data?.rates || [];
    
    console.log(`🔍 Processing ${roomGroups.length} room groups with ${rates.length} rate entries from RateHawk data...`);
    
    if (roomGroups.length === 0) {
      console.log('⚠️ No room_groups found in hotel data, falling back to rates processing');
      return processRoomsFromRates(hotel, rates);
    }
    
    const processedRooms: ProcessedRoom[] = [];
    
    roomGroups.forEach((roomGroup: RoomGroup, index: number) => {
      try {
        // Extract room information from room_group structure
        const nameStruct = roomGroup.name_struct || {};
        const mainName = nameStruct.main_name || `Room Type ${index + 1}`;
        const beddingType = nameStruct.bedding_type || '';
        const rgHash = roomGroup.rg_hash;
        
        // Create full room name
        const fullRoomName = beddingType ? `${mainName} - ${beddingType}` : mainName;
        
        // Find matching rates for this room group using rg_hash
        const matchingRates = rates.filter((rate: Rate) => rate.rg_hash === rgHash);
        console.log(`🔗 Found ${matchingRates.length} rates for room group: ${fullRoomName} (${rgHash})`);
        
        // Get the best rate (lowest price) for this room type
        let bestRate: Rate | null = null;
        let lowestPrice = Infinity;
        let currency = 'USD';
        
        matchingRates.forEach((rate: Rate) => {
          let ratePrice = 0;
          
          if (rate.payment_options?.payment_types?.length && rate.payment_options.payment_types.length > 0) {
            const paymentType = rate.payment_options.payment_types[0];
            ratePrice = parseFloat(paymentType.show_amount || paymentType.amount || '0');
            currency = paymentType.show_currency_code || paymentType.currency_code || 'USD';
          } else {
            ratePrice = parseFloat(rate.daily_prices || rate.price || '0');
            currency = rate.currency || 'USD';
          }
          
          if (ratePrice > 0 && ratePrice < lowestPrice) {
            lowestPrice = ratePrice;
            bestRate = rate as Rate; // Explicit type assertion
          }
        });
        
        // If no matching rates found, use default pricing
        if (!bestRate) {
          console.log(`⚠️ No matching rates found for room group ${rgHash}, using default pricing`);
          lowestPrice = hotel.price?.amount || 100;
          currency = hotel.price?.currency || 'USD';
        }
        
        // Determine occupancy from room name
        let occupancy = '2 guests';
        const lowerName = mainName.toLowerCase();
        if (lowerName.includes('single')) occupancy = '1 guest';
        else if (lowerName.includes('triple')) occupancy = '3 guests';
        else if (lowerName.includes('quadruple') || lowerName.includes('quad')) occupancy = '4 guests';
        else if (lowerName.includes('studio')) occupancy = '1-2 guests';
        else if (lowerName.includes('family')) occupancy = '4-6 guests';
        else if (lowerName.includes('double')) occupancy = '2 guests';
        
        // Extract amenities from the best rate or use hotel amenities
        let roomAmenities: string[] = [];
        if (bestRate) {
          const rate = bestRate as Rate;
          roomAmenities = [
            ...(rate.amenities || []),
            ...(rate.room_amenities || []),
            ...(rate.rooms?.[0]?.amenities_data || [])
          ].slice(0, 4);
        }
        
        if (roomAmenities.length === 0) {
          roomAmenities = hotel.amenities?.slice(0, 3) || ['Free WiFi', 'Air conditioning', 'Private bathroom'];
        }
        
        // Determine bedding display
        let beddingDisplay = beddingType || 'Standard bedding';
        if (beddingType) {
          // Capitalize first letter of each word
          beddingDisplay = beddingType.replace(/\b\w/g, (l: string) => l.toUpperCase());
        } else if (lowerName.includes('twin')) {
          beddingDisplay = 'Twin beds';
        } else if (lowerName.includes('double')) {
          beddingDisplay = 'Double bed';
        } else if (lowerName.includes('single')) {
          beddingDisplay = 'Single bed';
        }
        
        // Get room size with type assertion
        const roomSize = (bestRate as Rate | null)?.rooms?.[0]?.size || 'Standard size';
        
        // Get cancellation policy with type assertion
        const cancellationPolicy = (bestRate as Rate | null)?.cancellation_policy?.type || 'Free cancellation';
        
        // Get payment type with type assertion
        const paymentType = (bestRate as Rate | null)?.payment_options?.payment_types?.[0]?.type || 'Pay at hotel';
        
        // Create processed room
        const processedRoom: ProcessedRoom = {
          id: roomGroup.room_group_id?.toString() || `room_${index}`,
          name: fullRoomName,
          type: mainName,
          price: Math.round(lowestPrice),
          currency: currency,
          image: hotel.image, // Use hotel image as fallback
          bedding: beddingDisplay,
          occupancy: occupancy,
          size: roomSize,
          amenities: roomAmenities,
          cancellation: cancellationPolicy,
          paymentType: paymentType,
          availability: Math.floor(Math.random() * 8) + 1, // Placeholder - extract from actual data if available
          originalRate: bestRate,
          rgHash: rgHash // Store for future reference
        };
        
        processedRooms.push(processedRoom);
        
        // Log each room for debugging
        console.log(`🏨 Processed room ${index + 1}:`, {
          name: processedRoom.name,
          rgHash: rgHash,
          price: `${processedRoom.price} ${processedRoom.currency}`,
          occupancy: processedRoom.occupancy,
          bedding: processedRoom.bedding,
          ratesFound: matchingRates.length
        });
        
      } catch (error) {
        console.error(`💥 Error processing room group ${index}:`, error);
      }
    });
    
    console.log(`✅ Successfully processed ${processedRooms.length} rooms from ${roomGroups.length} room groups`);
    
    // If no rooms were processed, fallback to rates processing
    if (processedRooms.length === 0) {
      console.log('⚠️ No rooms processed from room_groups, falling back to rates');
      return processRoomsFromRates(hotel, rates);
    }
    
    return processedRooms;
  };

  // Fallback function to process rooms from rates array (old method)
  const processRoomsFromRates = (hotel: Hotel, rates: Rate[]): ProcessedRoom[] => {
    if (rates.length === 0) {
      return [{
        id: 'default',
        name: 'Standard Room',
        type: 'Standard',
        price: hotel.price?.amount || 0,
        currency: hotel.price?.currency || 'USD',
        image: hotel.image,
        bedding: 'Standard bedding',
        occupancy: '2 guests',
        size: 'Standard size',
        amenities: hotel.amenities?.slice(0, 3) || [],
        cancellation: 'Standard cancellation',
        paymentType: 'Pay at hotel',
        availability: 1,
        originalRate: null
      }];
    }

    // Process first rate as fallback
    const rate = rates[0];
    let price = 0;
    let currency = 'USD';
    
    if (rate.payment_options?.payment_types?.length && rate.payment_options.payment_types.length > 0) {
      const paymentType = rate.payment_options.payment_types[0];
      price = parseFloat(paymentType.show_amount || paymentType.amount || '0');
      currency = paymentType.show_currency_code || paymentType.currency_code || 'USD';
    }

    return [{
      id: 'fallback',
      name: 'Standard Room',
      type: 'Standard',
      price: Math.round(price) || hotel.price?.amount || 0,
      currency: currency,
      image: hotel.image,
      bedding: 'Standard bedding',
      occupancy: '2 guests',
      size: 'Standard size',
      amenities: hotel.amenities?.slice(0, 3) || [],
      cancellation: 'Standard cancellation',
      paymentType: 'Pay at hotel',
      availability: 1,
      originalRate: rate
    }];
  };

  // Process rooms
  const rooms = processRooms(hotel);
  const duration = getStayDuration(searchContext.checkin, searchContext.checkout);

  // Handle quantity change
  const handleQuantityChange = (roomId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [roomId]: quantity }));
    
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      onRoomSelect(room, quantity);
    }
  };

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) {
      return <WifiIcon className="w-4 h-4" />;
    } else if (lowerAmenity.includes('bath') || lowerAmenity.includes('shower')) {
      return <BathIcon className="w-4 h-4" />;
    } else if (lowerAmenity.includes('air') || lowerAmenity.includes('conditioning')) {
      return <AirVentIcon className="w-4 h-4" />;
    } else if (lowerAmenity.includes('tv') || lowerAmenity.includes('television')) {
      return <TvIcon className="w-4 h-4" />;
    }
    return <CheckCircleIcon className="w-4 h-4" />;
  };

  return (
    <Card className="rounded-[20px] shadow-shadow-shape">
      <CardContent className="p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-heading-standar text-app-accent mb-2">
            Choose Your Room
          </h2>
          <p className="text-gray-600">
            Select from {rooms.length} available room type{rooms.length !== 1 ? 's' : ''} for your {duration}-night stay
          </p>
        </div>

        <div className="space-y-6">
          {rooms.map((room) => {
            const currentQuantity = quantities[room.id] || selectedQuantity || 1;
            const isSelected = selectedRoomId === room.id;
            const totalPrice = room.price * currentQuantity * duration;

            return (
              <Card 
                key={room.id} 
                className={`border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-app-primary bg-green-50' 
                    : 'border-gray-200 hover:border-app-primary/50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Room Image */}
                    <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-hotel.jpg";
                        }}
                      />
                    </div>

                    {/* Room Details */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-heading-standar text-app-accent mb-2">
                            {room.name}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <BedIcon className="w-4 h-4" />
                              {room.bedding}
                            </div>
                            <div className="flex items-center gap-1">
                              <UsersIcon className="w-4 h-4" />
                              {room.occupancy}
                            </div>
                            <div>
                              {room.size}
                            </div>
                          </div>

                          {/* Room Amenities */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.slice(0, 4).map((amenity, amenityIndex) => (
                              <Badge
                                key={amenityIndex}
                                variant="outline"
                                className="text-xs flex items-center gap-1"
                              >
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </Badge>
                            ))}
                          </div>

                          {/* Cancellation & Payment */}
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>✅ {room.cancellation}</div>
                            <div>💳 {room.paymentType}</div>
                            {room.availability <= 3 && (
                              <div className="text-orange-600 font-medium">
                                ⚠️ Only {room.availability} room{room.availability !== 1 ? 's' : ''} left!
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pricing & Selection */}
                        <div className="lg:text-right lg:min-w-[180px] mt-4 lg:mt-0">
                          <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-1">From</div>
                            <div className="text-2xl font-bold text-app-accent">
                              {formatCurrency(room.price, room.currency)}
                            </div>
                            <div className="text-sm text-gray-500">per night</div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rooms
                            </label>
                            <select
                              value={currentQuantity}
                              onChange={(e) => handleQuantityChange(room.id, parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-app-primary focus:border-transparent"
                            >
                              {[...Array(Math.min(9, room.availability))].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} room{i + 1 !== 1 ? 's' : ''}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Total Price Display */}
                          {(currentQuantity > 1 || duration > 1) && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">Total for {duration} night{duration !== 1 ? 's' : ''}</div>
                              <div className="text-lg font-bold text-app-accent">
                                {formatCurrency(totalPrice, room.currency)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {currentQuantity} × {formatCurrency(room.price, room.currency)} × {duration} night{duration !== 1 ? 's' : ''}
                              </div>
                            </div>
                          )}

                          {/* Select Button */}
                          <Button
                            onClick={() => handleQuantityChange(room.id, currentQuantity)}
                            className={`w-full ${
                              isSelected
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-app-primary hover:bg-app-primary/90 text-white'
                            }`}
                          >
                            {isSelected ? (
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-app-accent">Room Selection Summary</h3>
              <p className="text-sm text-gray-600">
                {rooms.length} room type{rooms.length !== 1 ? 's' : ''} available for {duration} night{duration !== 1 ? 's' : ''}
              </p>
            </div>
            {selectedRoomId && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Selected Room</div>
                <div className="font-medium text-app-accent">
                  {rooms.find(r => r.id === selectedRoomId)?.name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
            <details>
              <summary className="cursor-pointer font-medium">Enhanced Room Processing Debug Info</summary>
              <div className="mt-2 space-y-2">
                <div><strong>Room Groups Found:</strong> {hotel.ratehawk_data?.room_groups?.length || 0}</div>
                <div><strong>Rate Entries Found:</strong> {hotel.ratehawk_data?.rates?.length || 0}</div>
                <div><strong>Rooms Successfully Processed:</strong> {rooms.length}</div>
                <div><strong>Selected Room ID:</strong> {selectedRoomId || 'None'}</div>
                <div><strong>Selected Quantity:</strong> {selectedQuantity || 'None'}</div>
                
                {/* Room Groups Breakdown */}
                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-600">Room Groups Breakdown ({hotel.ratehawk_data?.room_groups?.length || 0} total)</summary>
                  <div className="mt-1 max-h-32 overflow-y-auto bg-white p-2 rounded text-xs">
                    {hotel.ratehawk_data?.room_groups?.slice(0, 20).map((rg: any, i: number) => (
                      <div key={i} className="py-1 border-b border-gray-200">
                        <strong>{rg.rg_hash}:</strong> {rg.name_struct?.main_name}
                        {rg.name_struct?.bedding_type && ` - ${rg.name_struct.bedding_type}`}
                      </div>
                    ))}
                    {(hotel.ratehawk_data?.room_groups?.length || 0) > 20 && (
                      <div className="py-1 text-gray-500">... and {(hotel.ratehawk_data?.room_groups?.length || 0) - 20} more</div>
                    )}
                  </div>
                </details>

                {/* Rate Entries Breakdown */}
                <details className="mt-2">
                  <summary className="cursor-pointer text-green-600">Rate Entries Breakdown ({hotel.ratehawk_data?.rates?.length || 0} total)</summary>
                  <div className="mt-1 max-h-32 overflow-y-auto bg-white p-2 rounded text-xs">
                    {hotel.ratehawk_data?.rates?.map((rate: any, i: number) => (
                      <div key={i} className="py-1 border-b border-gray-200">
                        <strong>Rate {i + 1}:</strong> rg_hash: {rate.rg_hash || 'No hash'} | 
                        Price: {rate.payment_options?.payment_types?.[0]?.show_amount || rate.daily_prices || 'No price'} |
                        Room: {rate.room_name || rate.rooms?.[0]?.room_name || 'No name'}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Matching Analysis */}
                <details className="mt-2">
                  <summary className="cursor-pointer text-purple-600">Room Group to Rate Matching Analysis</summary>
                  <div className="mt-1 max-h-40 overflow-y-auto bg-white p-2 rounded text-xs">
                    {hotel.ratehawk_data?.room_groups?.slice(0, 10).map((rg: any, i: number) => {
                      const matchingRates = hotel.ratehawk_data?.rates?.filter((rate: any) => rate.rg_hash === rg.rg_hash) || [];
                      return (
                        <div key={i} className={`py-1 border-b border-gray-200 ${matchingRates.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
                          <strong>{rg.rg_hash}:</strong> {rg.name_struct?.main_name} 
                          → {matchingRates.length} matching rate{matchingRates.length !== 1 ? 's' : ''}
                          {matchingRates.length > 0 && (
                            <span className="text-blue-600">
                              {' '}(${matchingRates[0].payment_options?.payment_types?.[0]?.show_amount || 'No price'})
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {(hotel.ratehawk_data?.room_groups?.length || 0) > 10 && (
                      <div className="py-1 text-gray-500">... showing first 10 of {hotel.ratehawk_data?.room_groups?.length} room groups</div>
                    )}
                  </div>
                </details>

                {/* Processed Rooms Details */}
                <details className="mt-2">
                  <summary className="cursor-pointer text-orange-600">Successfully Processed Rooms ({rooms.length})</summary>
                  <div className="mt-1 max-h-32 overflow-y-auto bg-white p-2 rounded text-xs">
                    {rooms.map((room, i) => (
                      <div key={i} className="py-1 border-b border-gray-200">
                        <strong>#{i + 1}:</strong> {room.name} | ${room.price} {room.currency} | 
                        {room.occupancy} | {room.bedding} | ID: {room.id}
                        {room.rgHash && <span className="text-blue-600"> | Hash: {room.rgHash}</span>}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Search Context */}
                <details className="mt-2">
                  <summary className="cursor-pointer text-indigo-600">Search Context & Parameters</summary>
                  <div className="mt-1 bg-white p-2 rounded text-xs">
                    <div><strong>Destination:</strong> {searchContext.destination} (ID: {searchContext.destinationId})</div>
                    <div><strong>Dates:</strong> {searchContext.checkin} → {searchContext.checkout} ({duration} nights)</div>
                    <div><strong>Guests:</strong> {searchContext.guests}</div>
                    <div><strong>Total Hotels Available:</strong> {searchContext.totalHotels}</div>
                    <div><strong>Search Timestamp:</strong> {searchContext.searchTimestamp}</div>
                  </div>
                </details>

                {/* Performance Metrics */}
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <strong>Performance Metrics:</strong>
                  <div>Room Processing Success Rate: {hotel.ratehawk_data?.room_groups?.length ? Math.round((rooms.length / hotel.ratehawk_data.room_groups.length) * 100) : 0}%</div>
                  <div>Rooms with Pricing: {hotel.ratehawk_data?.rates?.length || 0} / {hotel.ratehawk_data?.room_groups?.length || 0}</div>
                  <div>Data Completeness: {hotel.ratehawk_data ? 'Full RateHawk Data Available' : 'Limited Data'}</div>
                </div>
              </div>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
};