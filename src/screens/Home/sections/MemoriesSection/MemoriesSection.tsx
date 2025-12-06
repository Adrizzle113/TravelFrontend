import { Button } from "../../../../components/ui/button";

export const MemoriesSection = (): JSX.Element => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#4a5d4f] via-[#5a6d5f] to-[#3a4d3f] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading-big text-4xl lg:text-5xl text-white mb-6">
            Unforgettable Memories<br />Unparalleled Comfort
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Experience ultimate travel comfort with our innovative hotel booking app. Explore a curated
            collection of exclusive hotels worldwide for an unforgettable accommodation experience.
          </p>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 rounded-full"
          >
            READ MORE
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="relative">
            <div className="w-full aspect-[3/4] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/images/bedroom_interior.png"
                alt="Luxury Room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-[3/4] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/images/cozy_living_space.png"
                alt="Relaxing Space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-[3/4] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/images/living_room_decor.png"
                alt="Comfort"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-white/40"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white/40 -ml-6"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white/40 -ml-6"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white/40 -ml-6"></div>
            </div>
          </div>

          <h3 className="font-heading-big text-3xl text-white mb-12">
            With Our Experience<br />We Will Served You
          </h3>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-heading-big text-white mb-2">800+</div>
              <div className="text-white/80 text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading-big text-white mb-2">35,000+</div>
              <div className="text-white/80 text-sm">Exclusive Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading-big text-white mb-2">1.5M+</div>
              <div className="text-white/80 text-sm">Exclusive Rooms</div>
            </div>
          </div>

          <div className="absolute bottom-10 right-10">
            <div className="text-white text-6xl opacity-40">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
};
