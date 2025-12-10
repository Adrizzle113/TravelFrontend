import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { destinationsApi } from '@/lib/eexploApi';
import { Destination } from '@/lib/supabase';
import { MapPin } from 'lucide-react';

export const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationsApi.getAll();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const placeholderDestinations = [
    { id: '1', name: 'Italy', country: 'Europe', tour_count: 15, image_url: 'https://images.pexels.com/photos/2344/italy-mountains-dawn-daylight.jpg?auto=compress&cs=tinysrgb&w=600', description: 'Experience the rich history, art, and cuisine of Italy', featured: true, created_at: '' },
    { id: '2', name: 'Indonesia', country: 'Asia', tour_count: 22, image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Discover tropical islands and ancient temples', featured: true, created_at: '' },
    { id: '3', name: 'Nepal', country: 'Asia', tour_count: 18, image_url: 'https://images.pexels.com/photos/1499541/pexels-photo-1499541.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Trek through Himalayas and spiritual sites', featured: true, created_at: '' },
    { id: '4', name: 'Bangladesh', country: 'Asia', tour_count: 12, image_url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Explore natural beauty and vibrant culture', featured: true, created_at: '' },
    { id: '5', name: 'Maldives', country: 'Asia', tour_count: 25, image_url: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Paradise islands with crystal-clear waters', featured: true, created_at: '' },
    { id: '6', name: 'Thailand', country: 'Asia', tour_count: 30, image_url: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Beaches, temples, and delicious cuisine', featured: true, created_at: '' },
  ];

  const displayDestinations = destinations.length > 0 ? destinations : placeholderDestinations;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-eexplo-warm-gray min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-inter font-bold text-5xl text-eexplo-text-primary mb-4">
              Explore Destinations
            </h1>
            <p className="font-inter text-xl text-eexplo-text-secondary max-w-3xl mx-auto">
              Discover incredible destinations around the world, each offering unique experiences and unforgettable adventures
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-eexplo-accent-orange"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={destination.image_url}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-inter font-bold text-3xl text-white mb-1">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-4 h-4" />
                        <span className="font-inter">{destination.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-inter text-eexplo-text-secondary mb-4">
                      {destination.description || 'Explore amazing tours and experiences in this beautiful destination'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-inter font-semibold text-eexplo-accent-orange">
                        {destination.tour_count} Tours Available
                      </span>
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
