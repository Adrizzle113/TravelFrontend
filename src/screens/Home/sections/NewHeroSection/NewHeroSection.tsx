export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-12 px-6">

      {/* Main content container */}
      <div className="container mx-auto max-w-7xl">
        {/* Top header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Lifo</h2>
          <p className="text-gray-600 text-sm">Trip Hero Header Image</p>
        </div>

          {/* Logo badge 
          <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-gray-900 rounded-[20px] mb-8">
            <span className="text-lg font-light">Lifo</span>
          </div>
          */}

          {/* Navigation
          <nav className="absolute top-12 right-12 flex gap-8">
            <a href="#" className="text-gray-900 hover:text-gray-600">Menu</a>
            <a href="#" className="text-gray-900 hover:text-gray-600">Aboout</a>
            <a href="#" className="text-gray-900 hover:text-gray-600">Trip</a>
            <a href="#" className="text-gray-900 hover:text-gray-600">Service</a>
          </nav >
         */}

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
            {/* Left side - Text and images */}
            <div className="relative">
              <h1 className="font-heading-very-big text-6xl lg:text-7xl leading-tight text-gray-900 mb-12">
                <span className="inline-flex items-center">
                  Exploring{" "}
                  <span className="inline-block w-24 h-12 mx-4 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=200"
                      alt="Architecture"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  The
                </span>
                <br />
                <span className="inline-flex items-center">
                  Luxury{" "}
                  <span className="inline-block w-24 h-12 mx-4 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=200"
                      alt="Travel"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  Trip in
                </span>
                <br />
                <span className="inline-flex items-center">
                  Many Country{" "}
                  <span className="inline-block w-24 h-12 mx-4 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=200"
                      alt="Destination"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </span>
              </h1>

              {/* Large rounded image */}
              <div className="relative mt-8">
                <div className="w-full max-w-md aspect-[4/3] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="https://images.pexels.com/photos/1020974/pexels-photo-1020974.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="European Street"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Circular image and stats */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Decorative stars */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 text-gray-900">✦</div>
                  <div className="w-6 h-6 text-gray-900">✦</div>
                </div>
              </div>

              {/* Circular image with gradient background */}
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-transparent rounded-full blur-2xl transform scale-110"></div>
                <div className="relative w-80 aspect-[3/4] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
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
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-2xl font-light">294</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Many countries have beautiful tours, then why do you just lie at home? let's explore various countries without further ado
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};
