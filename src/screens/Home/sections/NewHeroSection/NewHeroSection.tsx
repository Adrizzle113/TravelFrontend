export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex items-center">
      {/* Main content container */}
      <div className="container mx-auto max-w-7xl px-6">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text and images */}
          <div className="relative">
            <h1 className="font-heading-very-big text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-gray-900 mb-12">
  {/* Line 1: BETTER [image] RATES */}
  <span className="block">
    <span className="inline-flex flex-wrap items-center gap-3">
      <span>BETTER</span>
      <span
        className="
          inline-flex
          h-[1.2em] md:h-[1.3em] lg:h-[1.35em]
          aspect-[2.6/1]
          mx-1 md:mx-2
          rounded-full overflow-hidden flex-shrink-0
        "
      >
        <img
          src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </span>
      <span>RATES</span>
    </span>
  </span>

  {/* Line 2: [image] HIGHER COMMISSIONS */}
  <span className="block mt-2">
    <span className="inline-flex flex-wrap items-center gap-3">
      <span
        className="
          inline-flex
          h-[1.2em] md:h-[1.3em] lg:h-[1.35em]
          aspect-[2.6/1]
          mx-1 md:mx-2
          rounded-full overflow-hidden flex-shrink-0
        "
      >
        <img
          src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Commission"
          className="w-full h-full object-cover"
        />
      </span>
      <span>HIGHER COMMISSIONS</span>
    </span>
  </span>

  {/* Line 3: MADE FOR */}
  <span className="block mt-2">
    MADE FOR
  </span>

  {/* Line 4: BRAZILIAN AGENTS [tall image] */}
  <span className="block mt-2">
    <span className="inline-flex items-center gap-3">
      <span>BRAZILIAN AGENTS</span>
      <span
        className="
          inline-flex
          h-[2.4em] md:h-[2.8em] lg:h-[3em]
          aspect-[0.7/1]
          mx-2
          rounded-full overflow-hidden flex-shrink-0
        "
      >
        <img
          src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Brazil"
          className="w-full h-full object-cover"
        />
      </span>
    </span>
  </span>
</h1>

           {/* Large rounded image left with outline */}
            <div className="relative mt-8">
              {/* Outline behind the image */}
              <div
                className="
                  absolute inset-0 
                  rounded-[120px] 
                  border-[1.25px] border-black
                  translate-x-4 -translate-y-4
                  pointer-events-none
                "
              />
            
              {/* Glow for LEFT image — same style as right image */}
              <div
                className="
                  absolute -bottom-10 -left-12
                  w-[260px] h-[260px]
                  bg-gradient-to-br
                  from-transparent
                  via-[#688A5D]/95
                  to-transparent
                  rounded-full
                  blur-3xl
                  opacity-100
                  pointer-events-none
                "
              />
            
              {/* Image Container */}
              <div className="relative w-full rounded-[120px] overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1020974/pexels-photo-1020974.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="European Street"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </div>
          </div>


          {/* Right side - Circular/organic image and stats */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Decorative stars */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 text-gray-900">✦</div>
                <div className="w-6 h-6 text-gray-900">✦</div>
              </div>
            </div>

            {/* Right side - Organic tall image with glow + outline */}
            <div className="relative mb-12">
              {/* Outline behind the image (same shape) */}
              <div
                className="
                  absolute inset-0
                  rounded-[180px]
                  border-[1.25px] border-black
                  translate-x-4 -translate-y-4
                  pointer-events-none
                "
              />


              {/* Glow gradient */}
             <div
              className="
                absolute -top-10 -right-12
                w-[200px] h-[200px]
                bg-gradient-to-br
                from-transparent
                via-[#688A5D]/95
                to-transparent
                rounded-full
                blur-2xl
                opacity-100
                pointer-events-none
              "
            />

              {/* Image container */}
              <div
                className="
                  relative w-[250px] h-[370px] overflow-hidden shadow-2xl
                  rounded-[180px]
                "
              >
                <img
                  src="https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="European Buildings"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats section */}
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
