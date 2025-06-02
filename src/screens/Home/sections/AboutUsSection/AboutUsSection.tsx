
import { ArrowRightIcon, QuoteIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const AboutUsSection = (): JSX.Element => {
  // Data for the apartment images
  const apartmentImages = [
    { src: "/images/bedroom_interior.png", alt: "Modern bedroom interior" },
    { src: "/images/living_room_decor.png", alt: "Stylish living room decor" },
    { src: "/images/bedroom_interior.png", alt: "Contemporary apartment space" },
  ];

  return (
    <section className="relative w-full flex flex-col items-start gap-[35px] p-4 md:p-8 xl:p-[100px] bg-[#f3ecdc]">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 relative">
        <div className="flex flex-col items-start gap-5">
          <div className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            LAYANAN KAMI
          </div>

          <h2 className="font-heading-big font-[number:var(--heading-big-font-weight)] text-heading text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
            Apartemen impian dan ruangan yang modern.
          </h2>
        </div>

        <div className="hidden xl:flex items-center gap-2.5">
          <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            LIHAT SELENGKAPNYA
          </span>
          <ArrowRightIcon className="text-app-primary" size={20} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:flex xl:flex-row gap-[30px] relative">
        <Card className="md:col-span-3 xl:flex-1 relative bg-app-accent rounded-[30px] p-0 border-none overflow-hidden h-[300px]">
          <CardContent className="flex flex-col items-start gap-5 p-6 md:pl-[50px] md:pr-5 md:py-[35px] h-full">
            <QuoteIcon className="text-app-border text-xl md:text-3xl" />
            <p className="font-quote text-base md:text-lg text-[#ffffffbf] tracking-[var(--quote-letter-spacing)] leading-[var(--quote-line-height)]">
              &quot;Layanan apartemen paling terbaik di Indonesia, suka banget..
              &quot;
            </p>
            <h3 className="font-heading-standar text-xl text-[#f3ecdc] tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)]">
              Najwa Shihab
            </h3>
          </CardContent>
        </Card>

        {apartmentImages.map((image, index) => (
          <Card 
            key={index} 
            className="xl:flex-1 relative h-[300px] overflow-hidden border-[10px] border-solid border-[#f3ecdc] rounded-[30px]"
          >
            <CardContent className="absolute inset-0 p-0">
              <img
                className="w-full h-full object-cover"
                alt={image.alt}
                src={image.src}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="xl:hidden flex items-center gap-2.5 w-full justify-center">
        <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
          LIHAT SELENGKAPNYA
        </span>
        <ArrowRightIcon className="text-app-primary" size={20} />
      </div>

      <img
        className="hidden md:block w-[76px] h-[49px] absolute top-[508px] right-[67px] object-cover"
        alt="Dot smoke"
        src="/images/dot_smoke.svg"
      />
    </section>
  );
};
