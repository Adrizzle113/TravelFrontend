// API Configuration
export const API_CONFIG = {
  // Update this URL to match your backend server
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com'  // Replace with your production URL
    : 'http://localhost:3001',            // Local development URL

  // Updated API endpoints to match organized backend
  ENDPOINTS: {
    RATEHAWK_LOGIN: '/api/ratehawk/login',
    RATEHAWK_SESSION: '/api/ratehawk/session',
    RATEHAWK_SEARCH: '/api/ratehawk/search',
    RATEHAWK_STATS: '/api/ratehawk/stats',
    RATEHAWK_TEST: '/api/ratehawk/test-auth',
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
    const data = await response.json();
    
    console.log(`📡 API Response: ${response.status}`, data);
    
    return { response, data };
  } catch (error) {
    console.error('💥 API call failed:', error);
    throw new Error(`Failed to connect to server: ${error}`);
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

  // ✅ FIXED: Updated guest format to match backend expectation
  searchHotels: async (searchParams: {
    userId: string;
    destination: string;
    checkin: string;
    checkout: string;
    guests: Array<{adults: number}>; // ✅ CORRECT FORMAT: Array of room objects
    residency?: string;
    currency?: string;
  }) => {
    return apiCall(API_CONFIG.ENDPOINTS.RATEHAWK_SEARCH, {
      method: 'POST',
      body: JSON.stringify(searchParams),
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

  healthCheck: async () => {
    const { response, data } = await apiCall('/api/health');
    
    // Log for debugging
    console.log('Health check response:', data);
    
    return {
      response,
      data: {
        status: data.status,
        browserless: data.services?.browserless || 'unknown',
        activeSessions: data.activeSessions || 0,
        timestamp: data.timestamp,
        services: data.services
      }
    };
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