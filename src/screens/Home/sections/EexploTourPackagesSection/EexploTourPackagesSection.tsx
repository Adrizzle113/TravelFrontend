import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign } from 'lucide-react';
import { packagesApi } from '@/lib/eexploApi';
import { TourPackage } from '@/lib/supabase';

export const EexploTourPackagesSection = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packagesApi.getFeatured();
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
    {
      id: '1',
      destination_id: '1',
      name: 'Italian Highlights Tour',
      duration: '7 Days 6 Nights',
      price: 1299.00,
      description: 'Explore Rome, Florence, and Venice in this comprehensive Italian adventure',
      image_url: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      created_at: ''
    },
    {
      id: '2',
      destination_id: '2',
      name: 'Bali Paradise Escape',
      duration: '5 Days 4 Nights',
      price: 899.00,
      description: 'Discover the magic of Bali with pristine beaches and ancient temples',
      image_url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      created_at: ''
    },
    {
      id: '3',
      destination_id: '3',
      name: 'Everest Base Camp Trek',
      duration: '12 Days 11 Nights',
      price: 1599.00,
      description: 'Ultimate trekking experience to the base of the worlds highest mountain',
      image_url: 'https://images.pexels.com/photos/1657110/pexels-photo-1657110.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      created_at: ''
    },
    {
      id: '4',
      destination_id: '5',
      name: 'Maldives Luxury Retreat',
      duration: '4 Days 3 Nights',
      price: 2199.00,
      description: 'Experience paradise with overwater villas and crystal-clear waters',
      image_url: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      created_at: ''
    },
  ];

  const displayPackages = packages.length > 0 ? packages : placeholderPackages;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
            Featured Tour Packages
          </h2>
          <p className="font-inter text-lg text-eexplo-text-secondary max-w-2xl mx-auto">
            Carefully curated travel experiences designed to give you the best adventures
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eexplo-accent-orange"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/packages')}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.image_url}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-inter font-bold text-xl text-eexplo-text-primary mb-2 line-clamp-1">
                      {pkg.name}
                    </h3>
                    <p className="font-inter text-sm text-eexplo-text-secondary mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-eexplo-text-secondary">
                        <Clock className="w-4 h-4" />
                        <span className="font-inter text-sm">{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-eexplo-light-gray pt-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-eexplo-accent-orange" />
                        <span className="font-inter font-bold text-2xl text-eexplo-accent-orange">
                          {pkg.price}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-eexplo-accent-teal hover:bg-eexplo-accent-teal/90 text-white font-inter"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/packages')}
                className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                See All Tours
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
