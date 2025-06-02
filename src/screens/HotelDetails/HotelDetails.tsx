
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { AmenitiesWrapperSection } from "./sections/AmenitiesWrapperSection/AmenitiesWrapperSection";
import { ImageGallerySection } from "./sections/ImageGallerySection/ImageGallerySection";
import { ImageGalleryWrapperSection } from "./sections/ImageGalleryWrapperSection";
import { RoomDetailsSection } from "./sections/RoomDetailsSection/RoomDetailsSection";
import { RoomDetailsWrapperSection } from "./sections/RoomDetailsWrapperSection/RoomDetailsWrapperSection";

export const HotelDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <RoomDetailsSection />
      <ImageGallerySection />
      <ImageGalleryWrapperSection />
      <RoomDetailsWrapperSection />
      <AmenitiesSection />
      <AmenitiesWrapperSection />
    </div>
  );
};
