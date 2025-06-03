import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { SearchIcon, CalendarIcon, UsersIcon, BedIcon, WifiIcon, UtensilsIcon, DumbbellIcon, FilterIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { ratehawkApi } from "../../../lib/api";

export const SearchBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [starRating, setStarRating] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [earlyCheckIn, setEarlyCheckIn] = useState("");
  const [lateCheckOut, setLateCheckOut] = useState("");
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // RateHawk integration states
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // FIXED: Destination mapping with correct RateHawk frontend IDs
  const destinationMapping: { [key: string]: string } = {
    "Rio de Janeiro, Brazil": "965847972",
    "New York, USA": "70308", 
    "London, UK": "76876",
    "Tokyo, Japan": "82139",
    "Paris, France": "69474",
    "Bangkok, Thailand": "74107",
    "Singapore": "74108",
    "Las Vegas, USA": "2998",
    "Dubai, UAE": "74109",
    "Rome, Italy": "74110",
    "Los Angeles, USA": "2011"
  };

  // Get user ID from auth system
  const getUserId = () => {
    return localStorage.getItem('userId') || 
           localStorage.getItem('userEmail')?.replace('@', '_').replace('.', '_') ||
           `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSearch = async () => {
    if (!location || !checkIn || !checkOut) {
      setSearchError("Please fill in destination and dates");
      return;
    }

    setSearching(true);
    setSearchError(null);

    try {
      console.log("🔍 Starting RateHawk hotel search...");
      
      const userId = getUserId();
      
      // Check if user has RateHawk session
      try {
        const { data: sessionCheck } = await ratehawkApi.checkSession(userId);
        if (!sessionCheck.hasSession) {
          setSearchError("Please login to RateHawk first from the dashboard");
          setSearching(false);
          return;
        }
        console.log("✅ Valid RateHawk session confirmed");
      } catch (sessionError) {
        console.error("❌ Session check failed:", sessionError);
        setSearchError("Unable to verify RateHawk session. Please login again.");
        setSearching(false);
        return;
      }

      // Map destination to RateHawk ID
      const destinationId = destinationMapping[location] || location;
      console.log("🗺️ Destination mapping:", { location, destinationId });

      // ✅ FIX: Properly format guests for RateHawk API
      const guestsNumber = parseInt(guests) || 2;
      const roomsNumber = parseInt(rooms) || 1;
      
      // Create array of rooms with adults - RateHawk expects [{"adults": 2}]
      const formattedGuests = Array.from({ length: roomsNumber }, () => ({
        adults: Math.max(1, Math.floor(guestsNumber / roomsNumber))
      }));

      console.log("🏨 Guest formatting:", {
        originalGuests: guests,
        originalRooms: rooms,
        guestsNumber,
        roomsNumber,
        formattedGuests
      });

      console.log('🔍 About to call ratehawkApi.searchHotels');
      console.log('🔧 API CONFIG BASE_URL:', 'http://localhost:3001');
      console.log('🔧 Search endpoint:', '/api/ratehawk/search');
      console.log('🔧 Full URL should be:', 'http://localhost:3001/api/ratehawk/search');

      const searchData = {
        userId: userId,
        destination: destinationId,
        checkin: format(checkIn, 'yyyy-MM-dd'),
        checkout: format(checkOut, 'yyyy-MM-dd'),
        guests: formattedGuests, // ✅ CORRECT FORMAT: [{"adults": 2}]
        residency: citizenship || 'en-us',
        currency: 'USD'
      };

      console.log("📡 Sending search request:", searchData);

      // Make the API call
      const { data } = await ratehawkApi.searchHotels(searchData);

      console.log("📨 Search API response:", data);

      if (data.success) {
        console.log(`✅ Search successful: ${data.hotels?.length || 0} hotels found`);
        
        // Store results and search params for the List page
          const searchResults = {
            hotels: data.hotels || [],
            totalHotels: data.totalHotels || 0,
            availableHotels: data.availableHotels || 0,
            searchParams: {
              destination: location,
              destinationId: destinationId,
              checkin: format(checkIn, 'yyyy-MM-dd'),
              checkout: format(checkOut, 'yyyy-MM-dd'),
              guests: guestsNumber,
              rooms: roomsNumber,
              formattedGuests: formattedGuests
            },
            filters: {
              starRating,
              citizenship,
              earlyCheckIn,
              lateCheckOut,
              freeCancellation
            },
            searchSessionId: data.searchSessionId,
            pagination: data.pagination || { // NEW: Store pagination info
              currentPage: 1,
              totalPages: 1,
              hasNext: false,
              hasPrevious: false,
              hotelsPerPage: 20
            },
            timestamp: new Date().toISOString()
          };

        console.log("💾 Storing search results:", searchResults);
        localStorage.setItem('hotelSearchResults', JSON.stringify(searchResults));
        
        // Navigate to results page
        console.log("🚀 Navigating to results page...");
        navigate("/dashboard/orders");
      } else {
        console.error("❌ Search failed:", data.error);
        setSearchError(data.error || "Search failed. Please try again.");
      }
    } catch (err: any) {
      console.error("💥 Search error:", err);
      
      // Enhanced error handling
      if (err.message.includes('No RateHawk session')) {
        setSearchError("Please login to RateHawk first from the dashboard");
      } else if (err.message.includes('Failed to connect')) {
        setSearchError("Unable to connect to search service. Please check your connection and try again.");
      } else if (err.message.includes('rate limit')) {
        setSearchError("Too many requests. Please wait a moment and try again.");
      } else {
        setSearchError(`Search failed: ${err.message}. Please try again.`);
      }
    } finally {
      setSearching(false);
    }
  };

  const clearError = () => {
    setSearchError(null);
  };

  const amenities = [
    { icon: WifiIcon, label: "RO", code: "RO" },
    { icon: BedIcon, label: "BB", code: "BB" },
    { icon: UtensilsIcon, label: "HB", code: "HB" },
    { icon: DumbbellIcon, label: "FB", code: "FB" },
    { icon: WifiIcon, label: "AI", code: "AI" }
  ];

  const starOptions = [
    { value: "2", label: "2 stars" },
    { value: "3", label: "3 stars" },
    { value: "4", label: "4 stars" },
    { value: "5", label: "5 stars" }
  ];

  const destinationOptions = Object.keys(destinationMapping);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-[30px] shadow-xl border-0 relative overflow-hidden">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* Error Display */}
          {searchError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-red-600 text-sm">{searchError}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Main Search Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-3">
            {/* Destination */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-11 sm:h-12 lg:h-14 bg-gray-50/80 border-gray-200 rounded-xl sm:rounded-[15px] text-sm sm:text-base hover:bg-white hover:border-app-primary transition-all duration-200">
                  <SearchIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg rounded-xl z-50">
                  {destinationOptions.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Check-in Date */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 sm:h-12 lg:h-14 bg-gray-50/80 border-gray-200 rounded-xl sm:rounded-[15px] px-3 text-left font-normal text-sm sm:text-base hover:bg-white hover:border-app-primary transition-all duration-200 justify-start",
                      !checkIn && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border shadow-lg rounded-xl z-50">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 sm:h-12 lg:h-14 bg-gray-50/80 border-gray-200 rounded-xl sm:rounded-[15px] px-3 text-left font-normal text-sm sm:text-base hover:bg-white hover:border-app-primary transition-all duration-200 justify-start",
                      !checkOut && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border shadow-lg rounded-xl z-50">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < new Date() || (checkIn ? date <= checkIn : false)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests and Rooms */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">1 room for</label>
              <Select value={`${guests}-${rooms}`} onValueChange={(value: string) => {
                const [g, r] = value.split('-');
                setGuests(g);
                setRooms(r);
              }}>
                <SelectTrigger className="h-11 sm:h-12 lg:h-14 bg-gray-50/80 border-gray-200 rounded-xl sm:rounded-[15px] text-sm sm:text-base hover:bg-white hover:border-app-primary transition-all duration-200">
                  <UsersIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                  <SelectValue placeholder="2 guests" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg rounded-xl z-50">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={`${num}-1`}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-transparent mb-1">Search</label>
              <Button 
                onClick={handleSearch}
                disabled={searching}
                className="w-full h-11 sm:h-12 lg:h-14 bg-app-primary text-white rounded-xl sm:rounded-[15px] hover:bg-app-primary/90 active:bg-app-primary/95 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {searching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Search Hotels
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Additional Parameters Toggle */}
          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-gray-600 hover:text-app-primary transition-colors duration-200 p-0 h-auto font-medium"
            >
              {showFilters ? "Hide" : "Additional parameters"}
              <FilterIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-6 space-y-6 border-t pt-6">
              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Guests' Citizenship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests' citizenship</label>
                  <div className="relative">
                    <Select value={citizenship} onValueChange={setCitizenship}>
                      <SelectTrigger className="h-10 bg-gray-50/80 border-gray-200 rounded-lg text-sm hover:bg-white hover:border-app-primary transition-all duration-200">
                        <SelectValue placeholder="United States" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg rounded-xl z-50">
                        <SelectItem value="en-us">United States</SelectItem>
                        <SelectItem value="en-uk">United Kingdom</SelectItem>
                        <SelectItem value="en-ca">Canada</SelectItem>
                        <SelectItem value="en-au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    {citizenship && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCitizenship("")}
                        className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-gray-200"
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {starOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={starRating === option.value ? "default" : "outline"}
                        onClick={() => setStarRating(starRating === option.value ? "" : option.value)}
                        className={cn(
                          "h-10 px-3 text-xs rounded-lg transition-all duration-200 flex-shrink-0",
                          starRating === option.value 
                            ? "bg-app-primary text-white border-app-primary" 
                            : "bg-gray-50/80 border-gray-200 hover:bg-white hover:border-app-primary"
                        )}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second Row - Board Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Board type</label>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-10 px-4 text-xs rounded-lg border-gray-200 hover:bg-app-primary/10 hover:border-app-primary hover:text-app-primary transition-all duration-200 bg-gray-50/80 flex-shrink-0"
                    >
                      {amenity.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Early Check-in */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Early check-in</label>
                  <Select value={earlyCheckIn} onValueChange={setEarlyCheckIn}>
                    <SelectTrigger className="h-10 bg-gray-50/80 border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-white hover:border-app-primary transition-all duration-200">
                      <SelectValue placeholder="Select the time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg rounded-xl z-50">
                      <SelectItem value="6am">6:00 AM</SelectItem>
                      <SelectItem value="7am">7:00 AM</SelectItem>
                      <SelectItem value="8am">8:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Late Check-out */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Late check-out</label>
                  <Select value={lateCheckOut} onValueChange={setLateCheckOut}>
                    <SelectTrigger className="h-10 bg-gray-50/80 border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-white hover:border-app-primary transition-all duration-200">
                      <SelectValue placeholder="Select the time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg rounded-xl z-50">
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Free Cancellation */}
                <div className="flex items-end">
                  <Button
                    variant={freeCancellation ? "default" : "outline"}
                    onClick={() => setFreeCancellation(!freeCancellation)}
                    className={cn(
                      "h-10 px-4 text-sm rounded-lg transition-all duration-200",
                      freeCancellation 
                        ? "bg-app-primary text-white border-app-primary" 
                        : "bg-gray-50/80 border-gray-200 hover:bg-white hover:border-app-primary"
                    )}
                  >
                    Free cancellation
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search Status */}
          {searching && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <div className="text-blue-800 text-sm">
                  Searching RateHawk for available hotels...
                </div>
              </div>
            </div>
          )}

          {/* Debug Information (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
              <strong>Debug Info:</strong>
              <br />• Backend URL: http://localhost:3001
              <br />• Selected destination: {location} → {destinationMapping[location] || 'Not mapped'}
              <br />• Guests format: {guests} guests, {rooms} room(s) → {JSON.stringify(Array.from({ length: parseInt(rooms) || 1 }, () => ({ adults: Math.max(1, Math.floor((parseInt(guests) || 2) / (parseInt(rooms) || 1))) })))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};