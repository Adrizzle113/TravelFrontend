import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { Checkbox } from "../../../components/ui/checkbox";
import { Badge } from "../../../components/ui/badge";
import { 
  SearchIcon, 
  FilterIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  XIcon,
  RotateCcwIcon 
} from "lucide-react";

interface FilterState {
  sortBy: string;
  hotelName: string;
  starRating: string[];
  currency: string;
  meals: string[];
  payment: string[];
  distanceRange: number[];
  priceRange: number[];
  reviewsRating: string[];
  hotelFacilities: string[];
  roomFacilities: string[];
  accommodationFeatures: string[];
  green: string[];
  propertyTypes: string[];
}

interface ListSearchBarProps {
  onFiltersChange?: (filters: FilterState) => void;
  onSearch?: (query: string) => void;
  loading?: boolean;
}

export const ListSearchBar = ({ onFiltersChange, onSearch, loading = false }: ListSearchBarProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "popularity",
    hotelName: "",
    starRating: [],
    currency: "USD",
    meals: [],
    payment: [],
    distanceRange: [25],
    priceRange: [1, 1255],
    reviewsRating: [],
    hotelFacilities: [],
    roomFacilities: [],
    accommodationFeatures: [],
    green: [],
    propertyTypes: []
  });

  // Filter options data
  const mealOptions = [
    { id: "nomeal", label: "No meals included", count: 209 },
    { id: "breakfast", label: "Breakfast included", count: 99 },
    { id: "halfBoard", label: "Breakfast + dinner or lunch included", count: 0 },
    { id: "fullBoard", label: "Breakfast, lunch and dinner included", count: 0 },
    { id: "allInclusive", label: "All-inclusive", count: 0 }
  ];

  const reviewOptions = [
    { id: "9", label: "9 and higher" },
    { id: "8", label: "8 and higher" },
    { id: "7", label: "7 and higher" },
    { id: "6", label: "6 and higher" },
    { id: "5", label: "5 and higher" }
  ];

  const hotelFacilities = [
    { id: "has_internet", label: "Free Internet" },
    { id: "has_airport_transfer", label: "Transfer" },
    { id: "has_parking", label: "Parking" },
    { id: "has_pool", label: "Swimming Pool" },
    { id: "has_fitness", label: "Fitness centre" },
    { id: "has_meal", label: "Bar or restaurant" },
    { id: "has_busyness", label: "Conference hall" },
    { id: "has_spa", label: "Spa Services" },
    { id: "has_ski", label: "Ski slope nearby" },
    { id: "beach", label: "Beach nearby" },
    { id: "has_jacuzzi", label: "Jacuzzi" },
    { id: "has_ecar_charger", label: "Electric car charging" }
  ];

  const roomFacilities = [
    { id: "air-conditioning", label: "Air-conditioning" },
    { id: "private-bathroom", label: "Private Bathroom" },
    { id: "kitchen", label: "Kitchen" },
    { id: "balcony", label: "Balcony" }
  ];

  const accommodationFeatures = [
    { id: "has_kids", label: "Suitable for children" },
    { id: "has_disabled_support", label: "For guests with disabilities" },
    { id: "has_pets", label: "Pets allowed" },
    { id: "has_smoking", label: "Smoking allowed" }
  ];

  const propertyTypes = [
    { id: "hotel", label: "Hotels" },
    { id: "hostel", label: "Hostels" },
    { id: "apart", label: "Apartments" },
    { id: "apart_hotel", label: "Apartment hotels" },
    { id: "guesthouse", label: "Guesthouses" },
    { id: "cottage_villa_bungalow", label: "Cottages, villas, bungalows" },
    { id: "camping", label: "Campgrounds" },
    { id: "glamping", label: "Glampings" },
    { id: "sanatorium", label: "Sanatoriums" },
    { id: "resort", label: "Resorts" },
    { id: "boutique", label: "Boutique hotels" }
  ];

  const starOptions = [
    { value: "1", label: "1 star" },
    { value: "2", label: "2 stars" },
    { value: "3", label: "3 stars" },
    { value: "4", label: "4 stars" },
    { value: "5", label: "5 stars" }
  ];

  // Load filters from localStorage on mount
    useEffect(() => {
      const savedFilters = localStorage.getItem('hotelFilters');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters(parsedFilters);
        if (onFiltersChange) {
          onFiltersChange(parsedFilters);
        }
      }
    }, []);

    // Save filters to localStorage and notify parent when filters change
    useEffect(() => {
      localStorage.setItem('hotelFilters', JSON.stringify(filters));
      if (onFiltersChange) {
        onFiltersChange(filters);
      }
    }, [filters, onFiltersChange]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCheckboxChange = (filterType: keyof FilterState, itemId: string, checked: boolean) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[];
      const newArray = checked 
        ? [...currentArray, itemId]
        : currentArray.filter(id => id !== itemId);
      
      return {
        ...prev,
        [filterType]: newArray
      };
    });
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      sortBy: "popularity",
      hotelName: "",
      starRating: [],
      currency: "USD",
      meals: [],
      payment: [],
      distanceRange: [25],
      priceRange: [1, 1255],
      reviewsRating: [],
      hotelFacilities: [],
      roomFacilities: [],
      accommodationFeatures: [],
      green: [],
      propertyTypes: []
    };
    setFilters(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.hotelName) count++;
    if (filters.starRating.length > 0) count++;
    if (filters.meals.length > 0) count++;
    if (filters.payment.length > 0) count++;
    if (filters.reviewsRating.length > 0) count++;
    if (filters.hotelFacilities.length > 0) count++;
    if (filters.roomFacilities.length > 0) count++;
    if (filters.accommodationFeatures.length > 0) count++;
    if (filters.green.length > 0) count++;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.priceRange[0] !== 1 || filters.priceRange[1] !== 1255) count++;
    if (filters.distanceRange[0] !== 25) count++;
    return count;
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-app-accent text-sm">{title}</h3>
      {children}
    </div>
  );

  const CheckboxGroup = ({ 
    options, 
    filterType, 
    selectedValues 
  }: { 
    options: { id: string; label: string; count?: number }[]; 
    filterType: keyof FilterState;
    selectedValues: string[];
  }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map(option => (
        <div key={option.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={option.id} 
              checked={selectedValues.includes(option.id)}
              onCheckedChange={(checked) => 
                handleCheckboxChange(filterType, option.id, checked as boolean)
              }
            />
            <label htmlFor={option.id} className="text-sm text-gray-700 cursor-pointer">
              {option.label}
            </label>
          </div>
          {option.count !== undefined && (
            <span className="text-xs text-gray-500">{option.count}</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Main Search Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search hotels by name..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-gray-50/80 border-gray-200 rounded-[20px] text-base placeholder:text-gray-500 focus:bg-white focus:border-app-primary transition-all duration-200" 
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-6 rounded-[20px] border-2 transition-all duration-200 ${
                showFilters 
                  ? 'bg-app-primary border-app-primary text-white' 
                  : 'bg-gray-50/80 border-gray-200 hover:bg-white hover:border-app-primary text-gray-700'
              }`}
            >
              <FilterIcon className="w-5 h-5 mr-2" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge className="ml-2 bg-white text-app-primary text-xs px-2 py-0">
                  {getActiveFilterCount()}
                </Badge>
              )}
              {showFilters ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
            </Button>
            
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="h-12 px-8 bg-app-primary text-white rounded-[20px] hover:bg-app-primary/90 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t bg-gray-50/50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <Card className="rounded-[20px] border-0 shadow-sm bg-white">
                <CardContent className="p-8">
                  
                  {/* Filter Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-heading-standar text-app-accent">Filter Hotels</h2>
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="flex items-center gap-2 text-sm border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600 rounded-[15px]"
                    >
                      <RotateCcwIcon className="w-4 h-4" />
                      Clear All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    
                    {/* Sort By */}
                    <FilterSection title="Sort by">
                      <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                        <SelectTrigger className="h-10 rounded-[15px] border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-[15px]">
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    {/* Hotel Name */}
                    <FilterSection title="Hotel name">
                      <Input 
                        placeholder="For example, Hilton" 
                        value={filters.hotelName} 
                        onChange={(e) => handleFilterChange('hotelName', e.target.value)}
                        className="h-10 rounded-[15px] border-gray-200" 
                      />
                    </FilterSection>

                    {/* Star Rating */}
                    <FilterSection title="Star Rating">
                      <div className="flex flex-wrap gap-2">
                        {starOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={filters.starRating.includes(option.value) ? "default" : "outline"}
                            onClick={() => handleCheckboxChange('starRating', option.value, !filters.starRating.includes(option.value))}
                            className={`h-8 px-3 text-xs rounded-[15px] transition-all duration-200 ${
                              filters.starRating.includes(option.value)
                                ? "bg-app-primary text-white border-app-primary" 
                                : "bg-gray-50 border-gray-200 hover:bg-white hover:border-app-primary text-gray-700"
                            }`}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    {/* Currency */}
                    <FilterSection title="Currency">
                      <Select value={filters.currency} onValueChange={(value) => handleFilterChange('currency', value)}>
                        <SelectTrigger className="h-10 rounded-[15px] border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-[15px]">
                          <SelectItem value="USD">USD US Dollar, $</SelectItem>
                          <SelectItem value="EUR">EUR Euro, €</SelectItem>
                          <SelectItem value="GBP">GBP British Pound, £</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price for a night">
                      <div className="space-y-3">
                        <Slider 
                          value={filters.priceRange} 
                          onValueChange={(value) => handleFilterChange('priceRange', value)}
                          max={1255} 
                          min={1}
                          step={10} 
                          className="w-full" 
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Distance Range */}
                    <FilterSection title="Distance from city center">
                      <div className="space-y-3">
                        <Slider 
                          value={filters.distanceRange} 
                          onValueChange={(value) => handleFilterChange('distanceRange', value)}
                          max={50} 
                          step={1} 
                          className="w-full" 
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>0 miles</span>
                          <span>{filters.distanceRange[0]} miles</span>
                          <span>50+ miles</span>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Meals */}
                    <FilterSection title="Meals">
                      <CheckboxGroup 
                        options={mealOptions}
                        filterType="meals"
                        selectedValues={filters.meals}
                      />
                    </FilterSection>

                    {/* Payment and Booking */}
                    <FilterSection title="Payment and booking">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="freecancellation" 
                            checked={filters.payment.includes('freecancellation')}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('payment', 'freecancellation', checked as boolean)
                            }
                          />
                          <label htmlFor="freecancellation" className="text-sm text-gray-700 cursor-pointer">
                            Free cancellation available
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="site" 
                            checked={filters.payment.includes('site')}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('payment', 'site', checked as boolean)
                            }
                          />
                          <label htmlFor="site" className="text-sm text-gray-700 cursor-pointer">
                            Pay now
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="hotel" 
                            checked={filters.payment.includes('hotel')}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('payment', 'hotel', checked as boolean)
                            }
                          />
                          <label htmlFor="hotel" className="text-sm text-gray-700 cursor-pointer">
                            Pay on the spot
                          </label>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Reviews Rating */}
                    <FilterSection title="Reviews rating">
                      <CheckboxGroup 
                        options={reviewOptions}
                        filterType="reviewsRating"
                        selectedValues={filters.reviewsRating}
                      />
                    </FilterSection>

                    {/* Hotel Facilities */}
                    <FilterSection title="Hotel Facilities">
                      <CheckboxGroup 
                        options={hotelFacilities}
                        filterType="hotelFacilities"
                        selectedValues={filters.hotelFacilities}
                      />
                    </FilterSection>

                    {/* Room Facilities */}
                    <FilterSection title="Room Facilities">
                      <CheckboxGroup 
                        options={roomFacilities}
                        filterType="roomFacilities"
                        selectedValues={filters.roomFacilities}
                      />
                    </FilterSection>

                    {/* Accommodation Features */}
                    <FilterSection title="Accommodation Features">
                      <CheckboxGroup 
                        options={accommodationFeatures}
                        filterType="accommodationFeatures"
                        selectedValues={filters.accommodationFeatures}
                      />
                    </FilterSection>

                    {/* Green */}
                    <FilterSection title="Green">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="eco_certified" 
                          checked={filters.green.includes('eco_certified')}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('green', 'eco_certified', checked as boolean)
                          }
                        />
                        <label htmlFor="eco_certified" className="text-sm text-gray-700 cursor-pointer">
                          Sustainability certification
                        </label>
                      </div>
                    </FilterSection>

                    {/* Property Type */}
                    <FilterSection title="Property Type">
                      <CheckboxGroup 
                        options={propertyTypes}
                        filterType="propertyTypes"
                        selectedValues={filters.propertyTypes}
                      />
                    </FilterSection>

                  </div>

                  {/* Filter Actions */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowFilters(false)} 
                        className="px-6 rounded-[15px] border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => setShowFilters(false)}
                        className="px-6 bg-app-primary text-white rounded-[15px] hover:bg-app-primary/90"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};