export const NewHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center">
      <div className="w-full px-[10px]">
        <div className="flex justify-center items-center">
          <div className="relative w-full text-center">
            <h1 className="font-heading-very-big leading-none text-gray-900" style={{ fontSize: '7rem' }}>
              <span className="flex flex-col gap-[0.12em] items-center">
                <span className="inline-flex gap-3 md:gap-4 items-center flex-wrap justify-center">
                  BETTER
                  <span className="inline-flex w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 aspect-[2.5/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Hotel"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  RATES
                </span>

                <span className="inline-flex gap-3 md:gap-4 items-center flex-wrap justify-center">
                  <span className="inline-flex w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 aspect-[2.5/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Commission"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  HIGHER COMMISSIONS
                </span>

                <span className="inline-flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                  <span className="flex flex-col leading-none">
                    <span>MADE FOR</span>
                    <span>BRAZILIAN</span>
                    <span>AGENTS</span>
                  </span>

                  <span className="inline-flex w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 aspect-[0.9/1] rounded-full overflow-hidden align-middle">
                    <img
                      src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600"
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
