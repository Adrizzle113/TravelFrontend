import { Shield, Headphones, MapPin } from 'lucide-react';

export const FeaturesStatsSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'No Booking Fee',
      subtitle: 'Rate Guarantee',
      description: 'Best price guaranteed with zero booking fees',
    },
    {
      icon: Headphones,
      title: '24/7 Emergency',
      subtitle: 'Helpline',
      description: 'Round-the-clock support for your peace of mind',
    },
    {
      icon: MapPin,
      title: '100% Verified',
      subtitle: 'Destinations',
      description: 'All locations personally vetted by our team',
    },
  ];

  const stats = [
    { value: '100%', label: 'Verified Tours' },
    { value: '239+', label: 'Tour Packages' },
    { value: '110+', label: 'Destinations' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-eexplo-accent-teal/10">
                <feature.icon className="w-8 h-8 text-eexplo-accent-teal" />
              </div>
              <h3 className="font-inter font-bold text-xl text-eexplo-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="font-inter font-semibold text-eexplo-accent-orange mb-2">
                {feature.subtitle}
              </p>
              <p className="font-inter text-eexplo-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-eexplo-light-gray pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-inter font-bold text-5xl text-eexplo-accent-orange mb-2">
                  {stat.value}
                </div>
                <div className="font-inter text-lg text-eexplo-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
