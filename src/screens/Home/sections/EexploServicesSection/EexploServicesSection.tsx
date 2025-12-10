import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mountain, Building2, Package, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EexploServicesSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('adventure');

  const services = [
    {
      id: 'adventure',
      name: 'Adventure & Activities',
      icon: Mountain,
      description: 'Experience thrilling adventures and outdoor activities tailored to your preferences',
      features: [
        'Mountain trekking and hiking expeditions',
        'Water sports and diving adventures',
        'Wildlife safaris and nature tours',
        'Cultural immersion experiences',
      ],
      image: 'https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'hotel',
      name: 'Hotel & Accommodation',
      icon: Building2,
      description: 'Premium hotel bookings and accommodation solutions for every budget',
      features: [
        'Luxury resorts and boutique hotels',
        'Budget-friendly accommodations',
        'Vacation rentals and villas',
        '24/7 booking support',
      ],
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'custom',
      name: 'Custom Packages',
      icon: Package,
      description: 'Personalized travel packages designed around your unique preferences and needs',
      features: [
        'Tailored itineraries',
        'Flexible scheduling options',
        'Special occasion planning',
        'Group travel arrangements',
      ],
      image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'visa',
      name: 'Visa Assistance',
      icon: FileText,
      description: 'Complete visa processing and documentation support for hassle-free travel',
      features: [
        'Visa application assistance',
        'Documentation guidance',
        'Embassy appointment booking',
        'Travel insurance coordination',
      ],
      image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'insurance',
      name: 'Travel Insurance',
      icon: Shield,
      description: 'Comprehensive travel insurance coverage for peace of mind during your journey',
      features: [
        'Medical emergency coverage',
        'Trip cancellation protection',
        'Baggage loss insurance',
        'Adventure activity coverage',
      ],
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const activeService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section className="py-20 bg-eexplo-warm-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
            Our Services
          </h2>
          <p className="font-inter text-lg text-eexplo-text-secondary max-w-2xl mx-auto">
            Comprehensive travel services to make your journey seamless and memorable
          </p>
        </div>

        <Tabs defaultValue="adventure" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-white rounded-lg p-2 gap-2">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="font-inter data-[state=active]:bg-eexplo-accent-orange data-[state=active]:text-white flex items-center gap-2 py-3"
              >
                <service.icon className="w-4 h-4" />
                <span className="hidden md:inline">{service.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-eexplo-accent-orange/10">
                    <service.icon className="w-8 h-8 text-eexplo-accent-orange" />
                  </div>
                  <h3 className="font-inter font-bold text-3xl text-eexplo-text-primary mb-4">
                    {service.name}
                  </h3>
                  <p className="font-inter text-lg text-eexplo-text-secondary mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-eexplo-accent-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4 text-eexplo-accent-teal"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="font-inter text-eexplo-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate('/services')}
                    className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/services')}
            className="border-2 border-eexplo-accent-orange text-eexplo-accent-orange hover:bg-eexplo-accent-orange hover:text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
          >
            See All Services
          </Button>
        </div>
      </div>
    </section>
  );
};
