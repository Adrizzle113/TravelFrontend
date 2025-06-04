import { StarIcon, MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { RateHawkHotel } from '../types';
import { formatCurrency, getRatingText } from '../utils/filterUtils';

interface HotelCardProps {
  hotel: RateHawkHotel;
  onViewMore: (hotelId: string) => void;
  onQuickBook: (hotelId: string) => void;
}

export const HotelCard = ({ hotel, onViewMore, onQuickBook }: HotelCardProps): JSX.Element => {
  const navigate = useNavigate();

  // 🧪 DIRECT TEST FUNCTION - Bypass props
  const handleDirectTest = () => {
    console.log('🧪 DIRECT TEST: Button clicked!');
    console.log('🏨 Hotel object:', hotel);
    console.log('🆔 Hotel ID:', hotel.id);
    
    try {
      const testData = {
        hotel: hotel,
        searchContext: {
          destination: "Rio de Janeiro, Brazil",
          destinationId: "2998",
          checkin: "2025-06-04",
          checkout: "2025-06-08",
          guests: 2,
          totalHotels: 50,
          availableHotels: 45,
          searchTimestamp: new Date().toISOString()
        },
        testTimestamp: new Date().toISOString(),
        directTest: true
      };
      
      console.log('💾 About to store test data:', testData);
      
      // Store in localStorage
      localStorage.setItem('selectedHotel', JSON.stringify(testData));
      
      // Verify immediately
      const verification = localStorage.getItem('selectedHotel');
      console.log('✅ Verification result:', verification ? 'SUCCESS' : 'FAILED');
      
      if (verification) {
        console.log('📋 Stored data length:', verification.length);
        console.log('📄 Stored data preview:', verification.substring(0, 200) + '...');
      }
      
      // Navigate
      console.log('🚀 Navigating to:', `/hoteldetails/${hotel.id}`);
      navigate(`/hoteldetails/${hotel.id}`);
      
    } catch (error) {
      console.error('💥 Direct test error:', error);
    }
  };

  return (
    <Card className="rounded-[20px] shadow-shadow-shape hover:shadow-lg transition-shadow duration-200">
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
                  e.currentTarget.src = "/placeholder-hotel.jpg";
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

              {/* Price Display */}
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
                {/* 🧪 DIRECT TEST BUTTON */}
                <Button 
                  className="bg-red-600 text-white rounded-full border-4 border-solid px-7 py-4 text-[15.4px] hover:bg-red-500 transition-colors"
                  onClick={handleDirectTest}
                >
                  🧪 DIRECT TEST
                </Button>
                
                {/* Original button */}
                <Button 
                  className="bg-[#588157] text-[#ffffff] rounded-full border-4 border-solid px-7 py-4 text-[15.4px] hover:bg-[#588157]/90 transition-colors"
                  onClick={() => {
                    console.log('🔘 Original button clicked:', hotel.id);
                    onViewMore(hotel.id);
                  }}
                >
                  View Hotel (Original)
                </Button>
              </div>

              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
                  <strong>Debug:</strong> Hotel ID: {hotel.id}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};