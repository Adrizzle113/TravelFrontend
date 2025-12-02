import { MapPin, Star } from "lucide-react";
import { Card } from "../../../../components/ui/card";

export const PopularHotelsSection = (): JSX.Element => {
  const hotels = [
    {
      id: 1,
      name: "Capital Business Hotel",
      location: "Bali, Indonesia",
      price: "$1200",
      rating: 4.8,
      image: "/images/bedroom_interior.png",
    },
    {
      id: 2,
      name: "Hotel Super Winer 96",
      location: "Bali, Indonesia",
      price: "$1199",
      rating: 4.9,
      image: "/images/cozy_living_space.png",
    },
    {
      id: 3,
      name: "Super Ootel Collection",
      location: "Lampung, Indonesia",
      price: "$1099",
      rating: 4.9,
      image: "/images/living_room_decor.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="font-heading-big text-4xl lg:text-5xl text-gray-900 mb-4">
              Our Popular Hotels We Recommend For You
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We offer a curated selection of exceptional hotels that cater to your preferences and ensure a delightful stay.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-[#4a5d4f] to-[#3a4d3f]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading-standar text-xl text-gray-900 mb-2">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{hotel.price}</span>
                    <span className="text-gray-600 text-sm ml-1">/night</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-900 text-white px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
