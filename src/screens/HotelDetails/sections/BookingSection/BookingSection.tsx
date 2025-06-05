import { ExternalLinkIcon, CheckCircleIcon, CreditCardIcon, ShieldCheckIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
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

interface BookingSectionProps {
  hotel: any;
  searchContext: any;
  onBookNow: () => void;
  selectedRoom?: ProcessedRoom | null;
  selectedQuantity?: number;
}

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

export const BookingSection = ({ hotel, searchContext, onBookNow, selectedRoom }: BookingSectionProps): JSX.Element => {
  const duration = getStayDuration(searchContext.checkin, searchContext.checkout);
  
  // Use selected room price if available, otherwise use hotel default price
  const currentPrice = selectedRoom ? selectedRoom.price : hotel.price.amount;
  const currentCurrency = selectedRoom ? selectedRoom.currency : hotel.price.currency;
  const totalPrice = currentPrice * duration;

  return (
    <Card className="bg-white shadow-lg sticky top-24 h-fit">
      <CardContent className="p-6">
        
        {/* Selected Room Display */}
        {selectedRoom && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-2">Selected Room</div>
            <div className="space-y-1">
              <div className="font-medium text-blue-900">{selectedRoom.name}</div>
              <div className="text-sm text-blue-700">{selectedRoom.bedding} • {selectedRoom.occupancy}</div>
              <div className="text-sm text-blue-600">{selectedRoom.cancellation}</div>
            </div>
          </div>
        )}

        {/* Price Display */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-app-accent">
            {formatCurrency(currentPrice, currentCurrency)}
          </div>
          <div className="text-gray-600">per {hotel.price.period}</div>
          {selectedRoom && (
            <div className="text-sm text-blue-600 mt-1">
              {selectedRoom.name} rate
            </div>
          )}
        </div>
        
        {/* Total Price for Stay */}
        {duration > 1 && (
          <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Total for {duration} nights</div>
            <div className="text-2xl font-bold text-app-accent">
              {formatCurrency(totalPrice, currentCurrency)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Including taxes and fees
            </div>
            {selectedRoom && (
              <div className="text-xs text-blue-600 mt-1">
                {selectedRoom.name} × {duration} nights
              </div>
            )}
          </div>
        )}

        {/* Booking Dates Summary */}
        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <div className="text-xs font-medium text-blue-700 mb-2">Your Stay</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-600">Check-in</div>
              <div className="font-medium">{searchContext.checkin}</div>
            </div>
            <div>
              <div className="text-gray-600">Check-out</div>
              <div className="font-medium">{searchContext.checkout}</div>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-gray-600">Guests:</span>
            <span className="font-medium ml-1">{searchContext.guests}</span>
          </div>
        </div>
        
        {/* Main Booking Button */}
        <Button 
          onClick={onBookNow}
          className={`w-full py-3 text-lg mb-4 ${
            selectedRoom 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-app-primary hover:bg-app-primary/90 text-white'
          }`}
        >
          {selectedRoom ? `Book ${selectedRoom.name}` : 'Book Now'}
        </Button>
        
        {/* Booking Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm">
            <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700">Free cancellation available</span>
          </div>
          <div className="flex items-center text-sm">
            <CreditCardIcon className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700">Pay now or at the hotel</span>
          </div>
          <div className="flex items-center text-sm">
            <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700">Instant confirmation</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Additional Options */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://www.ratehawk.com', '_blank')}
            className="w-full text-sm"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            View on RateHawk
          </Button>
          
          <div className="text-center">
            <button className="text-xs text-gray-500 hover:text-app-primary transition-colors">
              Need help? Contact support
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-600">
              <div className="font-medium mb-1">Secure Booking</div>
              <div>Your payment information is encrypted and secure. Powered by RateHawk's trusted platform.</div>
            </div>
          </div>
        </div>

        {/* Price Breakdown (if available) */}
        {duration > 1 && (
          <details className="mt-4">
            <summary className="text-xs text-gray-600 cursor-pointer hover:text-app-primary">
              View price breakdown
            </summary>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Room rate ({duration} nights)</span>
                <span>{formatCurrency(currentPrice * duration, currentCurrency)}</span>
              </div>
              {selectedRoom && (
                <div className="flex justify-between text-blue-600">
                  <span>{selectedRoom.name}</span>
                  <span>{formatCurrency(selectedRoom.price, selectedRoom.currency)}/night</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & fees</span>
                <span>Included</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(totalPrice, currentCurrency)}</span>
              </div>
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
};