import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { 
  MapPinIcon, 
  NavigationIcon, 
  MapIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  ZoomInIcon,
  ZoomOutIcon
} from "lucide-react";

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = 'AIzaSyCVsHWhcuV8_s8vTQPmT6YjAm9zipVUsb4';

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface MapSectionProps {
  hotel: any;
  searchContext: any;
}

interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
  rating?: number;
  icon: string;
}

// Google Maps API loader
const loadGoogleMaps = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    // Check if script is already loading
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for existing script to load
      const checkGoogle = () => {
        if (window.google && window.google.maps) {
          resolve(window.google);
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps failed to load'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'));
    };
    
    document.head.appendChild(script);
  });
};

export const MapSection = ({ hotel, searchContext }: MapSectionProps): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get hotel coordinates (mock data - in real app you'd get this from geocoding)
  const getHotelCoordinates = () => {
    // Mock coordinates based on destination
    const coordinatesMap: { [key: string]: { lat: number; lng: number } } = {
      "Rio de Janeiro, Brazil": { lat: -22.9068, lng: -43.1729 },
      "New York, USA": { lat: 40.7128, lng: -74.0060 },
      "London, UK": { lat: 51.5074, lng: -0.1278 },
      "Tokyo, Japan": { lat: 35.6762, lng: 139.6503 },
      "Paris, France": { lat: 48.8566, lng: 2.3522 },
      "Bangkok, Thailand": { lat: 13.7563, lng: 100.5018 },
      "Singapore": { lat: 1.3521, lng: 103.8198 },
      "Las Vegas, USA": { lat: 36.1699, lng: -115.1398 },
      "Dubai, UAE": { lat: 25.2048, lng: 55.2708 },
      "Rome, Italy": { lat: 41.9028, lng: 12.4964 },
      "Los Angeles, USA": { lat: 34.0522, lng: -118.2437 }
    };

    return coordinatesMap[searchContext.destination] || { lat: 0, lng: 0 };
  };

  // Generate nearby places (mock data)
  const generateNearbyPlaces = (): NearbyPlace[] => {
    const placeTypes = [
      { name: "Airport", type: "Transportation", icon: "✈️", distances: ["15 km", "25 km", "12 km"] },
      { name: "City Center", type: "Landmark", icon: "🏛️", distances: ["2 km", "5 km", "1 km"] },
      { name: "Shopping Mall", type: "Shopping", icon: "🛍️", distances: ["500 m", "1.2 km", "800 m"] },
      { name: "Beach", type: "Recreation", icon: "🏖️", distances: ["3 km", "8 km", "1.5 km"] },
      { name: "Restaurant District", type: "Dining", icon: "🍴", distances: ["300 m", "600 m", "200 m"] },
      { name: "Metro Station", type: "Transportation", icon: "🚇", distances: ["400 m", "800 m", "150 m"] },
      { name: "Hospital", type: "Medical", icon: "🏥", distances: ["1.2 km", "2 km", "900 m"] },
      { name: "Tourist Attraction", type: "Landmark", icon: "🎭", distances: ["1 km", "3 km", "700 m"] }
    ];

    return placeTypes.slice(0, 6).map((place, index) => ({
      name: place.name,
      type: place.type,
      distance: place.distances[index % 3],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0 rating
      icon: place.icon
    }));
  };

  // Initialize map
  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      setLoading(true);
      setError(null);

      const google = await loadGoogleMaps();
      const coordinates = getHotelCoordinates();

      if (coordinates.lat === 0 && coordinates.lng === 0) {
        throw new Error('Location coordinates not available');
      }

      // Create map
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 14,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      // Add hotel marker
      const hotelMarker = new google.maps.Marker({
        position: coordinates,
        map: mapInstance,
        title: hotel.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#588157"/>
              <path d="M20 10C16.69 10 14 12.69 14 16C14 20.5 20 30 20 30S26 20.5 26 16C26 12.69 23.31 10 20 10ZM20 18.5C18.62 18.5 17.5 17.38 17.5 16S18.62 13.5 20 13.5S22.5 14.62 22.5 16S21.38 18.5 20 18.5Z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        }
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">${hotel.name}</h3>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">${hotel.location}</p>
            <div style="display: flex; align-items: center; gap: 5px;">
              ${Array.from({length: hotel.rating}, () => '⭐').join('')}
              <span style="font-size: 12px; color: #999;">${hotel.rating} stars</span>
            </div>
          </div>
        `
      });

      hotelMarker.addListener('click', () => {
        infoWindow.open(mapInstance, hotelMarker);
      });

      setMap(mapInstance);
      setNearbyPlaces(generateNearbyPlaces());
      setMapLoaded(true);

    } catch (err: any) {
      console.error('Map initialization error:', err);
      setError(err.message || 'Failed to load map');
    } finally {
      setLoading(false);
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    initializeMap();
  }, []);

  // Map controls
  const zoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const zoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const centerOnHotel = () => {
    if (map) {
      const coordinates = getHotelCoordinates();
      map.setCenter(coordinates);
      map.setZoom(14);
    }
  };

  const openInGoogleMaps = () => {
    const coordinates = getHotelCoordinates();
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  // Get place type color
  const getPlaceTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Transportation': 'bg-blue-100 text-blue-700',
      'Landmark': 'bg-purple-100 text-purple-700',
      'Shopping': 'bg-pink-100 text-pink-700',
      'Recreation': 'bg-green-100 text-green-700',
      'Dining': 'bg-orange-100 text-orange-700',
      'Medical': 'bg-red-100 text-red-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading-big text-app-accent mb-2">
          Location & Map
        </h2>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-600" />
          <p className="text-gray-600">{hotel.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="rounded-[20px] border-gray-200 overflow-hidden">
            <CardContent className="p-0 relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <RefreshCwIcon className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="h-96 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Map Unavailable</h3>
                    <p className="text-gray-500 text-sm mb-4">{error}</p>
                    <Button onClick={initializeMap} variant="outline" size="sm">
                      <RefreshCwIcon className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {/* Google Map */}
              <div
                ref={mapRef}
                className="w-full h-96"
                style={{ minHeight: '400px' }}
              />

              {/* Map Controls */}
              {mapLoaded && (
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                    <Button
                      onClick={zoomIn}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 rounded-none hover:bg-gray-100"
                    >
                      <ZoomInIcon className="w-4 h-4" />
                    </Button>
                    <div className="border-t border-gray-200" />
                    <Button
                      onClick={zoomOut}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 rounded-none hover:bg-gray-100"
                    >
                      <ZoomOutIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={centerOnHotel}
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                    title="Center on hotel"
                  >
                    <NavigationIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Open in Google Maps */}
              <div className="absolute bottom-4 left-4">
                <Button
                  onClick={openInGoogleMaps}
                  variant="default"
                  size="sm"
                  className="bg-app-primary hover:bg-app-primary/90"
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nearby Places */}
        <div className="lg:col-span-1">
          <Card className="rounded-[20px] border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading-standar text-app-accent mb-4">
                What's Nearby
              </h3>
              
              <div className="space-y-3">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{place.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {place.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPlaceTypeColor(place.type)}`}
                          >
                            {place.type}
                          </Badge>
                          {place.rating && (
                            <span className="text-xs text-gray-500">
                              ⭐ {place.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {place.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transportation Note */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <MapPinIcon className="w-4 h-4 inline mr-1" />
                  Walking distances are approximate. Actual travel time may vary.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Location Summary */}
      <Card className="mt-6 bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Perfect Location in {searchContext.destination}
              </h4>
              <p className="text-sm text-gray-600">
                Close to major attractions, dining, and transportation
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={openInGoogleMaps}>
                <NavigationIcon className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};