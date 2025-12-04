import { create } from "zustand";
import { BookingState, HotelDetails, RoomOption, SearchInfo } from "../types/booking";

export const useBookingStore = create<BookingState>((set) => ({
  hotel: null,
  selectedHotelRoom: null,
  search: null,
  bookingFormResponse: null,

  setHotel: (hotel: HotelDetails) => set(() => ({ hotel })),
  setSelectedHotelRoom: (room: RoomOption) =>
    set(() => ({ selectedHotelRoom: room })),
  setSearchInfo: (search: SearchInfo) => set(() => ({ search })),
  setBookingFormResponse: (response: any) =>
    set(() => ({ bookingFormResponse: response })),

  resetBooking: () =>
    set(() => ({
      hotel: null,
      selectedHotelRoom: null,
      search: null,
      bookingFormResponse: null,
    })),
}));
