import { Card, CardContent } from "../../../../components/ui/card";

export const AmenitiesSection = (): JSX.Element => {
  // Amenity icons data for the green card
  const amenityIcons = [
    { icon: "/frame-15.svg", label: "Chek-in Password" },
    { icon: "/frame-23.svg", label: "WIFI Cepat" },
    { icon: "/frame-10.svg", label: "Kebersihan Profesional" },
    { icon: "/frame-11.svg", label: "Lengkap" },
    { icon: "/frame-29.svg", label: "Konsultasi" },
    { icon: "/frame-17.svg", label: "Coffee hangat" },
    { icon: "/frame-26.svg", label: "Tempat tidur\nNyaman" },
    { icon: "/frame-16.svg", label: "Tersedia air\nhangat" },
  ];

  // Building area facilities data
  const buildingFacilities = [
    { icon: "/frame-38.svg", label: "Ruangan Ber AC" },
    { icon: "/frame-37.svg", label: "Penitipan Anak" },
    { icon: "/frame-30.svg", label: "Elevator" },
    { icon: "/frame-25.svg", label: "Tersedia Layanan" },
    { icon: "/frame-40.svg", label: "Penitipan Barang" },
    { icon: "/frame-18.svg", label: "Pemanas ruangan dan ruang kerja" },
  ];

  return (
    <section className="w-full bg-[#f3ecdc] py-8 px-4 md:px-24 lg:px-[102px]">
      <header className="mb-6">
        <h2 className="font-normal text-[#073937] text-[27.9px] tracking-[-0.30px] leading-9">
          Fasilitas pada Hotel Indonesia
        </h2>
      </header>

      <Card className="w-full bg-[#588157] rounded-[15px] border-none text-[#f3ecdc]">
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-[21.8px] text-center tracking-[-0.18px] leading-[31.9px]">
              Layanan kami mulai
            </h3>
            <p className="text-[15.1px] text-center leading-6 max-w-xl">
              Bekerja, bersantai, dan hidup. Tempat kami memiliki semua
              perlengkapan penting yang Anda perlukan untuk masa menginap Anda.
            </p>
          </div>

          <div className="flex flex-wrap justify-between gap-y-4">
            {amenityIcons.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center w-[54px]">
                <div className="flex items-center justify-center h-9">
                  <img
                    className="h-9"
                    alt={`${amenity.label} icon`}
                    src={amenity.icon}
                  />
                </div>
                <p className="text-center text-xs sm:text-sm mt-1.5 whitespace-pre-line">
                  {amenity.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 my-8">
        <img
          className="w-full md:w-1/2 h-[411px] object-cover"
          alt="Hotel building exterior"
          src="/rectangle-1010.svg"
        />
        <img
          className="w-full md:w-1/2 h-[411px] object-cover"
          alt="Hotel interior"
          src="/rectangle-1011.svg"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-normal text-[#073937] text-[13.7px] tracking-[0.07px] leading-[20.0px] mb-2">
          Fasilitas Pada Area Bangunan
        </h3>

        <div className="flex flex-wrap gap-y-4 gap-x-8 md:gap-x-[119px]">
          {buildingFacilities.map((facility, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-6 h-6">
                <img
                  className="w-6 h-6"
                  alt={`${facility.label} icon`}
                  src={facility.icon}
                />
              </div>
              <span className="font-normal text-[#073937] text-base leading-6">
                {facility.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
