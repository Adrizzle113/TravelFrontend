import { RateHawkHotel, FilterState } from '../types';

export const applyFilters = (hotels: RateHawkHotel[], filters: FilterState): RateHawkHotel[] => {
  let filteredHotels = [...hotels];

  // Filter by hotel name
  if (filters.hotelName.trim()) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.name.toLowerCase().includes(filters.hotelName.toLowerCase())
    );
  }

  // Filter by star rating
  if (filters.starRating.length > 0) {
    filteredHotels = filteredHotels.filter(hotel =>
      filters.starRating.includes(hotel.rating.toString())
    );
  }

  // Filter by price range
  const [minPrice, maxPrice] = filters.priceRange;
  filteredHotels = filteredHotels.filter(hotel =>
    hotel.price.amount >= minPrice && hotel.price.amount <= maxPrice
  );

  // Filter by reviews rating
  if (filters.reviewsRating.length > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      return filters.reviewsRating.some(rating => hotel.reviewScore >= parseInt(rating));
    });
  }

  // Filter by amenities (hotel facilities)
  if (filters.hotelFacilities.length > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      const hotelAmenities = hotel.amenities.map(a => a.toLowerCase());
      return filters.hotelFacilities.some(facility => {
        const facilityName = facility.replace('has_', '').replace(/_/g, ' ').toLowerCase();
        return hotelAmenities.some(amenity => amenity.toLowerCase().includes(facilityName));
      });
    });
  }

  // Apply sorting (preserve order for popularity, sort for others)
  if (filters.sortBy !== 'popularity') {
    filteredHotels.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price.amount - b.price.amount;
        case 'price-high':
          return b.price.amount - a.price.amount;
        case 'rating':
          return b.reviewScore - a.reviewScore;
        default:
          return 0;
      }
    });
  }

  return filteredHotels;
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const numericAmount = Number(amount) || 0;
  if (currency === 'USD') {
    return `$${numericAmount}`;
  }
  return `${numericAmount} ${currency}`;
};

export const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};