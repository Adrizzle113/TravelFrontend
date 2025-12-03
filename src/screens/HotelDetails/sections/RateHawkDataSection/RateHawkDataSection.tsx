import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

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
  selectedQuantity = 1,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(
    selectedRoomId || null
  );
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>(
    {}
  );

  // Handle the new API response format from res.json
  // The data structure is: data.data.hotels[0].rates[]
  const rates =
    ratehawkData?.data?.data?.hotels?.[0]?.rates ||
    ratehawkData?.rates ||
    ratehawkData?.av_resp?.[0]?.rates ||
    [];
  console.log("🚀 ~ RateHawkDataSection ~ rates ============== :", rates);

  if (!rates || rates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No room rates available</p>
      </div>
    );
  }

  const formatPrice = (amount: string | number, currency: string) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(numAmount);
  };

  const getPaymentType = (paymentTypes: any[]) => {
    if (!paymentTypes || paymentTypes.length === 0) return "N/A";
    const payment = paymentTypes[0];
    if (payment.type === "now") {
      return `Pay Now (${payment.by || "credit card"})`;
    }
    return "Pay at Hotel";
  };

  const getMealType = (mealData: any) => {
    if (!mealData) return "No meals included";

    // Handle new format with meal_data object
    if (typeof mealData === "object" && mealData.has_breakfast) {
      return "Breakfast included";
    }

    // Handle old format with string array
    if (Array.isArray(mealData)) {
      return mealData
        .map((meal) => meal.charAt(0).toUpperCase() + meal.slice(1))
        .join(", ");
    }

    // Handle string format
    if (typeof mealData === "string") {
      return mealData.charAt(0).toUpperCase() + mealData.slice(1);
    }

    return "No meals included";
  };

  const getBestPrice = (rate: any) => {
    if (!rate.payment_options?.payment_types) return null;

    // Find the lowest price among payment types
    const prices = rate.payment_options.payment_types
      .map((payment: any) => ({
        amount: parseFloat(payment.show_amount || payment.amount),
        currency: payment.show_currency_code || payment.currency_code,
        type: payment.type,
        by: payment.by,
      }))
      .sort((a: any, b: any) => a.amount - b.amount);

    return prices[0];
  };

  const handleRoomSelect = (rate: any) => {
    // Use book_hash as the room ID for the new format
    const roomId = rate.book_hash || rate.hash || `room-${Math.random()}`;
    setSelectedRoom(roomId);
    setRoomQuantities((prev) => ({
      ...prev,
      [roomId]: 1,
    }));
    if (onRoomSelect) {
      const bestPrice = getBestPrice(rate);
      const roomData = {
        id: roomId,
        name: rate.room_name,
        price: bestPrice?.amount || 0,
        currency: bestPrice?.currency || "USD",
        paymentType: bestPrice?.type || "deposit",
        occupancy: rate.rg_ext?.capacity || 2,
        allotment: rate.allotment,
        meals: rate.meal,
        features: rate.amenities_data || rate.features || [],
        cancellation: rate.payment_options?.payment_types?.[0]
          ?.cancellation_penalties?.free_cancellation_before
          ? `Free cancellation until ${new Date(
              rate.payment_options.payment_types[0].cancellation_penalties.free_cancellation_before
            ).toLocaleDateString()}`
          : "Cancellation policy varies",
        originalRate: rate,
      };
      const selectedQuantity = roomQuantities[roomId] || 1;
      onRoomSelect(roomData, selectedQuantity);
    }
  };

  const handleQuantityChange = (
    roomId: string,
    newQuantity: number,
    rate: any
  ) => {
    console.log(newQuantity, "arg1", rate, "rateraterate");
    if (newQuantity < 1) return;
    setRoomQuantities((prev) => ({
      ...prev,
      [roomId]: newQuantity,
    }));

    if (onRoomSelect && selectedRoom === roomId) {
      handleRoomSelect(rate);
    }
  };

  return (
    <div className="space-y-4">
      {/* Room Cards */}
      {rates.map((rate: any, index: number) => {
        console.log(rate);
        const bestPrice = getBestPrice(rate);
        const roomId = rate.book_hash || rate.hash || `room-${index}`;
        const isSelected = selectedRoom === roomId;

        return (
          <div
            key={roomId}
            className={`border rounded-lg p-4 transition-all ${
              isSelected
                ? "border-green-500 bg-green-50 shadow-md"
                : "hover:shadow-md hover:border-gray-300"
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
                    <h3 className="font-semibold text-lg text-gray-900">
                      {rate.room_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {rate.rg_ext?.capacity || 2} Guests •{" "}
                      {rate.rg_ext?.bedrooms || 0} Bedroom
                      {(rate.rg_ext?.bedrooms || 0) > 1 ? "s" : ""} •{" "}
                      {rate.rg_ext?.bathroom || 1} Bathroom
                      {(rate.rg_ext?.bathroom || 1) > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getMealType(rate.meal_data)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">From</p>
                    <p className="text-lg font-bold text-green-600">
                      {parseFloat(rate?.daily_prices?.[0]).toFixed(0)}{" "}
                      {rate?.payment_options?.payment_types?.[0]
                        ?.currency_code || ""}
                    </p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {rate.payment_options?.payment_types?.map(
                    (payment: any, pIndex: number) => (
                      <div
                        key={pIndex}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-600">
                          {payment.type === "now" ? "Pay Now" : "Pay at Hotel"}
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatPrice(
                            payment.show_amount || payment.amount,
                            payment.show_currency_code || payment.currency_code
                          )}
                        </span>
                      </div>
                    )
                  )}
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
                    <span className="text-sm font-medium text-gray-700">
                      Quantity:
                    </span>
                    <select
                      value={roomQuantities[roomId] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          roomId,
                          parseInt(e.target.value),
                          rate
                        )
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option
                          key={num}
                          value={num}
                          disabled={rate.allotment && num > rate.allotment}
                        >
                          {num} Room{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    size="sm"
                    className={`${
                      isSelected
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() => handleRoomSelect(rate)}
                  >
                    {isSelected ? "✓ Selected" : "Select Room"}
                  </Button>
                </div>

                {/* Features Badges */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {rate.amenities_data?.map(
                    (amenity: string, fIndex: number) => (
                      <Badge key={fIndex} variant="outline" className="text-xs">
                        {amenity
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    )
                  )}
                  {rate.serp_filters?.map((filter: string, fIndex: number) => (
                    <Badge key={fIndex} variant="outline" className="text-xs">
                      {filter
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                  {rate.room_data_trans?.bedding_type && (
                    <Badge variant="outline" className="text-xs">
                      {rate.room_data_trans.bedding_type}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Load More Button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          className="text-green-600 border-green-600 hover:bg-green-50"
        >
          Load More Rooms (1 more)
        </Button>
      </div>
    </div>
  );
};
