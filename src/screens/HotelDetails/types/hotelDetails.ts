// Shared types for HotelDetails sections

export interface Hotel {
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

export interface SearchContext {
  destination: string;
  destinationId: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalHotels: number;
  availableHotels: number;
  searchTimestamp: string;
}

export interface HotelData {
  hotel: Hotel;
  searchContext: SearchContext;
  allAvailableHotels: number;
  selectedFromPage: number;
}

export interface ImageData {
  src: string;
  alt: string;
}

// Common section props
export interface BaseSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
}

export interface HotelHeaderSectionProps extends BaseSectionProps {}

export interface ImageGallerySectionProps extends BaseSectionProps {
  images: ImageData[];
}

export interface BookingSectionProps extends BaseSectionProps {
  onBookNow: () => void;
}

export interface AmenitiesSectionProps extends BaseSectionProps {
  amenities: string[];
}

export interface HotelInfoSectionProps extends BaseSectionProps {}

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'USD') return `$${amount.toLocaleString()}`;
  return `${amount.toLocaleString()} ${currency}`;
};

export const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};

export const getStayDuration = (checkin: string, checkout: string): number => {
  if (!checkin || !checkout) return 1;
  
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  return duration;
};