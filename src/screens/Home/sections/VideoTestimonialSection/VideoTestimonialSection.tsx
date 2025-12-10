import { useState } from 'react';
import { Play, Pause, Quote } from 'lucide-react';

export const VideoTestimonialSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <button
              onClick={togglePlay}
              className="group inline-flex items-center justify-center w-20 h-20 rounded-full bg-white hover:bg-eexplo-accent-orange transition-all duration-300 transform hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-eexplo-accent-orange group-hover:text-white transition-colors" />
              ) : (
                <Play className="w-8 h-8 text-eexplo-accent-orange group-hover:text-white transition-colors ml-1" />
              )}
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <Quote className="w-12 h-12 text-eexplo-accent-orange mx-auto mb-6" />
            <blockquote className="font-inter text-2xl md:text-3xl font-medium text-white mb-6 leading-relaxed">
              Eexplo made our dream vacation a reality. Every detail was perfectly planned, and the experience exceeded all expectations.
            </blockquote>
            <div className="text-white">
              <p className="font-inter font-semibold text-lg">Sarah Johnson</p>
              <p className="font-inter text-white/80">Travel Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
