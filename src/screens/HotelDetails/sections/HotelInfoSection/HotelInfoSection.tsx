import { 
  MapPinIcon, 
  InfoIcon, 
  ClockIcon, 
  PhoneIcon,
  GlobeIcon,
  StarIcon,
  CheckCircleIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";

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

interface HotelInfoSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
}

const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};

export const HotelInfoSection = ({ hotel, searchContext }: HotelInfoSectionProps): JSX.Element => {
  // Extract additional info from RateHawk data if available
  const ratehawkData = hotel.ratehawk_data?.static_vm;
  const hasExtendedInfo = !!ratehawkData;

  // Generate default description if none provided
  const displayDescription = hotel.description || 
    `${hotel.name} is a ${hotel.rating}-star hotel located in ${hotel.location}. ` +
    `With ${hotel.amenities.length > 0 ? hotel.amenities.length + ' amenities' : 'various facilities'} ` +
    `available, this hotel offers comfortable accommodation for your stay in ${searchContext.destination}.`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <InfoIcon className="w-5 h-5 mr-2 text-blue-600" />
          About This Hotel
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        
        {/* Hotel Description */}
        <div>
          <h4 className="font-medium text-app-accent mb-3">Hotel Description</h4>
          <p className="text-gray-700 leading-relaxed">
            {displayDescription}
          </p>
        </div>

        <Separator />

        {/* Hotel Details Grid */}
        <div>
          <h4 className="font-medium text-app-accent mb-4">Hotel Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Location Info */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-1">Location</div>
                <div className="text-sm text-gray-600">{hotel.location}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {searchContext.destination}
                </div>
              </div>
            </div>

            {/* Rating Info */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <StarIcon className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-1">Hotel Rating</div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-4 w-4 ${
                          i < hotel.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{hotel.rating} stars</span>
                </div>
              </div>
            </div>

            {/* Guest Reviews */}
            {hotel.reviewScore > 0 && (
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Guest Reviews</div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {hotel.reviewScore}/10
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {getRatingText(hotel.reviewScore)}
                    </span>
                  </div>
                  {hotel.reviewCount > 0 && (
                    <div className="text-xs text-gray-500">
                      Based on {hotel.reviewCount.toLocaleString()} reviews
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Check-in/Check-out */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <ClockIcon className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-1">Check-in / Check-out</div>
                <div className="text-sm text-gray-600">
                  Standard: 3:00 PM / 11:00 AM
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Times may vary - confirm with hotel
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional RateHawk Information */}
        {hasExtendedInfo && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-app-accent mb-4">Additional Information</h4>
              <div className="space-y-3">
                
                {/* Hotel Address */}
                {ratehawkData.address && (
                  <div className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Address: </span>
                      <span className="text-sm text-gray-600">{ratehawkData.address}</span>
                    </div>
                  </div>
                )}

                {/* Hotel City/Region */}
                {ratehawkData.city && (
                  <div className="flex items-start">
                    <GlobeIcon className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">City: </span>
                      <span className="text-sm text-gray-600">{ratehawkData.city}</span>
                    </div>
                  </div>
                )}

                {/* Hotel ID for Reference */}
                <div className="flex items-start">
                  <InfoIcon className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Hotel ID: </span>
                    <span className="text-sm text-gray-600 font-mono">{hotel.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Search Context Information */}
        <Separator />
        <div>
          <h4 className="font-medium text-app-accent mb-4">Your Search Details</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-900">Destination:</span>
                <div className="text-blue-700">{searchContext.destination}</div>
              </div>
              <div>
                <span className="font-medium text-blue-900">Search Date:</span>
                <div className="text-blue-700">
                  {new Date(searchContext.searchTimestamp).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="font-medium text-blue-900">Total Hotels Found:</span>
                <div className="text-blue-700">{searchContext.totalHotels}</div>
              </div>
              <div>
                <span className="font-medium text-blue-900">Available Hotels:</span>
                <div className="text-blue-700">{searchContext.availableHotels}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Policies */}
        <Separator />
        <div>
          <h4 className="font-medium text-app-accent mb-4">Hotel Policies</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">Cancellation: </span>
                <span className="text-gray-600">Free cancellation available on most bookings</span>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">Payment: </span>
                <span className="text-gray-600">Pay now or at the hotel - multiple options available</span>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">Confirmation: </span>
                <span className="text-gray-600">Instant booking confirmation via RateHawk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <InfoIcon className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-yellow-800 mb-1">Important Information</div>
              <div className="text-yellow-700 space-y-1">
                <div>• Hotel information is provided by RateHawk and subject to change</div>
                <div>• Room availability and prices are updated in real-time</div>
                <div>• Additional fees may apply for certain services and amenities</div>
                <div>• Please verify all details directly with the hotel before arrival</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};