import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { 
  WifiIcon,
  CarIcon,
  UtensilsIcon,
  DumbbellIcon,
  WavesIcon, // Use WavesIcon for pool
  CoffeeIcon,
  TvIcon,
  ThermometerIcon, // Use for air conditioning
  ShieldCheckIcon,
  PhoneIcon,
  ShirtIcon, // Correct name with dash
  ConciergeBellIcon,
  BriefcaseIcon,
  PresentationIcon,
  PlaneIcon,
  AccessibilityIcon,
  CigaretteIcon, // Use for smoking
  BabyIcon,
  DogIcon,
  MountainSnowIcon, // Use for ski
  FlowerIcon, // Use for spa instead of SpaIcon
  CheckCircleIcon,
  StarIcon
} from "lucide-react";

interface FacilitiesGridSectionProps {
  hotel: any;
  amenities: string[];
}

// Enhanced amenity categorization and icon mapping
const amenityCategories = {
  connectivity: {
    title: "Connectivity",
    icon: WifiIcon,
    color: "blue"
  },
  dining: {
    title: "Dining & Food",
    icon: UtensilsIcon,
    color: "orange"
  },
  wellness: {
    title: "Wellness & Recreation",
    icon: DumbbellIcon,
    color: "green"
  },
  business: {
    title: "Business Services",
    icon: BriefcaseIcon,
    color: "purple"
  },
  convenience: {
    title: "Convenience",
    icon: ConciergeBellIcon,
    color: "gray"
  },
  accessibility: {
    title: "Accessibility",
    icon: AccessibilityIcon,
    color: "indigo"
  }
};

const amenityMapping: { [key: string]: { category: string; icon: any; name: string } } = {
  // Connectivity
  'has_internet': { category: 'connectivity', icon: WifiIcon, name: 'Free WiFi' },
  'has_wifi': { category: 'connectivity', icon: WifiIcon, name: 'Free WiFi' },
  'wifi': { category: 'connectivity', icon: WifiIcon, name: 'Free WiFi' },
  'internet': { category: 'connectivity', icon: WifiIcon, name: 'Internet Access' },

  // Dining & Food
  'has_meal': { category: 'dining', icon: UtensilsIcon, name: 'Restaurant' },
  'has_bar': { category: 'dining', icon: CoffeeIcon, name: 'Bar/Lounge' },
  'restaurant': { category: 'dining', icon: UtensilsIcon, name: 'Restaurant' },
  'bar': { category: 'dining', icon: CoffeeIcon, name: 'Bar' },
  'coffee': { category: 'dining', icon: CoffeeIcon, name: 'Coffee Shop' },
  'minibar': { category: 'dining', icon: CoffeeIcon, name: 'Minibar' },
  'room service': { category: 'dining', icon: ConciergeBellIcon, name: 'Room Service' },
  'kitchen': { category: 'dining', icon: UtensilsIcon, name: 'Kitchen' },

  // Wellness & Recreation
  'has_pool': { category: 'wellness', icon: WavesIcon, name: 'Swimming Pool' },
  'has_fitness': { category: 'wellness', icon: DumbbellIcon, name: 'Fitness Center' },
  'has_spa': { category: 'wellness', icon: FlowerIcon, name: 'Spa & Wellness' },
  'pool': { category: 'wellness', icon: WavesIcon, name: 'Swimming Pool' },
  'gym': { category: 'wellness', icon: DumbbellIcon, name: 'Fitness Center' },
  'spa': { category: 'wellness', icon: FlowerIcon, name: 'Spa' },
  'has_jacuzzi': { category: 'wellness', icon: WavesIcon, name: 'Jacuzzi' },
  'beach': { category: 'wellness', icon: WavesIcon, name: 'Beach Access' },
  'has_ski': { category: 'wellness', icon: MountainSnowIcon, name: 'Ski Access' },

  // Business Services
  'has_busyness': { category: 'business', icon: BriefcaseIcon, name: 'Business Center' },
  'has_meeting': { category: 'business', icon: PresentationIcon, name: 'Meeting Rooms' },
  'business_center': { category: 'business', icon: BriefcaseIcon, name: 'Business Center' },
  'meeting_rooms': { category: 'business', icon: PresentationIcon, name: 'Meeting Rooms' },

  // Convenience
  'has_parking': { category: 'convenience', icon: CarIcon, name: 'Free Parking' },
  'parking': { category: 'convenience', icon: CarIcon, name: 'Parking' },
  'has_laundry': { category: 'convenience', icon: ShirtIcon, name: 'Laundry Service' },
  'laundry': { category: 'convenience', icon: ShirtIcon, name: 'Laundry' },
  'has_concierge': { category: 'convenience', icon: ConciergeBellIcon, name: 'Concierge' },
  'concierge': { category: 'convenience', icon: ConciergeBellIcon, name: 'Concierge' },
  'has_airport_transfer': { category: 'convenience', icon: PlaneIcon, name: 'Airport Shuttle' },
  'airport_shuttle': { category: 'convenience', icon: PlaneIcon, name: 'Airport Shuttle' },
  'has_elevator': { category: 'convenience', icon: CheckCircleIcon, name: 'Elevator' },
  'elevator': { category: 'convenience', icon: CheckCircleIcon, name: 'Elevator' },
  'has_safe': { category: 'convenience', icon: ShieldCheckIcon, name: 'Safe' },
  'safe': { category: 'convenience', icon: ShieldCheckIcon, name: 'Safe' },
  'has_tv': { category: 'convenience', icon: TvIcon, name: 'Television' },
  'tv': { category: 'convenience', icon: TvIcon, name: 'TV' },
  'has_phone': { category: 'convenience', icon: PhoneIcon, name: 'Phone' },
  'phone': { category: 'convenience', icon: PhoneIcon, name: 'Phone' },
  'air-conditioning': { category: 'convenience', icon: CheckCircleIcon, name: 'Air Conditioning' },
  'has_heating': { category: 'convenience', icon: CheckCircleIcon, name: 'Heating' },

  // Accessibility & Special Services
  'has_disabled_support': { category: 'accessibility', icon: AccessibilityIcon, name: 'Wheelchair Accessible' },
  'has_kids': { category: 'accessibility', icon: BabyIcon, name: 'Family Friendly' },
  'has_pets': { category: 'accessibility', icon: DogIcon, name: 'Pet Friendly' },
  'has_smoking': { category: 'accessibility', icon: CigaretteIcon, name: 'Smoking Allowed' },
  'non-smoking': { category: 'accessibility', icon: CheckCircleIcon, name: 'Non-Smoking' }
};

export const FacilitiesGridSection = ({ hotel, amenities }: FacilitiesGridSectionProps): JSX.Element => {
  // Process amenities from multiple sources
  const processAmenities = () => {
    const allAmenities = new Set<string>();
    
    // Add amenities from props
    amenities.forEach(amenity => allAmenities.add(amenity.toLowerCase().trim()));
    
    // Add amenities from RateHawk data
    if (hotel.ratehawk_data?.static_vm?.serp_filters) {
      hotel.ratehawk_data.static_vm.serp_filters.forEach((filter: string) => {
        allAmenities.add(filter.toLowerCase().trim());
      });
    }

    // Process room amenities
    if (hotel.ratehawk_data?.rates) {
      hotel.ratehawk_data.rates.forEach((rate: any) => {
        const roomAmenities = rate.rooms?.[0]?.amenities_data || [];
        roomAmenities.forEach((amenity: any) => {
          if (typeof amenity === 'string') {
            allAmenities.add(amenity.toLowerCase().trim());
          } else if (amenity.name) {
            allAmenities.add(amenity.name.toLowerCase().trim());
          }
        });
      });
    }

    return Array.from(allAmenities);
  };

  // Categorize amenities
  const categorizeAmenities = () => {
    const processedAmenities = processAmenities();
    const categorized: { [key: string]: any[] } = {};
    const uncategorized: string[] = [];

    // Initialize categories
    Object.keys(amenityCategories).forEach(cat => {
      categorized[cat] = [];
    });

    processedAmenities.forEach(amenity => {
      let found = false;
      
      // Try exact match first
      if (amenityMapping[amenity]) {
        const mapping = amenityMapping[amenity];
        categorized[mapping.category].push({
          name: mapping.name,
          icon: mapping.icon,
          original: amenity
        });
        found = true;
      } else {
        // Try partial match
        for (const [key, mapping] of Object.entries(amenityMapping)) {
          if (amenity.includes(key) || key.includes(amenity)) {
            categorized[mapping.category].push({
              name: mapping.name,
              icon: mapping.icon,
              original: amenity
            });
            found = true;
            break;
          }
        }
      }
      
      if (!found) {
        uncategorized.push(amenity);
      }
    });

    // Add uncategorized amenities to convenience
    uncategorized.forEach(amenity => {
      categorized.convenience.push({
        name: amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        icon: CheckCircleIcon,
        original: amenity
      });
    });

    return categorized;
  };

  const categorizedAmenities = categorizeAmenities();
  const totalAmenities = Object.values(categorizedAmenities).flat().length;

  // Get category color classes
  const getCategoryColors = (color: string): { bg: string; text: string; border: string; icon: string } => {
    const colors: { [key: string]: { bg: string; text: string; border: string; icon: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-600' },
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-600' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: 'text-gray-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', icon: 'text-indigo-600' }
    };
    return colors[color] || colors.gray;
  };

  if (totalAmenities === 0) {
    return (
      <section className="mb-8">
        <Card className="rounded-[20px] border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">🏨</div>
            <h3 className="text-xl font-heading-standar text-gray-600 mb-2">
              No Facilities Information
            </h3>
            <p className="text-gray-500">
              Facility details are not available for this hotel.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading-big text-app-accent mb-2">
          Hotel Facilities
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">
            {totalAmenities} facilities available
          </p>
          <Badge variant="outline" className="text-xs">
            <StarIcon className="w-3 h-3 mr-1" />
            Premium amenities
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(amenityCategories).map(([categoryKey, category]) => {
          const categoryAmenities = categorizedAmenities[categoryKey] || [];
          
          if (categoryAmenities.length === 0) return null;
          
          const colors = getCategoryColors(category.color);
          const CategoryIcon = category.icon;

          return (
            <Card key={categoryKey} className="rounded-[20px] border-gray-200">
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border mr-4`}>
                    <CategoryIcon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading-standar text-app-accent">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {categoryAmenities.length} feature{categoryAmenities.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Amenities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryAmenities.map((amenity, index) => {
                    const AmenityIcon = amenity.icon;
                    
                    return (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className={`p-2 rounded-md ${colors.bg} mr-3`}>
                          <AmenityIcon className={`w-4 h-4 ${colors.icon}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {amenity.name}
                          </p>
                          {process.env.NODE_ENV === 'development' && (
                            <p className="text-xs text-gray-500 truncate">
                              {amenity.original}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Facilities Summary */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">
                All facilities are included with your stay
              </span>
            </div>
            <div className="text-sm text-blue-600">
              {totalAmenities} total amenities
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};