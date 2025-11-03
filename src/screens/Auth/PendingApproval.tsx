import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ClockIcon, MailIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface UserStatus {
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  email_Verification: 'verified' | 'unverified';
  first_name: string;
  last_name: string;
}

export const PendingApproval = (): JSX.Element => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingVerificationEmail');
    const storedUserEmail = localStorage.getItem('userEmail');
    const email = pendingEmail || storedUserEmail;
    
    console.log('🔍 PendingApproval - Email check:', {
      pendingEmail,
      storedUserEmail,
      selectedEmail: email
    });
    
    if (!email) {
      console.log('❌ No email found in localStorage, redirecting to login');
      navigate('/auth/login');
      return;
    }

    setUserEmail(email);
    checkUserStatus(email);
    
    // Set up interval to check status every 30 seconds
    const interval = setInterval(() => {
      checkUserStatus(email);
    }, 30000);
    
    setCheckInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [navigate]);

  const checkUserStatus = async (email: string) => {
    console.log('🔍 Checking user status for email:', email);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/status/${email}`);
      console.log('📡 User status response:', response.data);
      
      if (response.data.success && response.data.data) {
        const user = response.data.data;
        console.log('👤 User data received:', user);
        setUserStatus(user);
        
        // If user is approved, redirect to login
        if (user.status === 'approved') {
          console.log('✅ User approved, redirecting to login');
          // Clear pending verification email and redirect to login
          localStorage.removeItem('pendingVerificationEmail');
          navigate('/auth/login', { 
            state: { 
              message: "Your account has been approved! Please login to access your dashboard.",
              approvedEmail: email 
            }
          });
        } else {
          console.log('⏳ User status:', user.status, '- staying on pending page');
        }
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      // Don't redirect on error, just log it
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = () => {
    if (!userStatus) return <ClockIcon className="w-16 h-16 text-yellow-600 mx-auto mb-4" />;
    
    switch (userStatus.status) {
      case 'approved':
        return <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />;
      case 'rejected':
        return <XCircleIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />;
      default:
        return <ClockIcon className="w-16 h-16 text-yellow-600 mx-auto mb-4" />;
    }
  };

  const getStatusMessage = () => {
    if (!userStatus) {
      return {
        title: "Checking Account Status...",
        subtitle: "Please wait while we verify your account status.",
        showActions: false
      };
    }

    switch (userStatus.status) {
      case 'approved':
        return {
          title: "Account Approved!",
          subtitle: "Your account has been approved. Redirecting to login...",
          showActions: false
        };
      case 'rejected':
        return {
          title: "Account Not Approved",
          subtitle: "Unfortunately, your account application was not approved. Please contact support for more information.",
          showActions: true
        };
      default:
        return {
          title: "Account Under Review",
          subtitle: `Hi ${userStatus.first_name}! Your account is currently being reviewed by our team.`,
          showActions: true
        };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <main className="flex min-h-screen">
      {/* Left Section - Image */}
      <div 
        className="hidden md:block w-[60%] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Header.png')",
        }}
      />

      {/* Right Section - Status Page */}
      <div className="w-full md:w-[40%] bg-[#f3ecdc] p-8 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white rounded-[30px] shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              {getStatusIcon()}
              <h1 className="font-heading-big text-2xl text-app-accent mb-2">
                {statusMessage.title}
              </h1>
              <p className="text-[color:var(--body)] text-sm">
                {statusMessage.subtitle}
              </p>
            </div>

            {userStatus && (
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-[15px]">
                  <h3 className="font-medium text-app-accent mb-2">Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[color:var(--body)]">Name:</span>
                      <span className="text-app-accent">{userStatus.first_name} {userStatus.last_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--body)]">Email:</span>
                      <span className="text-app-accent">{userStatus.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--body)]">Status:</span>
                      <span className={`font-medium ${
                        userStatus.status === 'approved' ? 'text-green-600' :
                        userStatus.status === 'rejected' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {userStatus.status.charAt(0).toUpperCase() + userStatus.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--body)]">Email Verified:</span>
                      <span className={userStatus.email_Verification === 'verified' ? 'text-green-600' : 'text-red-600'}>
                        {userStatus.email_Verification === 'verified' ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {statusMessage.showActions && (
              <div className="space-y-4">
                {userStatus?.status === 'pending' && (
                  <div className="bg-blue-50 p-4 rounded-[15px]">
                    <div className="flex items-start space-x-3">
                      <MailIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Our team is reviewing your application</li>
                          <li>• You'll receive an email notification once approved</li>
                          <li>• This page will automatically update</li>
                          <li>• You'll be redirected to login</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="flex-1 py-3 rounded-[15px]"
                  >
                    Refresh Status
                  </Button>
                  <Button
                    onClick={() => navigate('/contact')}
                    className="flex-1 bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] py-3 rounded-[15px]"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            )}

            {isChecking && (
              <div className="text-center mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-app-primary mx-auto mb-2"></div>
                <p className="text-xs text-[color:var(--body)]">Checking status...</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-[color:var(--body)]">
                This page automatically checks your status every 30 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
