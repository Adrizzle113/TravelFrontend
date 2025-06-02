import { Card, CardContent } from "../../../../components/ui/card";

export const HotelListSection = (): JSX.Element => {
  // Data for hotel images
  const hotelImages = [
    {
      id: 1,
      src: "/rectangle-4.png",
      alt: "Luxury villa with pool",
    },
    {
      id: 2,
      src: "/rectangle-5.png",
      alt: "Beachfront pool area",
    },
    {
      id: 3,
      src: "/rectangle-6.png",
      alt: "Resort with mountain view",
    },
    {
      id: 4,
      src: "/rectangle-7.png",
      alt: "Palm trees by pool at sunset",
    },
  ];

  return (
    <section className="w-full py-12 bg-[#f3ecdc]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-[18px] mb-12">
          <h3 className="opacity-80 font-semibold text-[15.4px] leading-[24.7px] tracking-[0] text-[#0e1629] font-['Open_Sans',Helvetica]">
            FITUR
          </h3>
          <h2 className="text-5xl tracking-[2.40px] leading-normal text-[#0e1629] font-['Merriweather',Helvetica] font-normal max-w-[840px]">
            Kenyamanan &amp; Kemewahan dalam Satu Pengalaman
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 relative">
          {/* First column - 2 images stacked */}
          <div className="col-span-4 flex flex-col gap-4">
            <Card className="rounded-none border-0 overflow-hidden">
              <CardContent className="p-0">
                <img
                  className="w-full h-[331px] object-cover"
                  alt={hotelImages[0].alt}
                  src={hotelImages[0].src}
                />
              </CardContent>
            </Card>
            <Card className="rounded-none border-0 overflow-hidden">
              <CardContent className="p-0">
                <img
                  className="w-full h-[304px] object-cover"
                  alt={hotelImages[1].alt}
                  src={hotelImages[1].src}
                />
              </CardContent>
            </Card>
          </div>

          {/* Middle column - large image and text overlay */}
          <div className="col-span-5 relative">
            <Card className="rounded-none border-0 overflow-hidden">
              <CardContent className="p-0">
                <img
                  className="w-full h-[462px] object-cover"
                  alt={hotelImages[2].alt}
                  src={hotelImages[2].src}
                />
              </CardContent>
            </Card>
            <div className="absolute bottom-0 left-0 right-0 bg-[#588157] p-6">
              <p className="text-[31.9px] text-[#f3ecdc] font-['Abril_Fatface',Helvetica] font-normal leading-normal">
                Kami Memberikan Hasil Layanan Terbaik Untuk Penginapan Anda
              </p>
            </div>
          </div>

          {/* Last column - tall image */}
          <div className="col-span-3">
            <Card className="rounded-none border-0 overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <img
                  className="w-full h-[604px] object-cover"
                  alt={hotelImages[3].alt}
                  src={hotelImages[3].src}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
