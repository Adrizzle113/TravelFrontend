import { 
  CheckCircleIcon, 
  WifiIcon, 
  CarIcon, 
  UtensilsIcon, 
  DumbbellIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CoffeeIcon,
  TvIcon,
  PhoneIcon,
  AirVentIcon,
  BathIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
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

interface AmenitiesSectionProps {
  hotel: Hotel;
  amenities: string[];
}

// Map amenity names to appropriate icons
const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
    return <WifiIcon className="w-5 h-5 text-blue-600" />;
  }
  if (amenityLower.includes('parking') || amenityLower.includes('car')) {
    return <CarIcon className="w-5 h-5 text-green-600" />;
  }
  if (amenityLower.includes('restaurant') || amenityLower.includes('dining') || amenityLower.includes('food')) {
    return <UtensilsIcon className="w-5 h-5 text-orange-600" />;
  }
  if (amenityLower.includes('gym') || amenityLower.includes('fitness') || amenityLower.includes('exercise')) {
    return <DumbbellIcon className="w-5 h-5 text-red-600" />;
  }
  if (amenityLower.includes('spa') || amenityLower.includes('wellness') || amenityLower.includes('massage')) {
    return <SparklesIcon className="w-5 h-5 text-purple-600" />;
  }
  if (amenityLower.includes('security') || amenityLower.includes('safe')) {
    return <ShieldCheckIcon className="w-5 h-5 text-gray-600" />;
  }
  if (amenityLower.includes('coffee') || amenityLower.includes('bar') || amenityLower.includes('lounge')) {
    return <CoffeeIcon className="w-5 h-5 text-brown-600" />;
  }
  if (amenityLower.includes('tv') || amenityLower.includes('television')) {
    return <TvIcon className="w-5 h-5 text-gray-600" />;
  }
  if (amenityLower.includes('phone')) {
    return <PhoneIcon className="w-5 h-5 text-gray-600" />;
  }
  if (amenityLower.includes('air') || amenityLower.includes('conditioning') || amenityLower.includes('climate')) {
    return <AirVentIcon className="w-5 h-5 text-cyan-600" />;
  }
  if (amenityLower.includes('bath') || amenityLower.includes('bathroom') || amenityLower.includes('shower')) {
    return <BathIcon className="w-5 h-5 text-blue-600" />;
  }
  
  // Default icon
  return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
};

// Categorize amenities
const categorizeAmenities = (amenities: string[]) => {
  const categories = {
    'Essential Services': [] as string[],
    'Recreation & Wellness': [] as string[],
    'Business & Connectivity': [] as string[],
    'Food & Beverage': [] as string[],
    'Room Features': [] as string[],
    'Other Amenities': [] as string[]
  };

  amenities.forEach(amenity => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('wifi') || amenityLower.includes('internet') || 
        amenityLower.includes('business') || amenityLower.includes('meeting')) {
      categories['Business & Connectivity'].push(amenity);
    } else if (amenityLower.includes('pool') || amenityLower.includes('gym') || 
               amenityLower.includes('spa') || amenityLower.includes('fitness') ||
               amenityLower.includes('wellness')) {
      categories['Recreation & Wellness'].push(amenity);
    } else if (amenityLower.includes('restaurant') || amenityLower.includes('bar') || 
               amenityLower.includes('coffee') || amenityLower.includes('dining') ||
               amenityLower.includes('breakfast')) {
      categories['Food & Beverage'].push(amenity);
    } else if (amenityLower.includes('tv') || amenityLower.includes('air') || 
               amenityLower.includes('bathroom') || amenityLower.includes('room') ||
               amenityLower.includes('balcony') || amenityLower.includes('safe')) {
      categories['Room Features'].push(amenity);
    } else if (amenityLower.includes('parking') || amenityLower.includes('concierge') || 
               amenityLower.includes('laundry') || amenityLower.includes('elevator') ||
               amenityLower.includes('service')) {
      categories['Essential Services'].push(amenity);
    } else {
      categories['Other Amenities'].push(amenity);
    }
  });

  // Filter out empty categories
  return Object.fromEntries(
    Object.entries(categories).filter(([_, items]) => items.length > 0)
  );
};

export const AmenitiesSection = ({ hotel, amenities }: AmenitiesSectionProps): JSX.Element => {
  const categorizedAmenities = categorizeAmenities(amenities);
  const hasAmenities = amenities.length > 0;

  if (!hasAmenities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-400" />
            Hotel Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 text-center py-8">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Amenity information not available for this hotel.</p>
            <p className="text-sm mt-2">Please contact the hotel directly for more details.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
          Hotel Amenities
        </CardTitle>
        <p className="text-sm text-gray-600">
          {amenities.length} amenities available at {hotel.name}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        
        {/* Categorized Amenities */}
        <div className="space-y-6">
          {Object.entries(categorizedAmenities).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-app-accent mb-3 text-sm uppercase tracking-wide">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="mr-3 flex-shrink-0">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Amenities Badges */}
        {amenities.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-app-accent mb-3 text-sm">
              Popular Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 8).map((amenity, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 8 && (
                <Badge variant="outline" className="text-gray-600">
                  +{amenities.length - 8} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Amenity Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.keys(categorizedAmenities).length}
              </div>
              <div className="text-xs text-green-700">Categories</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {amenities.length}
              </div>
              <div className="text-xs text-blue-700">Total Amenities</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {categorizedAmenities['Recreation & Wellness']?.length || 0}
              </div>
              <div className="text-xs text-purple-700">Wellness</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {categorizedAmenities['Food & Beverage']?.length || 0}
              </div>
              <div className="text-xs text-orange-700">Dining</div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <div className="font-medium mb-1">Amenity Information</div>
              <div>
                All amenities are subject to availability and may incur additional charges. 
                Please verify details directly with the hotel before booking.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};