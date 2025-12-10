import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { packagesApi } from '@/lib/eexploApi';
import { TourPackage } from '@/lib/supabase';
import { Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Packages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packagesApi.getAll();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const placeholderPackages = [
    { id: '1', destination_id: '1', name: 'Italian Highlights Tour', duration: '7 Days 6 Nights', price: 1299.00, description: 'Explore Rome, Florence, and Venice in this comprehensive Italian adventure', image_url: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
    { id: '2', destination_id: '2', name: 'Bali Paradise Escape', duration: '5 Days 4 Nights', price: 899.00, description: 'Discover the magic of Bali with pristine beaches and ancient temples', image_url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
    { id: '3', destination_id: '3', name: 'Everest Base Camp Trek', duration: '12 Days 11 Nights', price: 1599.00, description: 'Ultimate trekking experience to the base of the worlds highest mountain', image_url: 'https://images.pexels.com/photos/1657110/pexels-photo-1657110.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
    { id: '4', destination_id: '5', name: 'Maldives Luxury Retreat', duration: '4 Days 3 Nights', price: 2199.00, description: 'Experience paradise with overwater villas and crystal-clear waters', image_url: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
    { id: '5', destination_id: '6', name: 'Thailand Explorer', duration: '8 Days 7 Nights', price: 1099.00, description: 'From Bangkok to Phuket - experience the best of Thailand', image_url: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
    { id: '6', destination_id: '4', name: 'Bangladesh Cultural Journey', duration: '6 Days 5 Nights', price: 799.00, description: 'Immerse yourself in rich culture and natural beauty', image_url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=600', featured: true, created_at: '' },
  ];

  const displayPackages = packages.length > 0 ? packages : placeholderPackages;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-inter font-bold text-5xl text-eexplo-text-primary mb-4">
              Tour Packages
            </h1>
            <p className="font-inter text-xl text-eexplo-text-secondary max-w-3xl mx-auto">
              Carefully curated travel experiences designed to give you the best adventures at great value
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-eexplo-accent-orange"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-eexplo-light-gray"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.image_url}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-inter font-bold text-2xl text-eexplo-text-primary mb-3">
                      {pkg.name}
                    </h3>
                    <p className="font-inter text-eexplo-text-secondary mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-eexplo-light-gray">
                      <div className="flex items-center gap-2 text-eexplo-text-secondary">
                        <Clock className="w-5 h-5" />
                        <span className="font-inter text-sm">{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-6 h-6 text-eexplo-accent-orange" />
                        <span className="font-inter font-bold text-3xl text-eexplo-accent-orange">
                          {pkg.price}
                        </span>
                      </div>
                      <Button
                        className="bg-eexplo-accent-teal hover:bg-eexplo-accent-teal/90 text-white font-inter"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
