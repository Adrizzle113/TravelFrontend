export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex items-center">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="relative">
            {/* ============================= */}
            {/*   HEADLINE WITH INLINE IMAGES */}
            {/* ============================= */}
      <h1 className="font-heading-very-big text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none text-gray-900 mb-12">
  <span className="flex flex-col gap-[0.12em]">
    {/* Line 1: BETTER [image] RATES */}
    <span className="inline-flex gap-3">
      BETTER
      <span className="inline-flex aspect-[2.5/1] rounded-full overflow-hidden align-middle">
        <img
          src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </span>
      RATES
    </span>

    {/* Line 2: [image] HIGHER COMMISSIONS */}
    <span className="inline-flex gap-3">
      <span className="inline-flex aspect-[2.5/1] rounded-full overflow-hidden align-middle">
        <img
          src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Commission"
          className="w-full h-full object-cover"
        />
      </span>
      HIGHER COMMISSIONS
    </span>

    {/* Line 3: MADE FOR / BRAZILIAN / AGENTS + tall image */}
    <span className="inline-flex items-start gap-3">
      {/* stacked text block */}
      <span className="flex flex-col leading-none">
        <span>MADE FOR</span>
        <span>BRAZILIAN</span>
        <span>AGENTS</span>
      </span>

      {/* tall pill image */}
      <span className="inline-flex aspect-[0.7/1] rounded-full overflow-hidden align-middle">
        <img
          src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Brazil"
          className="w-full h-full object-cover"
        />
      </span>
    </span>
  </span>
</h1>



            {/* ============================= */}
            {/*   LEFT IMAGE */}
            {/* ============================= */}
            <div className="relative mt-8">
              {/* Image */}
              <div className="relative w-full rounded-[120px] overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1020974/pexels-photo-1020974.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* ==================================== */}
          {/*            RIGHT COLUMN               */}
          {/* ==================================== */}
          <div className="relative flex flex-col items-center justify-center">

            {/* Small Decorative Stars */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-4">
              <div className="text-gray-900 text-2xl">✦</div>
              <div className="text-gray-900 text-lg">✦</div>
            </div>

            {/* IMAGE WRAPPER */}
            <div className="relative mb-12">
              {/* Image */}
              <div className="relative w-[250px] h-[370px] rounded-[180px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="text-left w-full max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-light">01</span>
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-2xl font-light">294</span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Empowering Brazilian travel agents with exclusive rates and
                competitive commissions. Your success is our priority.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
