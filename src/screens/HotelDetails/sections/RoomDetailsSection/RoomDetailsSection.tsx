import { StarIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

// Define facility data for mapping
const topFacilities = [
  {
    icon: "/frame-18.svg",
    text: "Pemanas ruangan dan ruang kerja",
  },
  {
    icon: "/frame-38.svg",
    text: "Ruangan Ber AC",
  },
  {
    icon: "/frame-30.svg",
    text: "Elevator",
  },
  {
    icon: "/frame-25.svg",
    text: "Layanan Tiap Saat",
  },
];

const sonderStandards = [
  {
    icon: "/frame-35.svg",
    text: "Chek-in Password",
  },
  {
    icon: "/frame-23.svg",
    text: "WIFI Cepat",
  },
  {
    icon: "/frame-33.svg",
    text: "Kebersihan Profesional",
  },
  {
    icon: "/frame-31.svg",
    text: "Perlengkapan Lengkap",
  },
];

export const RoomDetailsSection = (): JSX.Element => {
  return (
    <section className="w-full py-12 bg-[#f3ecdc]">
      <div className="container max-w-[1232px] mx-auto">
        <div className="flex flex-col gap-6">
          {/* Hotel Name */}
          <div className="flex flex-col">
            <h1 className="[font-family:'Abril_Fatface',Helvetica] font-normal text-[#073937] text-[45.2px] tracking-[-0.60px] leading-[56.2px]">
              Hotel Indonesia
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Rating, Location and Description */}
            <div className="flex flex-col w-full md:w-[580px] gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <StarIcon className="w-[18px] h-[18px] text-[#073937]" />
                  <span className="[font-family:'Inter',Helvetica] font-bold text-[#073937] text-[16.5px] tracking-[-0.04px] leading-[27.9px]">
                    4.3
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-lg tracking-[-0.04px] leading-[27.9px]">
                    /5
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[17.2px] tracking-[-0.04px] leading-[27.9px] ml-1">
                    Superb
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-lg tracking-[-0.04px] leading-[27.9px]">
                    (
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[16.5px] text-center tracking-[0] leading-[20.7px] underline">
                    999+ reviews
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-lg tracking-[-0.04px] leading-[27.9px]">
                    )
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="[font-family:'Inter',Helvetica] text-[#073937] text-[16.9px] tracking-[-0.04px] leading-[27.9px] font-normal">
                Jakarta Pusat
              </div>

              {/* Description */}
              <Card className="border-none shadow-none bg-transparent mt-4">
                <CardContent className="p-0">
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[17.4px] tracking-[-0.04px] leading-[27.9px]">
                    Selamat datang di "Hotel Indonesia" Hotel mewah di tengah
                    jantung kota yang menawarkan pengalaman tinggal yang serba
                    modern dan penuh kenyamanan. <br />
                    <br />
                    Dengan desain interior yang elegan, setiap kamar apartemen
                    kami dirancang untuk memadukan keindahan estetika dengan
                    fungsionalitas yang optimal.
                    <br />
                    <br />
                    Dari dapur berdesain mutakhir hingga kamar tidur yang
                    dilengkapi dengan teknologi terbaru, "Puncak Harmoni
                    Residence" memanjakan penghuninya dengan gaya hidup modern
                    yang tanpa kompromi.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Facilities */}
            <div className="flex flex-col md:flex-row gap-[79px] w-full md:w-[580px]">
              {/* Top Facilities */}
              <div className="flex flex-col gap-4">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[13.3px] tracking-[0.07px] leading-[20.0px]">
                  Fasilitas Teratas
                </h3>

                {topFacilities.map((facility, index) => (
                  <div
                    key={`facility-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6">
                      <img
                        className="w-6 h-6"
                        alt="Facility icon"
                        src={facility.icon}
                      />
                    </div>
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[15.5px] tracking-[0] leading-6">
                      {facility.text}
                    </span>
                  </div>
                ))}

                <a
                  href="#"
                  className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[13.5px] tracking-[0.07px] leading-[20.0px] underline"
                >
                  Lihat semua fasilitas
                </a>
              </div>

              {/* Sonder Standards */}
              <div className="flex flex-col gap-4">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[13.2px] tracking-[0.07px] leading-[20.0px]">
                  The Sonder standard
                </h3>

                {sonderStandards.map((standard, index) => (
                  <div
                    key={`standard-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6">
                      <img
                        className="w-6 h-6"
                        alt="Standard icon"
                        src={standard.icon}
                      />
                    </div>
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#073937] text-[15.6px] tracking-[0] leading-6">
                      {standard.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
