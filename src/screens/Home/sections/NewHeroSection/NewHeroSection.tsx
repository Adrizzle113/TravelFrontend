
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
            <p className="text-lg opacity-90">
              Book now and get the best prices
            </p>
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
