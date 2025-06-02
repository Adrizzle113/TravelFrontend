import { Card, CardContent } from "../../../../components/ui/card";

// Define amenities data for mapping
const amenitiesData = [
  {
    icon: "/frame-19.svg",
    title: "Alamat",
    description: "Jakarta Pusat,\nno.201",
  },
  {
    icon: "/frame-24.svg",
    title: "Publik Transit",
    description: "Area strategis dekat dengan\ntransportasi masyarakat",
  },
  {
    icon: "/frame-19.svg",
    title: "Peta",
    description: "Memudahkan anda menycari\nalamat lewat G-Maps",
  },
  {
    icon: "/frame-22.svg",
    title: "Tempat parkir",
    description: "Tersedia area parkir yang luas",
  },
];

export const AmenitiesWrapperSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 bg-[#f3ecdc]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="font-normal text-[#073937] text-[27.9px] tracking-[-0.30px] leading-9">
            Peta map
          </h2>
        </div>

        <div className="w-full h-[478px] rounded-[20px] shadow-shadow-shape bg-[url(/image-4.png)] bg-cover bg-center mb-12" />

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-normal text-[#073937] text-[21.4px] tracking-[-0.18px] leading-[31.9px]">
              Hotel Indonesia
            </h3>
            <p className="max-w-md font-normal text-[#073937] text-[17.4px] tracking-[-0.04px] leading-[27.9px]">
              Selamat datang di "Hotel Indonesia" Hotel mewah di tengah jantung
              kota yang menawarkan pengalaman tinggal yang serba modern dan
              penuh kenyamanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenitiesData.map((amenity, index) => (
              <Card
                key={index}
                className="border-none bg-transparent shadow-none"
              >
                <CardContent className="flex items-start gap-4 p-0">
                  <div className="w-6 h-6 flex-shrink-0">
                    <img
                      className="w-full h-full"
                      alt={`${amenity.title} icon`}
                      src={amenity.icon}
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-normal text-[#073937] text-[15.6px] leading-6">
                      {amenity.title}
                    </h4>
                    <p className="font-normal text-[#073937] text-[14.9px] leading-6 whitespace-pre-line">
                      {amenity.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
