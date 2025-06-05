import { useState } from "react";
import { 
  ArrowLeftIcon, 
  StarIcon, 
  MapPinIcon, 
  ShareIcon, 
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewScore: number;
  reviewCount: number;
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  image: string;
  amenities: string[];
  description?: string;
  ratehawk_data?: any;
}

interface SearchContext {
  destination: string;
  destinationId: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalHotels: number;
  availableHotels: number;
  searchTimestamp: string;
}

interface ImageData {
  src: string;
  alt: string;
}

interface HeroSectionProps {
  hotel: Hotel;
  searchContext: SearchContext;
  images: ImageData[];
  onBack: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const getRatingText = (score: number): string => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  if (score >= 6) return "Pleasant";
  return "Fair";
};

export const HeroSection = ({ 
  hotel, 
  searchContext, 
  images, 
  onBack, 
  onShare, 
  onToggleFavorite, 
  isFavorite 
}: HeroSectionProps): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Set<number>>(new Set());

  // Ensure we have at least one image
  const validImages = images.length > 0 ? images : [{ src: hotel.image, alt: hotel.name }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => new Set(prev).add(index));
  };

  const getImageSrc = (image: ImageData, index: number) => {
    return imageError.has(index) ? "/placeholder-hotel.jpg" : image.src;
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background Image with Slider */}
      <div className="absolute inset-0">
        <img
          src={getImageSrc(validImages[currentImageIndex], currentImageIndex)}
          alt={validImages[currentImageIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          onError={() => handleImageError(currentImageIndex)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Navigation Controls */}
      {validImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full z-10"
            onClick={prevImage}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full z-10"
            onClick={nextImage}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Back Button & Breadcrumb */}
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="flex items-center text-white hover:bg-white/20 rounded-lg px-3 py-2"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Results
              </Button>
              
              <div className="hidden sm:block text-white/80 text-sm">
                {searchContext.destination} → {hotel.name}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={onToggleFavorite}
                variant="ghost"
                size="sm"
                className={`text-white hover:bg-white/20 rounded-lg ${isFavorite ? "bg-white/20" : ""}`}
              >
                <HeartIcon className={`w-5 h-5 ${isFavorite ? "fill-current text-red-400" : ""}`} />
              </Button>
              
              <Button
                onClick={onShare}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <ShareIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-2xl">
            
            {/* Hotel Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {hotel.name}
            </h1>
            
            {/* Location */}
            <div className="flex items-center text-white/90 mb-4">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span className="text-lg">{hotel.location}</span>
            </div>
            
            {/* Rating & Reviews Row */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              
              {/* Star Rating */}
              {hotel.rating > 0 && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-4 w-4 ${
                          i < hotel.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-white/40'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium text-sm">
                    {hotel.rating} stars
                  </span>
                </div>
              )}
              
              {/* Guest Reviews */}
              {hotel.reviewScore > 0 && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Badge variant="secondary" className="bg-blue-600 text-white mr-2 text-sm">
                    {hotel.reviewScore}/10
                  </Badge>
                  <div className="text-white">
                    <span className="font-medium text-sm">
                      {getRatingText(hotel.reviewScore)}
                    </span>
                    {hotel.reviewCount > 0 && (
                      <span className="text-white/80 text-xs ml-1">
                        ({hotel.reviewCount.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Booking Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div>📅 {searchContext.checkin} - {searchContext.checkout}</div>
              <div>👥 {searchContext.guests} guests</div>
              <div>💰 From ${hotel.price.amount}/{hotel.price.period}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Dots Indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};