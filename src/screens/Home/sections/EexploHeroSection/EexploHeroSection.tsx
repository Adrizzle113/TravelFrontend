import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EexploHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden -mt-[130px] pt-[120px] pb-[120px] px-[40px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <h1 className="font-inter text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Turn the world into your playground!
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover extraordinary destinations and create unforgettable memories with our curated travel experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/packages')}
            className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Book a Tour
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/packages')}
            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-eexplo-dark-gray font-inter font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View Package
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};
