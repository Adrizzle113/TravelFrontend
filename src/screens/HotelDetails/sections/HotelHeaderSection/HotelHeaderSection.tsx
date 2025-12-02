import { StarIcon, MapPinIcon, CalendarIcon, UsersIcon } from "lucide-react";
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

interface HotelHeaderSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
}

const getRatingText = (score: number): string => {
  if (!score || score <= 0) return "No Rating";
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};

const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'USD') return `$${amount.toLocaleString()}`;
  return `${amount.toLocaleString()} ${currency}`;
};

const getStayDuration = (checkin: string, checkout: string): number => {
  if (!checkin || !checkout) return 1;
  
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  return duration;
};

export const HotelHeaderSection = ({ hotel, searchContext }: HotelHeaderSectionProps): JSX.Element => {
  const duration = getStayDuration(searchContext.checkin, searchContext.checkout);

  // Ensure rating values are valid and within expected ranges
  const starRating = Math.max(0, Math.min(5, hotel.rating || 0));
  const guestReviewScore = Math.max(0, Math.min(10, hotel.reviewScore || 0));
  const reviewCount = Math.max(0, hotel.reviewCount || 0);

  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Hotel Info */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-heading-big text-app-accent mb-4">
              {hotel.name}
            </h1>
            
            {/* Rating and Reviews */}
            <div className="flex flex-wrap items-center gap-6 mb-4">
              {starRating > 0 && (
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < starRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-app-accent font-medium">
                    {starRating.toFixed(1)} stars
                  </span>
                </div>
              )}

              {guestReviewScore > 0 && (
                <div className="flex items-center">
                  <Badge variant="secondary" className="bg-app-primary text-white px-3 py-1">
                    {guestReviewScore.toFixed(1)}/10
                  </Badge>
                  <div className="ml-3">
                    <span className="text-app-accent font-medium">
                      {getRatingText(guestReviewScore)}
                    </span>
                    {reviewCount > 0 && (
                      <span className="text-gray-600 text-sm ml-1">
                        ({reviewCount.toLocaleString()} reviews)
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

            {/* Quick Price Display */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-700">Starting from</div>
                  <div className="text-2xl font-bold text-green-800">
                    {formatCurrency(hotel.price.amount, hotel.price.currency)}
                  </div>
                  <div className="text-sm text-green-600">
                    per {hotel.price.period}
                  </div>
                </div>
                {duration > 1 && (
                  <div className="text-right">
                    <div className="text-sm text-green-700">Total for {duration} nights</div>
                    <div className="text-xl font-bold text-green-800">
                      {formatCurrency(hotel.price.amount * duration, hotel.price.currency)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Search Context Card */}
          <Card className="bg-blue-50 border-blue-200">
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
                <span className="ml-1">Found among {searchContext.availableHotels} available hotels in {searchContext.destination}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};