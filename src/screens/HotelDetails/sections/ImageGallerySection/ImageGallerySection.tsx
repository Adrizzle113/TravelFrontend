import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
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

interface ImageData {
  src: string;
  alt: string;
}

interface ImageGallerySectionProps {
  hotel: Hotel;
  images: ImageData[];
}

export const ImageGallerySection = ({ hotel, images }: ImageGallerySectionProps): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Set<number>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96">
          
          {/* Main Image */}
          <div className="lg:col-span-3 relative group">
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <img
                    src={getImageSrc(validImages[currentImageIndex], currentImageIndex)}
                    alt={validImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(currentImageIndex)}
                  />
                  
                  {/* Image overlay with hotel info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Verified Badge */}
                  <Badge className="absolute top-4 left-4 bg-white/90 text-app-accent">
                    Verified Hotel
                  </Badge>
                  
                  {/* Expand Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openFullscreen}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700"
                  >
                    <ExpandIcon className="w-4 h-4" />
                  </Button>

                  {/* Navigation arrows (only show if multiple images) */}
                  {validImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Image counter */}
                  {validImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {validImages.length}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thumbnail Gallery */}
          {validImages.length > 1 && (
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 h-full">
                {validImages.slice(1, 5).map((image, index) => {
                  const actualIndex = index + 1;
                  return (
                    <Card 
                      key={actualIndex} 
                      className={`overflow-hidden cursor-pointer transition-all duration-200 ${
                        currentImageIndex === actualIndex 
                          ? 'ring-2 ring-app-primary' 
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(actualIndex)}
                    >
                      <CardContent className="p-0 h-full">
                        <img
                          src={getImageSrc(image, actualIndex)}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(actualIndex)}
                        />
                        {/* Show +X more overlay on last thumbnail if there are more images */}
                        {index === 3 && validImages.length > 5 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-medium">
                              +{validImages.length - 5} more
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Image Dots Navigation (for mobile/tablet) */}
        {validImages.length > 1 && (
          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex gap-2">
              {validImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-app-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <img
              src={getImageSrc(validImages[currentImageIndex], currentImageIndex)}
              alt={validImages[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
              onError={() => handleImageError(currentImageIndex)}
            />
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            >
              ✕
            </Button>

            {/* Navigation in fullscreen */}
            {validImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </Button>

                {/* Image counter in fullscreen */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} of {validImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};