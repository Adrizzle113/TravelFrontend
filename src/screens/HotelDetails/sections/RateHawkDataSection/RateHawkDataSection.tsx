import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Separator } from '../../../../components/ui/separator';

interface RateHawkDataSectionProps {
  ratehawkData: any;
  onRoomSelect?: (room: any, quantity: number) => void;
  selectedRoomId?: string;
  selectedQuantity?: number;
}

export const RateHawkDataSection: React.FC<RateHawkDataSectionProps> = ({ 
  ratehawkData, 
  onRoomSelect,
  selectedRoomId,
  selectedQuantity = 1
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(selectedRoomId || null);
  const [roomQuantity, setRoomQuantity] = useState(selectedQuantity);

  // Handle both data structures - direct rates array or nested in av_resp
  const rates = ratehawkData?.rates || ratehawkData?.av_resp?.[0]?.rates || [];

  if (!rates || rates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No room rates available</p>
      </div>
    );
  }

  const formatPrice = (amount: string | number, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(numAmount);
  };

  const getPaymentType = (paymentTypes: any[]) => {
    if (!paymentTypes || paymentTypes.length === 0) return 'N/A';
    const payment = paymentTypes[0];
    if (payment.type === 'now') {
      return `Pay Now (${payment.by || 'credit card'})`;
    }
    return 'Pay at Hotel';
  };

  const getMealType = (meals: string[]) => {
    if (!meals || meals.length === 0) return 'No meals included';
    return meals.map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)).join(', ');
  };

  const getBestPrice = (rate: any) => {
    if (!rate.payment_options?.payment_types) return null;
    
    // Find the lowest price among payment types
    const prices = rate.payment_options.payment_types
      .map((payment: any) => ({
        amount: parseFloat(payment.show_amount || payment.amount),
        currency: payment.show_currency_code || payment.currency_code,
        type: payment.type,
        by: payment.by
      }))
      .sort((a: any, b: any) => a.amount - b.amount);
    
    return prices[0];
  };

  const handleRoomSelect = (rate: any) => {
    const roomId = rate.hash;
    setSelectedRoom(roomId);
    
    if (onRoomSelect) {
      const bestPrice = getBestPrice(rate);
      const roomData = {
        id: roomId,
        name: rate.room_name,
        price: bestPrice?.amount || 0,
        currency: bestPrice?.currency || 'USD',
        paymentType: bestPrice?.type || 'hotel',
        occupancy: rate.occupancy,
        allotment: rate.allotment,
        meals: rate.meal,
        features: rate.features,
        cancellation: rate.cancellation_info?.policies?.[0]?.penalty?.percent 
          ? `${rate.cancellation_info.policies[0].penalty.percent}% cancellation fee`
          : 'Free cancellation available',
        originalRate: rate
      };
      onRoomSelect(roomData, roomQuantity);
    }
  };

  const handleQuantityChange = (newQuantity: number, rate: any) => {
    if (newQuantity < 1) return;
    setRoomQuantity(newQuantity);
    
    if (onRoomSelect) {
      handleRoomSelect(rate);
    }
  };

  return (
    <div className="space-y-4">
      {/* Room Cards */}
      {rates.map((rate: any, index: number) => {
        const bestPrice = getBestPrice(rate);
        const isSelected = selectedRoom === rate.hash;
        
        return (
          <div 
            key={rate.hash} 
            className={`border rounded-lg p-4 transition-all ${
              isSelected 
                ? 'border-green-500 bg-green-50 shadow-md' 
                : 'hover:shadow-md hover:border-gray-300'
            }`}
          >
            <div className="flex gap-4">
              {/* Room Image */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                <img 
                  src="/images/bedroom_interior.png" 
                  alt={rate.room_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Room Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{rate.room_name}</h3>
                    <p className="text-sm text-gray-600">
                      {rate.occupancy} Guests • {rate.bed_places?.main_count || 1} Bed
                      {rate.bed_places?.main_count > 1 ? 's' : ''} • Free WiFi
                    </p>
                    <p className="text-sm text-gray-600">
                      {getMealType(rate.meal)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">From</p>
                    <p className="text-lg font-bold text-green-600">
                      {bestPrice ? formatPrice(bestPrice.amount, bestPrice.currency) : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {rate.payment_options?.payment_types?.map((payment: any, pIndex: number) => (
                    <div key={pIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">
                        {payment.type === 'now' ? 'Pay Now' : 'Pay at Hotel'}
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatPrice(payment.show_amount || payment.amount, payment.show_currency_code || payment.currency_code)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Availability Warning */}
                {rate.allotment && rate.allotment <= 3 && (
                  <div className="mb-3">
                    <p className="text-sm text-red-600 font-medium">
                      Only {rate.allotment} available
                    </p>
                  </div>
                )}

                {/* Room Selection Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <select 
                      value={roomQuantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value), rate)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className={`${isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    onClick={() => handleRoomSelect(rate)}
                  >
                    {isSelected ? '✓ Selected' : 'Select Room'}
                  </Button>
                </div>

                {/* Features Badges */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {rate.features?.map((feature: any, fIndex: number) => (
                    <Badge key={fIndex} variant="outline" className="text-xs">
                      {feature.code}
                    </Badge>
                  ))}
                  {rate.serp_filters?.map((filter: string, fIndex: number) => (
                    <Badge key={fIndex} variant="outline" className="text-xs">
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Load More Button */}
      <div className="text-center pt-4">
        <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
          Load More Rooms (1 more)
        </Button>
      </div>
    </div>
  );
};
