export const CompanyStorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-6">
              About Eexplo
            </h2>
            <div className="space-y-4 font-inter text-lg text-eexplo-text-secondary">
              <p>
                Founded in 2010, Eexplo has been transforming the way people experience travel. Our passion for exploration and commitment to excellence has helped thousands of travelers discover the world's most incredible destinations.
              </p>
              <p>
                We specialize in creating authentic, immersive travel experiences that connect you with local cultures, breathtaking landscapes, and unforgettable moments. Every journey we craft is designed with attention to detail and a deep understanding of what makes travel truly meaningful.
              </p>
              <p>
                Our team of experienced travel experts works tirelessly to ensure that every aspect of your trip is seamless, from initial planning to your safe return home. We believe that travel is not just about the destination—it's about the transformation that happens along the way.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="font-inter font-bold text-3xl text-eexplo-accent-orange mb-2">
                  15+
                </div>
                <div className="font-inter text-sm text-eexplo-text-secondary">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="font-inter font-bold text-3xl text-eexplo-accent-orange mb-2">
                  10K+
                </div>
                <div className="font-inter text-sm text-eexplo-text-secondary">
                  Happy Travelers
                </div>
              </div>
              <div className="text-center">
                <div className="font-inter font-bold text-3xl text-eexplo-accent-orange mb-2">
                  50+
                </div>
                <div className="font-inter text-sm text-eexplo-text-secondary">
                  Countries Covered
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Eexplo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-eexplo-accent-orange rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="font-inter font-bold text-3xl">2010</div>
                <div className="font-inter text-xs">Est.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
