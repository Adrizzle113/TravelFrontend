import { Instagram, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SocialGallerySection = () => {
  const images = [
    'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1483041/pexels-photo-1483041.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="w-8 h-8 text-eexplo-accent-orange" />
            <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary">
              Follow Our Journey
            </h2>
          </div>
          <p className="font-inter text-lg text-eexplo-text-secondary max-w-2xl mx-auto">
            Get inspired by real travel moments shared by our community
          </p>
        </div>

        <div className="overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex gap-4 min-w-max px-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group w-64 h-64 rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
              >
                <img
                  src={image}
                  alt={`Travel moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-6 h-6 text-eexplo-accent-orange" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </Button>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
