import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Plus,
  ChevronDown,
  User,
  Loader2,
  Info,
  Check,
  Star,
  Utensils,
  RotateCcw,
  AlertCircle,
  Users,
} from "lucide-react";
import { countriesApi, Country, ratehawkApi } from "../../lib/api";

import { useBookingStore } from "../../store/bookingStore";
import { HotelData } from "../HotelDetails/types/hotelDetails";
import { useParams, useSearchParams } from "react-router-dom";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
}

interface BookingFormData {
  citizenship: string;
  guests: Guest[];
  specialRequests: string;
  phoneNumber: string;
  countryCode: string;
  groupOfClients: string;
  paymentMethod: string;
  clientPrice: string;
  commission: string;
  commissionType: "percentage" | "dollar";
  promoCode: string;
  payWithPoints: boolean;
}

// JSON Data Interfaces
interface TaxData {
  name: string;
  included_by_supplier: boolean;
  amount: string;
  currency_code: string;
}

interface CommissionInfo {
  amount_gross: string;
  amount_net: string;
  amount_commission: string;
}

interface PaymentType {
  amount: string;
  currency_code: string;
  is_need_credit_card_data: boolean;
  is_need_cvc: boolean;
  type: string;
  recommended_price: string | null;
}

interface HotelDetails {
  book_hash: string;
  match_hash: string;
  daily_prices: string[];
  meal: string;
  meal_data: {
    value: string;
    has_breakfast: boolean;
    no_child_meal: boolean;
  };
  payment_options: {
    payment_types: Array<{
      amount: string;
      show_amount: string;
      currency_code: string;
      show_currency_code: string;
      by: string | null;
      is_need_credit_card_data: boolean;
      is_need_cvc: boolean;
      type: string;
      vat_data: {
        included: boolean;
        applied: boolean;
        amount: string;
        currency_code: string;
        value: string;
      };
      tax_data: {
        taxes: TaxData[];
      };
      commission_info: {
        show: CommissionInfo;
        charge: CommissionInfo;
      };
      cancellation_penalties: {
        policies: Array<{
          start_at: string | null;
          end_at: string | null;
          amount_charge: string;
          amount_show: string;
          commission_info: {
            show: CommissionInfo;
            charge: CommissionInfo;
          };
        }>;
        free_cancellation_before: string;
      };
    }>;
  };
  room_name: string;
  room_data_trans: {
    main_room_type: string;
    main_name: string;
    bathroom: string | null;
    bedding_type: string;
    misc_room_type: string | null;
  };
  amenities_data: string[];
  any_residency: boolean;
}

interface BookingFormResponse {
  message: string;
  data: {
    hotelDetails: HotelDetails;
    bookingForm: {
      data: {
        order_id: number;
        partner_order_id: string;
        item_id: number;
        payment_types: PaymentType[];
        is_gender_specification_required: boolean;
        upsell_data: any[];
      };
      debug: any;
      status: string;
      error: string | null;
    };
  };
}

interface BookingSummary {
  hotelName: string;
  hotelAddress: string;
  rating: number;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  roomType: string;
  roomName: string;
  beddingType: string;
  adults: number;
  mealInfo: string;
  hasBreakfast: boolean;
  amenities: string[];
  freeCancellationDate: string;
  loyaltyPoints: number;
  taxes: TaxData[];
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    citizenship: "Togo",
    guests: [{ id: "1", firstName: "", lastName: "" }],
    specialRequests: "",
    phoneNumber: "",
    countryCode: "+39",
    groupOfClients: "",
    paymentMethod: "payment-deposit",
    clientPrice: "3.00",
    commission: "0",
    commissionType: "percentage",
    promoCode: "",
    payWithPoints: false,
  });
  const [searchParams] = useSearchParams();
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();
  
  // Get booking form response from Zustand store
  const { bookingFormResponse } = useBookingStore();
  
  // Log when booking form response is available
  useEffect(() => {
    if (bookingFormResponse) {
      console.log("✅ Booking form response loaded from store:", bookingFormResponse);
    } else {
      console.log("⚠️ No booking form response in store, using static JSON data");
    }
  }, [bookingFormResponse]);

  const loadHotelData = async () => {
    console.log("🏨 Loading hotel details for ID:", hotelId);
    setLoading(true);
    setError(null);

    if (!hotelId) {
      setError("Hotel ID is required");
      setLoading(false);
      return;
    }

    try {
      // First try to get data from localStorage
      const savedData = localStorage.getItem("selectedHotel");
      const searchedDataString = localStorage.getItem("searchedData");

      const { currency, residency } = searchedDataString
        ? JSON.parse(searchedDataString)
        : null;

      console.log("searchedData:", residency, currency);
      let hotelData: HotelData | null = null;

      if (savedData) {
        const parsedData: HotelData = JSON.parse(savedData);
        if (parsedData.hotel.id === hotelId) {
          console.log("✅ Found saved hotel data:", {
            hotelId: parsedData.hotel.id,
            hotelName: parsedData.hotel.name,
            destination: parsedData.searchContext.destination,
          });
          hotelData = parsedData;
        }
      }

      // Always fetch fresh data from the new API
      console.log("🔍 Fetching fresh hotel details from API...", currency);

      const favorites = JSON.parse(
        localStorage.getItem("favoriteHotels") || "[]"
      );
      setIsFavorite(favorites.includes(hotelId));
    } catch (err) {
      console.error("💥 Error loading hotel data:", err);
      setError("Failed to load hotel information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotelData();
  }, []);

  console.log(hotelData, "hotelDataaaaaaaaaaaa");

  useEffect(() => {
    const paymentType = formData.paymentMethod.replace("payment-", "");
    let currencies: { currency: string; amount: string }[] = [];

    if (paymentType === "deposit" || paymentType === "gross") {
      currencies = bookingFormResponse.data.bookingForm.data.payment_types
        ?.filter((pt) => pt.type === "deposit")
        .map((pt) => ({ currency: pt.currency_code, amount: pt.amount }));
    } else if (paymentType === "now") {
      currencies = bookingFormResponse.data.bookingForm.data.payment_types
        ?.filter((pt) => pt.type === "now")
        .map((pt) => ({ currency: pt.currency_code, amount: pt.amount }));
    }

    // Set first available currency when payment method changes
    if (currencies.length > 0) {
      setSelectedCurrency(currencies[0].currency);
    }
  }, [formData.paymentMethod]);

  // const getRoomData = () => {
  //   const rates = hotelData?.hotel.ratehawk_data.data.data.hotels[0].rates;
  //   console.log(roomId, "rates:", rates);
  //   if (!rates) return null;

  //   const selectedRoom = rates.find((item: any) => {
  //     return item?.book_hash === roomId;
  //   });

  //   return selectedRoom || null;
  // };
  // useEffect(() => {
  //   const selectedRoom = getRoomData();
  //   console.log("roomId:", roomId);

  //   console.log("Selected Room:", selectedRoom);
  // }, []);

  // Process the JSON data into booking summary

  const getBookingSummary = () => {
    const hotelData = bookingFormResponse?.data.hotelDetails;
    console.log("🚀 ~ getBookingSummary ~ hotelData ========================== :", bookingFormResponse?.data.bookingForm.data.payment_types)

    return {
      hotelName: hotelData.hotelName, // From search/hotel API
      hotelAddress: hotelData.hotelLocation, // From search/hotel API
      rating: 4, // From search/hotel API
      checkIn: hotelData.searchContext.checkin, // From search params
      checkOut: hotelData.searchContext.checkout, // From search params
      checkInTime: "from 16:00", // From hotel API
      checkOutTime: "until 11:00", // From hotel API
      roomType: hotelData?.selectedRoomData.originalRate.room_name,
      roomName: hotelData?.selectedRoomData.originalRate.room_data_trans?.main_name,
      beddingType: hotelData?.selectedRoomData.originalRate.room_data_trans?.bedding_type,
      adults: hotelData?.selectedRoomData.occupancy, 
      mealInfo: hotelData?.selectedRoomData.originalRate.meal_data?.value,
      hasBreakfast: hotelData?.selectedRoomData.originalRate.meal_data?.has_breakfast,
      amenities: hotelData?.selectedRoomData.originalRate.amenities_data,
      freeCancellationDate: hotelData?.selectedRoomData.originalRate.payment_options.payment_types[0].cancellation_penalties.free_cancellation_before ,
      loyaltyPoints: 2,
      taxes: hotelData?.selectedRoomData.originalRate.payment_options.payment_types[0].tax_data?.taxes,
    };
  };

  const [showSpecialRequests, setShowSpecialRequests] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);

  // Common country codes for phone numbers
  const countryCodes = [
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "+1", flag: "🇨🇦", name: "Canada" },
    { code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "+31", flag: "🇳🇱", name: "Netherlands" },
    { code: "+32", flag: "🇧🇪", name: "Belgium" },
    { code: "+41", flag: "🇨🇭", name: "Switzerland" },
    { code: "+43", flag: "🇦🇹", name: "Austria" },
    { code: "+45", flag: "🇩🇰", name: "Denmark" },
    { code: "+46", flag: "🇸🇪", name: "Sweden" },
    { code: "+47", flag: "🇳🇴", name: "Norway" },
    { code: "+358", flag: "🇫🇮", name: "Finland" },
    { code: "+7", flag: "🇷🇺", name: "Russia" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+64", flag: "🇳🇿", name: "New Zealand" },
    { code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "+54", flag: "🇦🇷", name: "Argentina" },
    { code: "+52", flag: "🇲🇽", name: "Mexico" },
    { code: "+27", flag: "🇿🇦", name: "South Africa" },
    { code: "+20", flag: "🇪🇬", name: "Egypt" },
    { code: "+234", flag: "🇳🇬", name: "Nigeria" },
    { code: "+228", flag: "🇹🇬", name: "Togo" },
  ];

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        setCountriesError(null);
        const { data } = await countriesApi.getCountries();
        setCountries(data.body || []);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountriesError("Failed to load countries. Please try again.");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCitizenshipChange = (value: string) => {
    setFormData((prev) => ({ ...prev, citizenship: value }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  const handleGroupOfClientsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, groupOfClients: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleClientPriceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, clientPrice: value }));
  };

  const handleCommissionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, commission: value }));
  };

  const handleCommissionTypeChange = (type: "percentage" | "dollar") => {
    setFormData((prev) => ({ ...prev, commissionType: type }));
  };

  const calculateCommissionAmount = () => {
    const price = parseFloat(formData.clientPrice) || 0;
    const commission = parseFloat(formData.commission) || 0;

    if (formData.commissionType === "percentage") {
      return ((price * commission) / 100).toFixed(2);
    } else {
      return commission.toFixed(2);
    }
  };

  const handlePromoCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, promoCode: value }));
  };

  const handlePayWithPointsChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, payWithPoints: checked }));
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  // Get available currencies for selected payment method
  const getAvailableCurrencies = () => {
    const paymentType = formData.paymentMethod.replace("payment-", "");

    if (paymentType === "deposit" || paymentType === "gross") {
      // Both use deposit type
      return bookingFormResponse.data.bookingForm.data.payment_types
        ?.filter((pt) => pt.type === "deposit")
        .map((pt) => ({ currency: pt.currency_code, amount: pt.amount }));
    } else if (paymentType === "now") {
      return bookingFormResponse.data.bookingForm.data.payment_types
        ?.filter((pt) => pt.type === "now")
        .map((pt) => ({ currency: pt.currency_code, amount: pt.amount }));
    }

    return [];
  };

  // Get amount for selected currency
  const getAmountForCurrency = () => {
    const currencies = getAvailableCurrencies();
    const selected = currencies.find((c) => c.currency === selectedCurrency);
    return selected ? selected.amount : "0.00";
  };

  const calculateTotalPrice = () => {
    return getAmountForCurrency();
  };

  const handleGuestChange = (
    guestId: string,
    field: "firstName" | "lastName",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.map((guest) =>
        guest.id === guestId ? { ...guest, [field]: value } : guest
      ),
    }));
  };

  const addOtherGuest = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
    };
    setFormData((prev) => ({
      ...prev,
      guests: [...prev.guests, newGuest],
    }));
  };

  const removeGuest = (guestId: string) => {
    if (formData.guests.length > 1) {
      setFormData((prev) => ({
        ...prev,
        guests: prev.guests?.filter((guest) => guest.id !== guestId),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Guest Information */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Information about guests
                </h2>

                {/* Guests' Citizenship Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Guests' citizenship
                  </label>
                  {loadingCountries ? (
                    <div className="flex items-center gap-2 h-9 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-500">
                        Loading countries...
                      </span>
                    </div>
                  ) : countriesError ? (
                    <div className="text-sm text-red-500 mb-2">
                      {countriesError}
                    </div>
                  ) : (
                    <Select
                      value={formData.citizenship}
                      onValueChange={handleCitizenshipChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select citizenship" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Room Details */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-medium">
                      {bookingFormResponse?.data.hotelDetails.selectedRoomData.originalRate.room_name} for {bookingFormResponse?.data.hotelDetails.selectedRoomData.occupancy} adults
                    </p>
                    <span className="text-gray-500 text-sm">Room 1</span>
                  </div>
                </div>

                {/* Guest Name Fields */}
                <div className="space-y-6">
                  {formData.guests.map((guest) => (
                    <div
                      key={guest.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Guest's name*
                        </label>
                        <Input
                          value={guest.firstName}
                          onChange={(e) =>
                            handleGuestChange(
                              guest.id,
                              "firstName",
                              e.target.value
                            )
                          }
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Guest's last name*
                        </label>
                        <Input
                          value={guest.lastName}
                          onChange={(e) =>
                            handleGuestChange(
                              guest.id,
                              "lastName",
                              e.target.value
                            )
                          }
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                      {formData.guests.length > 1 && (
                        <div className="md:col-span-2 flex justify-end">
                          <button
                            onClick={() => removeGuest(guest.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove guest
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Other Guests */}
                <div className="mt-6">
                  <button
                    onClick={addOtherGuest}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <Plus className="h-3 w-3" />
                    <span>Add names of other guests</span>
                  </button>
                </div>

                {/* Special Requests Section */}
                <div className="mt-8">
                  <button
                    onClick={() => setShowSpecialRequests(!showSpecialRequests)}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showSpecialRequests ? "rotate-180" : ""
                      }`}
                    />
                    <span>Special requests</span>
                  </button>

                  {showSpecialRequests && (
                    <div className="mt-4">
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            specialRequests: e.target.value,
                          }))
                        }
                        placeholder="Enter any special requests..."
                        className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Booking Details Section */}
            <Card className="bg-white border-0 shadow-sm mt-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Booking details
                </h2>

                {/* Your Phone Number Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-600">
                      Your phone number
                    </label>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex gap-3">
                    {/* Country Code Dropdown */}
                    <div className="w-32">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Country code*
                      </label>
                      <Select
                        value={formData.countryCode}
                        onValueChange={handleCountryCodeChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem
                              key={`${country.code}-${country.name}`}
                              value={country.code}
                            >
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Phone number*
                      </label>
                      <Input
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handlePhoneNumberChange(e.target.value)
                        }
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Group of Clients Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-600">
                      Group of clients
                    </label>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>

                  <Select
                    value={formData.groupOfClients}
                    onValueChange={handleGroupOfClientsChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not chosen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="couple">Couple</SelectItem>
                      <SelectItem value="friends">Friends</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Section */}
            <Card className="bg-white border-0 shadow-sm mt-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Payment method
                </h2>

                <div className="space-y-4">
                  {/* Payment Options */}
                  {(() => {
                    // Get currencies from JSON
                    const depositCurrencies = 
                      bookingFormResponse?.data.bookingForm.data.payment_types
                        ?.filter((pt) => pt.type === "deposit")
                        .map((pt) => pt.currency_code);

                    const nowCurrencies =
                    bookingFormResponse?.data.bookingForm.data.payment_types
                        ?.filter((pt) => pt.type === "now")
                        .map((pt) => pt.currency_code);

                    const paymentOptions = [
                      {
                        id: "deposit",
                        title: "Book now, pay later",
                        description:
                          "After booking, you can create an invoice and pay via bank transfer, or bank card, or payment link directly in your account. Please remember that bookings and invoices paid by bank card are not going to be indicated in closing documents.",
                        currencies: depositCurrencies,
                      },
                      {
                        id: "now",
                        title: "Pay now by bank card (NET)",
                        description:
                          "The cost of the booking will be charged to the bank card you provided during the reservation.",
                        currencies: nowCurrencies,
                      },
                      {
                        id: "gross",
                        title: "Pay now by client's card (GROSS)",
                        description:
                          "Used for payment by the client's bank card. The amount that you enter below, in the Client price and the commission section, will be withdrawn from the specified card, then, according to the contract terms and conditions, you'll get the commission.",
                        currencies: depositCurrencies,
                      },
                    ];

                    return paymentOptions.map((option) => {
                      const isSelected =
                        formData.paymentMethod === `payment-${option.id}`;
                      const displayCurrencies = option?.currencies?.slice(0, 3);
                      const remainingCount = option?.currencies?.length - 3;

                      return (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-yellow-400 bg-yellow-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            handlePaymentMethodChange(`payment-${option.id}`)
                          }
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                                isSelected
                                  ? "border-yellow-500 bg-yellow-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800 mb-1">
                                {option.title}
                              </h3>
                              <div className="flex gap-2 mb-2 flex-wrap items-center">
                                {displayCurrencies.map((currency, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    {currency}
                                  </span>
                                ))}
                                {remainingCount > 0 && (
                                  <div className="relative group">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded cursor-help">
                                      +{remainingCount} currencies
                                    </span>
                                    {/* Hover tooltip */}
                                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-10 bg-gray-800 text-white p-3 rounded-lg shadow-lg min-w-[200px]">
                                      <div className="flex flex-wrap gap-2">
                                        {option.currencies
                                          .slice(3)
                                          .map((currency, idx) => (
                                            <span
                                              key={idx}
                                              className="px-2 py-1 bg-gray-700 text-white text-xs rounded"
                                            >
                                              {currency}
                                            </span>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}

                  {/* Option 4: Pay to the accommodation facility (disabled) */}
                  <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-400 mb-1">
                          Pay to the accommodation facility
                        </h3>
                        <p className="text-sm text-gray-400">
                          This payment method is only available for the rates
                          with the corresponding payment conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Price and Commission Section */}
            <Card className="bg-white border-0 shadow-sm mt-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Client price and the commission
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Enter the client price. This price will be saved in your back
                  office in the booking data for informational purposes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Price Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client price
                    </label>
                    <div className="relative">
                      <Input
                        value={formData.clientPrice}
                        onChange={(e) =>
                          handleClientPriceChange(e.target.value)
                        }
                        className="pr-8 text-lg font-semibold"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">
                        $
                      </span>
                    </div>
                  </div>

                  {/* Commission Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commission
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value={formData.commission}
                          onChange={(e) =>
                            handleCommissionChange(e.target.value)
                          }
                          className="pr-12 text-lg"
                          placeholder="0"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                          <span className="text-sm text-gray-600">
                            {formData.commissionType === "percentage"
                              ? "%"
                              : "$"}
                          </span>
                          {formData.commissionType === "percentage" && (
                            <span className="text-xs text-gray-500">
                              ≈ {calculateCommissionAmount()} $
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Commission Type Toggle */}
                      <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            handleCommissionTypeChange("percentage")
                          }
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                            formData.commissionType === "percentage"
                              ? "bg-gray-200 text-gray-800"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          %
                        </button>
                        <button
                          onClick={() => handleCommissionTypeChange("dollar")}
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                            formData.commissionType === "dollar"
                              ? "bg-gray-200 text-gray-800"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          $
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completion Indicator and Book Now Button */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">This is the last step!</span>
                  </div>

                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-8 py-3 text-lg"
                    onClick={() => {
                      // Handle booking completion
                      console.log("Booking completed:", formData);
                    }}
                  >
                    Book now
                  </Button>
                </div>

                {/* Final Confirmation Message */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Click to complete your booking and receive confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Booking Summary */}
          <div className="lg:col-span-1">
            {(() => {
              const summary = getBookingSummary();
              return (
                <Card className="bg-white border-0 shadow-sm sticky top-8">
                  {/* Hotel Header */}
                  <div className="bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < summary.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">
                      {summary.hotelName}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {summary.hotelAddress}
                    </p>
                  </div>

                  <CardContent className="p-4">
                    {/* Check-in/Check-out */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Check-in
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {summary.checkIn}
                        </p>
                        <p className="text-xs text-gray-500">
                          {summary.checkInTime}
                        </p>
                      </div>
                      <div className="w-px h-12 bg-gray-300"></div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                          Check-out
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {summary.checkOut}
                        </p>
                        <p className="text-xs text-gray-500">
                          {summary.checkOutTime}
                        </p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2 mb-4">
                      {summary.hasBreakfast && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Utensils className="h-4 w-4" />
                          <span className="text-sm">Breakfast included</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-green-600">
                        <RotateCcw className="h-4 w-4" />
                        <span className="text-sm">
                          Free cancellation before{" "}
                          {summary.freeCancellationDate
                            ? new Date(
                                summary.freeCancellationDate
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })
                            : "N/A"}
                          !
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Important information</span>
                      </div>
                      {/* Display amenities from JSON */}
                      {summary?.amenities?.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-sm capitalize">
                            {amenity.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Room Details */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-800">
                        {summary.roomType}
                      </p>
                      <p className="text-sm text-gray-600">
                        {summary.beddingType}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {summary.roomName}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {summary.adults} adults
                        </span>
                      </div>
                      {/* Meal Information */}
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {summary.mealInfo === "nomeal"
                            ? "No meal included"
                            : summary.mealInfo}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mb-4">
                      <Input
                        value={formData.promoCode}
                        onChange={(e) => handlePromoCodeChange(e.target.value)}
                        placeholder="Enter promo code"
                        className="border-dashed border-yellow-400 focus:border-yellow-500"
                      />
                    </div>

                    {/* Pay with Points */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.payWithPoints}
                          onChange={(e) =>
                            handlePayWithPointsChange(e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Pay with points
                        </span>
                      </div>
                      <Select defaultValue="choose">
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="choose">Choose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Payment Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">Currency</p>
                          <Select
                            value={selectedCurrency}
                            onValueChange={handleCurrencyChange}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableCurrencies().map((curr, idx) => (
                                <SelectItem key={idx} value={curr.currency}>
                                  {curr.currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Payment total</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {selectedCurrency} {calculateTotalPrice()}
                          </p>
                        </div>
                      </div>

                      {/* Included in the price */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Included in the price:
                        </p>
                        <div className="space-y-1">
                          {summary?.taxes
                            ?.filter((tax) => tax.included_by_supplier)
                            .map((tax, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-600 capitalize">
                                  {tax.name.replace("_", " ")}
                                </span>
                                <span className="text-gray-800">
                                  {tax.currency_code} {tax.amount}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* To pay upon arrival */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-red-600 mb-2">
                          To pay upon arrival (not included in the price):
                        </p>
                        <div className="space-y-1">
                          {summary?.taxes
                            ?.filter((tax) => !tax.included_by_supplier)
                            .map((tax, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-red-600 capitalize">
                                  {tax.name.replace("_", " ")}
                                </span>
                                <span className="text-red-600">
                                  {tax.currency_code} {tax.amount}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Loyalty Points */}
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            P
                          </span>
                        </div>
                        <span className="text-sm">
                          You will get {summary.loyaltyPoints} points
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
