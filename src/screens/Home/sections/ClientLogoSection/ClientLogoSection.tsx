export const ClientLogoSection = () => {
  const partners = [
    { name: 'TripAdvisor', logo: 'https://images.pexels.com/photos/2228631/pexels-photo-2228631.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Booking.com', logo: 'https://images.pexels.com/photos/2228574/pexels-photo-2228574.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Expedia', logo: 'https://images.pexels.com/photos/2228631/pexels-photo-2228631.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Hotels.com', logo: 'https://images.pexels.com/photos/2228574/pexels-photo-2228574.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Airbnb', logo: 'https://images.pexels.com/photos/2228631/pexels-photo-2228631.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Kayak', logo: 'https://images.pexels.com/photos/2228574/pexels-photo-2228574.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-eexplo-warm-gray border-y border-eexplo-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="font-inter text-sm text-eexplo-text-secondary uppercase tracking-wider">
            Trusted by Leading Travel Brands
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left hover:pause-animation">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="h-16 w-32 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <span className="font-inter font-semibold text-eexplo-dark-gray text-sm">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
