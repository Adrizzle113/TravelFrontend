import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { destinationsApi } from '@/lib/eexploApi';
import { Destination } from '@/lib/supabase';

export const EexploDestinationsSection = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationsApi.getFeatured();
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
    {
      id: '1',
      name: 'Italy',
      country: 'Europe',
      tour_count: 15,
      image_url: 'https://images.pexels.com/photos/2344/italy-mountains-dawn-daylight.jpg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
    {
      id: '2',
      name: 'Indonesia',
      country: 'Asia',
      tour_count: 22,
      image_url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
    {
      id: '3',
      name: 'Nepal',
      country: 'Asia',
      tour_count: 18,
      image_url: 'https://images.pexels.com/photos/1499541/pexels-photo-1499541.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
    {
      id: '4',
      name: 'Bangladesh',
      country: 'Asia',
      tour_count: 12,
      image_url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
    {
      id: '5',
      name: 'Maldives',
      country: 'Asia',
      tour_count: 25,
      image_url: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
    {
      id: '6',
      name: 'Thailand',
      country: 'Asia',
      tour_count: 30,
      image_url: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '',
      featured: true,
      created_at: ''
    },
  ];

  const displayDestinations = destinations.length > 0 ? destinations : placeholderDestinations;

  return (
    <section className="py-20 bg-eexplo-warm-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
            Explore Top Destinations
          </h2>
          <p className="font-inter text-lg text-eexplo-text-secondary max-w-2xl mx-auto">
            Discover breathtaking locations around the world, each offering unique experiences and unforgettable memories
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eexplo-accent-orange"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => navigate('/destinations')}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={destination.image_url}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-inter font-bold text-2xl text-white mb-2">
                      {destination.name}
                    </h3>
                    <p className="font-inter text-white/90">
                      {destination.tour_count} Tours Available
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/destinations')}
                className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                See All Destinations
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
