import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { Checkbox } from "../../../components/ui/checkbox";
import { SearchIcon, FilterIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
export const ListSearchBar = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [hotelName, setHotelName] = useState("");
  const [starRating, setStarRating] = useState("");
  const [distanceRange, setDistanceRange] = useState([0]);
  const [priceRange, setPriceRange] = useState([1]);
  const [currency, setCurrency] = useState("USD");
  const mealOptions = [{
    id: "no-meals",
    label: "No meals included",
    count: 209
  }, {
    id: "breakfast",
    label: "Breakfast included",
    count: 99
  }, {
    id: "breakfast-dinner",
    label: "Breakfast + dinner or lunch included",
    count: 0
  }, {
    id: "all-meals",
    label: "Breakfast, lunch and dinner included",
    count: 0
  }, {
    id: "all-inclusive",
    label: "All-inclusive",
    count: 0
  }];
  const reviewOptions = [{
    id: "9-plus",
    label: "9 and higher"
  }, {
    id: "8-plus",
    label: "8 and higher"
  }, {
    id: "7-plus",
    label: "7 and higher"
  }, {
    id: "6-plus",
    label: "6 and higher"
  }, {
    id: "5-plus",
    label: "5 and higher"
  }];
  const hotelFacilities = ["Free Internet", "Transfer", "Parking", "Swimming Pool", "Fitness centre", "Bar or restaurant", "Conference hall", "Spa Services", "Ski slope nearby", "Beach nearby", "Jacuzzi", "Electric car charging"];
  const roomFacilities = ["Air-conditioning", "Private Bathroom", "Kitchen", "Balcony"];
  const accommodationFeatures = ["Suitable for children", "For guests with disabilities", "Pets allowed", "Smoking allowed"];
  const propertyTypes = ["Hotels", "Hostels", "Apartments", "Apartment hotels", "Guesthouses", "Cottages, villas, bungalows", "Campgrounds", "Glampings", "Sanatoriums", "Resorts", "Boutique hotels"];
  const FilterSection = ({
    title,
    children
  }: {
    title: string;
    children: React.ReactNode;
  }) => <div className="space-y-3">
      <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
      {children}
    </div>;
  const CheckboxGroup = ({
    options,
    title
  }: {
    options: string[];
    title?: string;
  }) => <div className="space-y-2">
      {title && <h4 className="text-sm font-medium text-gray-700">{title}</h4>}
      {options.map(option => <div key={option} className="flex items-center space-x-2">
          <Checkbox id={option} />
          <label htmlFor={option} className="text-sm text-gray-600">{option}</label>
        </div>)}
    </div>;
  return <div className="w-full bg-white border-b">
      {/* Main Search Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 rounded-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Search hotels, destinations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 h-12 bg-gray-50/80 border-gray-200 rounded-xl text-base placeholder:text-gray-500 focus:bg-white focus:border-app-primary transition-all duration-200" />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6 bg-gray-50/80 border-gray-200 rounded-xl hover:bg-white hover:border-app-primary transition-all duration-200">
              <FilterIcon className="w-5 h-5 mr-2" />
              Filters
              {showFilters ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
            </Button>
            <Button className="h-12 px-8 bg-app-primary text-white rounded-xl hover:bg-app-primary/90 transition-all duration-200">
              <SearchIcon className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && <div className="border-t bg-gray-50/50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <Card className="rounded-xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    
                    {/* Sort By */}
                    <FilterSection title="Sort by">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Input placeholder="For example, Hilton" value={hotelName} onChange={e => setHotelName(e.target.value)} className="h-10" />
                    </FilterSection>

                    {/* Star Rating */}
                    <FilterSection title="Star Rating">
                      <Select value={starRating} onValueChange={setStarRating}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 stars</SelectItem>
                          <SelectItem value="4">4 stars</SelectItem>
                          <SelectItem value="3">3 stars</SelectItem>
                          <SelectItem value="2">2 stars</SelectItem>
                          <SelectItem value="1">1 star</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    {/* Currency */}
                    <FilterSection title="Currency">
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD US Dollar, $</SelectItem>
                          <SelectItem value="EUR">EUR Euro, €</SelectItem>
                          <SelectItem value="GBP">GBP British Pound, £</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    {/* Meals */}
                    <FilterSection title="Meals">
                      <div className="space-y-2">
                        {mealOptions.map(meal => <div key={meal.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id={meal.id} />
                              <label htmlFor={meal.id} className="text-sm text-gray-600">{meal.label}</label>
                            </div>
                            <span className="text-xs text-gray-500">{meal.count}</span>
                          </div>)}
                      </div>
                    </FilterSection>

                    {/* Payment and Booking */}
                    <FilterSection title="Payment and booking">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="free-cancellation" />
                          <label htmlFor="free-cancellation" className="text-sm text-gray-600">Free cancellation available</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pay-now" />
                          <label htmlFor="pay-now" className="text-sm text-gray-600">Pay now</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pay-spot" />
                          <label htmlFor="pay-spot" className="text-sm text-gray-600">Pay on the spot</label>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Location Distance */}
                    <FilterSection title="Distance from city center">
                      <div className="space-y-3">
                        <Slider value={distanceRange} onValueChange={setDistanceRange} max={50} step={1} className="w-full" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>0 miles</span>
                          <span>{distanceRange[0]} miles</span>
                          <span>50+ miles</span>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Reviews Rating */}
                    <FilterSection title="Reviews rating">
                      <div className="space-y-2">
                        {reviewOptions.map(review => <div key={review.id} className="flex items-center space-x-2">
                            <Checkbox id={review.id} />
                            <label htmlFor={review.id} className="text-sm text-gray-600">{review.label}</label>
                          </div>)}
                      </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price for a night">
                      <div className="space-y-3">
                        <Slider value={priceRange} onValueChange={setPriceRange} max={1255} step={10} className="w-full" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>$1</span>
                          <span>${priceRange[0]}</span>
                          <span>$1,255</span>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Hotel Facilities */}
                    <FilterSection title="Hotel Facilities">
                      <CheckboxGroup options={hotelFacilities} />
                    </FilterSection>

                    {/* Room Facilities */}
                    <FilterSection title="Room Facilities">
                      <CheckboxGroup options={roomFacilities} />
                    </FilterSection>

                    {/* Accommodation Features */}
                    <FilterSection title="Accommodation Features">
                      <CheckboxGroup options={accommodationFeatures} />
                    </FilterSection>

                    {/* Green */}
                    <FilterSection title="Green">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sustainability" />
                        <label htmlFor="sustainability" className="text-sm text-gray-600">Sustainability certification</label>
                      </div>
                    </FilterSection>

                    {/* Property Type */}
                    <FilterSection title="Property Type">
                      <CheckboxGroup options={propertyTypes} />
                    </FilterSection>

                  </div>

                  {/* Filter Actions */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <Button variant="outline" className="px-6">
                      Clear all filters
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowFilters(false)} className="px-6">
                        Cancel
                      </Button>
                      <Button className="px-6 bg-app-primary text-white">
                        Apply filters
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>}
    </div>;
};