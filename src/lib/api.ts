// API Configuration
export const API_CONFIG = {
  // Backend server URL - matches your backend port
  BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://your-backend-domain.com'  // Replace with your production URL
    : 'http://localhost:3001',            // Local development URL

  // API endpoints
  ENDPOINTS: {
    RATEHAWK_LOGIN: '/api/ratehawk/login',
    RATEHAWK_SESSION: '/api/ratehawk/session',
    RATEHAWK_SEARCH: '/api/ratehawk/search',
    RATEHAWK_STATS: '/api/ratehawk/stats',
    RATEHAWK_TEST: '/api/ratehawk/test-auth',
    RATEHAWK_LOGOUT: '/api/ratehawk/logout',
    RATEHAWK_HOTEL_DETAILS: '/api/ratehawk/hotel/details', // Updated to new GET endpoint
    AUTH_LOGIN: '/api/auth/login',
    AUTH_REGISTER: '/api/auth/register',
    AUTH_VERIFY: '/api/auth/verify',
    AUTH_PROFILE: '/api/auth/profile',
    HEALTH: '/api/health'
  }
};

// Helper function to make API calls with better error handling
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`);
    const response = await fetch(url, defaultOptions);

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('💥 Failed to parse JSON response:', parseError);
      throw new Error(`Invalid JSON response from server (${response.status})`);
    }

    console.log(`📡 API Response: ${response.status}`, data);

    return { response, data };
  } catch (error) {
    console.error('💥 API call failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to server at ${API_CONFIG.BASE_URL}. Please check if the backend is running.`);
    }
    throw error;
  }
};

// RateHawk specific API calls
export const ratehawkApi = {
  login: async (userId: string, email: string, password: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.RATEHAWK_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ userId, email, password }),
    });
  },

  checkSession: async (userId: string) => {
    return apiCall(`${API_CONFIG.ENDPOINTS.RATEHAWK_SESSION}/${userId}`, {
      method: 'GET',
    });
  },

  searchHotels: async (searchParams: {
    userId: string;
    destination: string;
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number }>;
    residency?: string;
    currency?: string;
    page?: number;
    filters?: any;
  }) => {
    return apiCall(API_CONFIG.ENDPOINTS.RATEHAWK_SEARCH, {
      method: 'POST',
      body: JSON.stringify(searchParams),
    });
  },

  getHotelDetails: async (hotelId: string) => {
    return apiCall(`${API_CONFIG.ENDPOINTS.RATEHAWK_HOTEL_DETAILS}?hotel_id=${encodeURIComponent(hotelId)}`, {
      method: 'GET',
    });
  },

  getStats: async () => {
    return apiCall(API_CONFIG.ENDPOINTS.RATEHAWK_STATS, {
      method: 'GET',
    });
  },

  testAuth: async (email: string, password: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.RATEHAWK_TEST, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async (userId: string) => {
    return apiCall(`${API_CONFIG.ENDPOINTS.RATEHAWK_LOGOUT}/${userId}`, {
      method: 'POST',
    });
  },

  healthCheck: async () => {
    try {
      const { response, data } = await apiCall('/api/health');

      return {
        response,
        data: {
          status: data.status,
          browserless: data.services?.browserless || 'unknown',
          activeSessions: data.activeSessions || 0,
          timestamp: data.timestamp,
          services: data.services,
          uptime: data.uptime
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        response: { ok: false },
        data: {
          status: 'error',
          error: errorMessage,
          timestamp: new Date().toISOString()
        }
      };
    }
  }
};

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.AUTH_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, ratehawkEmail?: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.AUTH_REGISTER, {
      method: 'POST',
      body: JSON.stringify({ email, password, ratehawkEmail }),
    });
  },

  verify: async (token: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.AUTH_VERIFY, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  getProfile: async (token: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.AUTH_PROFILE, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
};

// Type definitions for better TypeScript support
export interface SearchParams {
  userId: string;
  destination: string;
  checkin: string;
  checkout: string;
  guests: Array<{ adults: number }>;
  residency?: string;
  currency?: string;
  page?: number;
  filters?: {
    starRating?: string[];
    priceRange?: [number, number];
    meals?: string[];
  };
}

export interface Hotel {
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

export interface SearchResponse {
  success: boolean;
  hotels: Hotel[];
  totalHotels: number;
  availableHotels: number;
  searchSessionId?: string;
  hasMorePages?: boolean;
  currentPage?: number;
  searchDuration?: string;
  timestamp?: string;
  error?: string;
  metadata?: {
    strategy?: string;
    sessionCreated?: boolean;
  };
}