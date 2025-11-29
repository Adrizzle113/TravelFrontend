// types/booking.ts

export interface GuestInfo {
  adults: number;
  children?: number;
}

export interface SearchInfo {
  checkin: string;
  checkout: string;
  guests: GuestInfo[];
}

export interface RoomOption {
  id: string;
  name: string;
  price: number;
    quantity?: number;
    totalPrice? : number
    
}

export interface HotelDetails {
  id: string;
  name: string;
  address?: string;
  images: string[];
  rooms: RoomOption[];
}

export interface BookingState {
  hotel: HotelDetails | null;
  selectedHotelRoom: RoomOption | null;
  search: SearchInfo | null;

  setHotel: (hotel: HotelDetails) => void;
  setSelectedHotelRoom: (room: RoomOption) => void;
  setSearchInfo: (search: SearchInfo) => void;
  resetBooking: () => void;
}
