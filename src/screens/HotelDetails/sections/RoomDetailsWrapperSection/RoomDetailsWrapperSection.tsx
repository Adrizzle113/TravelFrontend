import { BathIcon, BedIcon, SquareIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Room data for mapping
const roomData = [
  {
    id: 1,
    name: "Single Room",
    image: "/rectangle-1009-1.svg",
    features: [
      { icon: BedIcon, text: "1 Tempat tidur" },
      { icon: UsersIcon, text: "1 Pengunjung" },
      { icon: BathIcon, text: "1 Kamar mandi" },
      { icon: SquareIcon, text: "67 Sq ft" },
    ],
    amenities: [
      ["Twin bed", "Air Conditioning", "Television"],
      ["Cable TV", "Streaming device"],
    ],
    price: "Rp. 500.000",
  },
  {
    id: 2,
    name: "Double Room",
    image: "/rectangle-1009-4.svg",
    features: [
      { icon: BedIcon, text: "2 Bedroom" },
      { icon: UsersIcon, text: "2-3 Guest" },
      { icon: BathIcon, text: "1 Bathroom" },
      { icon: SquareIcon, text: "84 Sq ft" },
    ],
    amenities: [
      ["Twin bed", "Air Conditioning", "Television"],
      ["Cable TV", "Streaming device"],
    ],
    price: "Rp. 500.000",
  },
  {
    id: 3,
    name: "Premium Room",
    image: "/rectangle-1009.svg",
    features: [
      { icon: BedIcon, text: "3 Bedroom" },
      { icon: UsersIcon, text: "5 Guest" },
      { icon: BathIcon, text: "2 Bathroom" },
      { icon: SquareIcon, text: "92 Sq ft" },
    ],
    amenities: [
      ["Twin bed", "Air Conditioning", "Television"],
      ["Cable TV", "Streaming device"],
    ],
    price: "Rp. 500.000",
  },
  {
    id: 4,
    name: "Single Room Class Elite",
    image: "/rectangle-1009-3.svg",
    features: [
      { icon: BedIcon, text: "1 Bedroom" },
      { icon: UsersIcon, text: "1 Guest" },
      { icon: BathIcon, text: "1 Bathroom" },
      { icon: SquareIcon, text: "67 Sq ft" },
    ],
    amenities: [
      ["Twin bed", "Air Conditioning", "Television"],
      ["Cable TV", "Streaming device"],
    ],
    price: "Rp. 500.000",
  },
  {
    id: 5,
    name: "Private Room",
    image: "/rectangle-1009-2.svg",
    features: [
      { icon: BedIcon, text: "1 Bedroom" },
      { icon: UsersIcon, text: "1 Guest" },
      { icon: BathIcon, text: "1 Bathroom" },
      { icon: SquareIcon, text: "67 Sq ft" },
    ],
    amenities: [
      ["Twin bed", "Air Conditioning", "Television"],
      ["Cable TV", "Streaming device"],
    ],
    price: "Rp. 500.000",
  },
];

export const RoomDetailsWrapperSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#f3ecdc] py-16 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-start gap-8">
        {roomData.map((room) => (
          <Card
            key={room.id}
            className="w-full border-none bg-transparent shadow-none"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[480px] h-72 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={room.name}
                    src={room.image}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-8">
                  <div className="flex flex-col gap-3">
                    <h2 className="font-normal text-[#073937] text-[22.7px] tracking-[-0.18px] leading-[31.9px]">
                      {room.name}
                    </h2>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap gap-4">
                        {room.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-7 h-5 flex items-center">
                              <feature.icon className="w-5 h-5 text-[#073937]" />
                            </div>
                            <span className="text-[13.2px] font-normal text-[#073937] tracking-[0.07px] leading-[20px] whitespace-nowrap">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-[15.6px] font-normal text-[#073937] tracking-0 leading-6 whitespace-nowrap">
                          Tersedia Fasilitas :
                        </p>
                        <div className="flex gap-[18px]">
                          {room.amenities.map((column, colIndex) => (
                            <div
                              key={colIndex}
                              className="font-normal text-[#073937] text-[15.6px] tracking-0 leading-6"
                            >
                              {column.map((amenity, amenityIndex) => (
                                <React.Fragment key={amenityIndex}>
                                  {amenity}
                                  {amenityIndex < column.length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end mt-4 md:mt-0">
                    <div className="flex flex-col items-end">
                      <p className="text-[23.1px] font-normal text-[#073937] text-right tracking-[-0.18px] leading-[31.9px] whitespace-nowrap">
                        {room.price}
                      </p>
                      <p className="text-[9.5px] font-normal text-[#073937] text-right tracking-[0.10px] leading-3 whitespace-nowrap">
                        Harga /malam
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="mt-4 md:mt-0 bg-[#f3ecdc] rounded-[98px] border border-solid border-[#9b9b9b] text-[#4d4d4d] font-normal text-[15px] px-[25px] py-[5px] h-auto"
                    >
                      Tentukan tanggal
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full max-w-[1241px] h-[54px] rounded-[1000px] border border-solid border-[#073937] text-[#073937] font-normal text-[15px] mt-4"
        >
          Lihat Lainnya
        </Button>
      </div>
    </section>
  );
};
