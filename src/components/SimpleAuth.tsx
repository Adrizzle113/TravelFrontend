import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SimpleAuthProps {
  children: React.ReactNode;
}

export const SimpleAuth = ({ children }: SimpleAuthProps) => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
  
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Generate user ID from email (same format as backend)
  const generateUserIdFromEmail = (email: string): string => {
    return email.replace('@', '_').replace(/\./g, '_');
  };

  const checkAuthentication = async () => {
    console.log('🔐 Starting strict authentication check...');
    
    // Check for required authentication data
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const ratehawkSessionId = localStorage.getItem('ratehawkSessionId');
    const storedUserId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const authTimestamp = localStorage.getItem('ratehawkAuthTimestamp');

    console.log('🔍 Checking authentication data...', {
      isLoggedIn,
      hasSessionId: !!ratehawkSessionId,
      hasUserId: !!storedUserId,
      hasEmail: !!userEmail,
      hasTimestamp: !!authTimestamp,
      storedUserId: storedUserId
    });

    // STRICT CHECK: All required data must be present
    if (!isLoggedIn || !ratehawkSessionId || !storedUserId || !userEmail) {
      console.log('❌ Missing required authentication data - redirecting to login');
      clearAuthData();
      setAuthStatus('invalid');
      navigate('/auth/login');
      return;
    }

    // ✅ FIXED: Generate the expected user ID from email and compare
    const expectedUserId = generateUserIdFromEmail(userEmail);
    
    if (storedUserId !== expectedUserId) {
      console.log('🔄 User ID mismatch, updating to correct format...');
      console.log(`   Stored: ${storedUserId}`);
      console.log(`   Expected: ${expectedUserId}`);
      
      // Update to the correct user ID format
      localStorage.setItem('userId', expectedUserId);
    }

    // Use the correct user ID for session validation
    const correctUserId = expectedUserId;

    // Check if session is too old (24 hours)
    if (authTimestamp) {
      const authTime = new Date(authTimestamp);
      const now = new Date();
      const hoursSinceAuth = (now.getTime() - authTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceAuth > 24) {
        console.log('⏰ Session expired (older than 24 hours) - redirecting to login');
        clearAuthData();
        setAuthStatus('invalid');
        navigate('/auth/login');
        return;
      }
    }

    // CRITICAL: Verify session with backend to ensure RateHawk session is still valid
    try {
      console.log('🔍 Verifying RateHawk session with backend...');
      console.log(`👤 Using User ID: ${correctUserId}`);
      
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://your-production-domain.com'  
        : 'http://localhost:3001';

      const response = await fetch(`${API_BASE_URL}/api/ratehawk/session/${correctUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📡 Backend session check response:', data);
      
      if (data.hasSession === true && data.sessionId) {
        console.log('✅ RateHawk session verified with backend');
        console.log(`🔑 Session ID: ${data.sessionId}`);
        console.log(`👤 Email: ${data.email}`);
        console.log(`🕒 Login time: ${data.loginTime}`);
        console.log(`⏰ Session age: ${data.sessionAge}`);
        
        // ✅ FIXED: Make sure we're using the correct user ID
        localStorage.setItem('userId', correctUserId);
        
        setAuthStatus('valid');
      } else {
        console.log('❌ Backend reports no active RateHawk session');
        console.log('🔄 User may need to login again...');
        clearAuthData();
        setAuthStatus('invalid');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('🔥 Error checking session with backend:', error);
      
      // If backend is completely down, don't allow access
      console.log('🚫 Backend unavailable - cannot verify RateHawk session, denying access');
      clearAuthData();
      setAuthStatus('invalid');
      navigate('/auth/login');
    }
  };

  const clearAuthData = () => {
    console.log('🗑️ Clearing all authentication data');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('ratehawkSessionId');
    localStorage.removeItem('ratehawkLoginUrl');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('ratehawkAuthTimestamp');
    localStorage.removeItem('tempLogin');
    localStorage.removeItem('hotelSearchResults');
    localStorage.removeItem('selectedHotel');
  };

  // Show loading while checking authentication
  if (authStatus === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3ecdc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto mb-4"></div>
          <h2 className="text-lg font-heading-standar text-app-accent mb-2">
            Verifying RateHawk Authentication
          </h2>
          <p className="text-sm text-[color:var(--body)]">
            Checking your RateHawk session status...
          </p>
          <div className="mt-4 text-xs text-[color:var(--body)] bg-blue-50 p-3 rounded-lg max-w-sm mx-auto">
            <div>🔍 Validating session data</div>
            <div>🔗 Verifying backend connection</div>
            <div>🏨 Confirming RateHawk access</div>
            <div>🔐 Checking authentication status</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if authentication failed
  if (authStatus === 'invalid') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3ecdc]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">🚫</span>
          </div>
          <h2 className="text-lg font-heading-standar text-red-600 mb-2">
            RateHawk Authentication Required
          </h2>
          <p className="text-sm text-[color:var(--body)] mb-4">
            Valid RateHawk credentials are required to access this area.
          </p>
          <div className="text-xs text-gray-600 bg-red-50 p-3 rounded-lg max-w-sm mx-auto mb-4">
            <div>❌ No valid RateHawk session found</div>
            <div>🔄 Redirecting to login page...</div>
          </div>
        </div>
      </div>
    );
  }

  // Only render protected content if authentication is fully validated
  return <>{children}</>;
};