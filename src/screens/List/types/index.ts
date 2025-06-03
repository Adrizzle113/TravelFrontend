export interface RateHawkHotel {
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

export interface FilterState {
  sortBy: string;
  hotelName: string;
  starRating: string[];
  currency: string;
  meals: string[];
  payment: string[];
  distanceRange: number[];
  priceRange: number[];
  reviewsRating: string[];
  hotelFacilities: string[];
  roomFacilities: string[];
  accommodationFeatures: string[];
  green: string[];
  propertyTypes: string[];
}

export interface SearchInfo {
  destination: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalHotels: number;
  availableHotels: number;
}

export interface SearchParams {
  destination: string;
  destinationId: string;
  checkin: string;
  checkout: string;
  guests: number;
  rooms: number;
  formattedGuests: Array<{adults: number}>;
}