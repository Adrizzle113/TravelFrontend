import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Calendar, MapPin, Users, Search } from "lucide-react";

export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-[#4a5d4f] via-[#5a6d5f] to-[#6a7d6f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#3a4d3f] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2a3d2f] rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-heading-very-big text-5xl lg:text-6xl mb-6 leading-tight">
              Your Gateway to Comfort and Convenience.
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Book now and get the best prices
            </p>

            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="Bali, Indonesia"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="24/04/23"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="25/04/23"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="1 | 2"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-base font-medium">
                <Search className="w-5 h-5 mr-2" />
                SEARCH
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 rounded-full border-[3px] border-white/30"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl">
                <img
                  src="/images/bedroom_interior.png"
                  alt="Luxury Hotel Room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-20 h-20">
                <div className="text-white text-6xl">✦</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-12 opacity-60">
          <div className="text-white text-sm font-medium">Hotel Services</div>
          <div className="text-white text-sm font-medium">TRAVELYA</div>
          <div className="text-white text-sm font-medium">innstelgroup</div>
          <div className="text-white text-sm font-medium">Yurafield</div>
          <div className="text-white text-sm font-medium">M&S</div>
        </div>
      </div>
    </section>
  );
};
