import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Carousel } from "../../../../components/ui/carousel";

const galleryImages = [
  {
    src: "/images/bedroom_interior.png",
    alt: "Modern bedroom interior",
  },
  {
    src: "/images/living_room_decor.png",
    alt: "Living room decor",
  },
  {
    src: "/images/cozy_living_space.png",
    alt: "Cozy living space",
  },
  {
    src: "/images/Header.png",
    alt: "Header image",
  },
];

export const PortfolioSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[35px] py-[100px] px-4 md:px-[100px] relative bg-[#f3ecdc] w-full">
      <div className="flex flex-col w-full max-w-[720px] gap-5 items-center relative">
        <p className="font-accent text-app-secondary text-center">
          GALERI RUANGAN APARTEMEN TERBAIK
        </p>
        <h2 className="font-heading-big text-heading text-center">
          Galeri Apartemen Di Indonesia
        </h2>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1240px] group">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-[30px] aspect-square transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden w-full">
        <Carousel
          images={galleryImages}
          className="aspect-square rounded-[30px]"
        />
      </div>

      <div className="flex items-center gap-2.5 mt-5">
        <span className="font-accent text-heading text-center">
          LIHAT RUANGAN LAINNYA
        </span>
        <Button variant="link" className="flex items-center gap-2.5 p-0">
          <span className="font-accent text-app-primary">
            LIHAT SELENGKAPNYA
          </span>
          <ArrowRightIcon className="w-5 h-5 text-app-primary" />
        </Button>
      </div>
    </section>
  );
};
