export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center">
          <div className="relative w-full">
            <h1 className="font-heading-very-big text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none text-gray-900">
              <span className="flex flex-col gap-[0.12em]">
                <span className="inline-flex gap-6">
                  BETTER
                  <span className="inline-flex aspect-[2.5/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Hotel"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  RATES
                </span>

                <span className="inline-flex gap-6">
                  <span className="inline-flex aspect-[2.5/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Commission"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  HIGHER COMMISSIONS
                </span>

                <span className="inline-flex items-start gap-6">
                  <span className="flex flex-col leading-none">
                    <span>MADE FOR</span>
                    <span>BRAZILIAN</span>
                    <span>AGENTS</span>
                  </span>

                  <span className="inline-flex aspect-[0.9/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Brazil"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
