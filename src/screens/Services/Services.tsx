import { Layout } from '@/components/layout/Layout';
import { Mountain, Building2, Package, FileText, Shield, Compass } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Mountain,
      title: 'Adventure & Activities',
      description: 'Experience thrilling adventures and outdoor activities tailored to your preferences.',
      features: ['Mountain trekking', 'Water sports', 'Wildlife safaris', 'Cultural tours']
    },
    {
      icon: Building2,
      title: 'Hotel & Accommodation',
      description: 'Premium hotel bookings and accommodation solutions for every budget.',
      features: ['Luxury resorts', 'Budget hotels', 'Vacation rentals', '24/7 support']
    },
    {
      icon: Package,
      title: 'Custom Packages',
      description: 'Personalized travel packages designed around your unique preferences and needs.',
      features: ['Tailored itineraries', 'Flexible scheduling', 'Special occasions', 'Group travel']
    },
    {
      icon: FileText,
      title: 'Visa Assistance',
      description: 'Complete visa processing and documentation support for hassle-free travel.',
      features: ['Application help', 'Documentation', 'Embassy booking', 'Insurance']
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance coverage for peace of mind during your journey.',
      features: ['Medical coverage', 'Trip cancellation', 'Baggage insurance', 'Activity coverage']
    },
    {
      icon: Compass,
      title: 'Travel Consultation',
      description: 'Expert travel advice and planning assistance from experienced professionals.',
      features: ['Route planning', 'Budget advice', 'Best times to visit', 'Local insights']
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-eexplo-warm-gray min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-inter font-bold text-5xl text-eexplo-text-primary mb-4">
              Our Services
            </h1>
            <p className="font-inter text-xl text-eexplo-text-secondary max-w-3xl mx-auto">
              Comprehensive travel services to make your journey seamless and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-eexplo-accent-orange/10">
                  <service.icon className="w-8 h-8 text-eexplo-accent-orange" />
                </div>
                <h3 className="font-inter font-bold text-2xl text-eexplo-text-primary mb-4">
                  {service.title}
                </h3>
                <p className="font-inter text-eexplo-text-secondary mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-eexplo-accent-teal"></div>
                      <span className="font-inter text-eexplo-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
