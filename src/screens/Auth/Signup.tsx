import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  BuildingIcon,
  CheckCircleIcon, 
  AlertCircleIcon, 
  Loader2,
  ClockIcon,
  RocketIcon,
  ArrowLeftIcon
} from "lucide-react";

interface SignupFormData {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  companyName: string;
}

interface SignupStatus {
  success: boolean;
  userId?: string;
  status?: string;
  estimatedTime?: string;
  error?: string;
}

export const Signup = (): JSX.Element => {
  // Form state
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    countryCode: 'US',
    phoneNumber: '',
    companyName: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [signupStatus, setSignupStatus] = useState<SignupStatus | null>(null);
  const [statusPolling, setStatusPolling] = useState(false);
  
  const navigate = useNavigate();

  // Update form data
  const updateFormData = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'countryCode', 'phoneNumber', 'companyName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof SignupFormData]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      console.log('🚀 Starting signup process...');
      
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📡 Signup response:', data);

      if (data.success) {
        console.log('✅ Signup initiated successfully!');
        setSuccess(true);
        setSignupStatus(data);
        
        // Start polling for status updates
        if (data.userId) {
          startStatusPolling(data.userId);
        }
        
      } else {
        console.log('❌ Signup failed:', data.error);
        setError(data.error || "Signup failed. Please try again.");
      }

    } catch (err: any) {
      console.error('💥 Signup error:', err);
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Poll signup status
  const startStatusPolling = (userId: string) => {
    setStatusPolling(true);
    
    const pollStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/signup-status/${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setSignupStatus(prev => ({
            ...prev,
            ...data
          }));
          
          // Stop polling if completed or failed
          if (data.status === 'completed' || data.status === 'failed') {
            setStatusPolling(false);
            if (data.status === 'completed') {
              // Navigate to login after success
              setTimeout(() => {
                navigate('/login');
              }, 3000);
            }
            return;
          }
        }
        
      } catch (error) {
        console.error('Polling error:', error);
      }
    };
    
    // Poll every 5 seconds
    const interval = setInterval(pollStatus, 5000);
    
    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(interval);
      setStatusPolling(false);
    }, 600000);
    
    // Cleanup function
    return () => clearInterval(interval);
  };

  // Country options
  const countryOptions = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'IN', name: 'India' },
    { code: 'CN', name: 'China' },
    { code: 'RU', name: 'Russia' },
    { code: 'ZA', name: 'South Africa' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardContent className="p-8">
          
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <RocketIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Travel Account
            </h1>
            <p className="text-gray-600">
              Join thousands of travelers getting exclusive hotel rates
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Account Creation Started!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      {signupStatus?.estimatedTime && `Estimated completion: ${signupStatus.estimatedTime}`}
                    </p>
                  </div>
                </div>
                
                {/* Status Updates */}
                {signupStatus && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        signupStatus.status === 'initiated' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                      <span>Setting up your account</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        signupStatus.status === 'ratehawk_created' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span>Activating hotel booking access</span>
                      {statusPolling && signupStatus.status !== 'ratehawk_created' && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        signupStatus.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span>Sending welcome email</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircleIcon className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-800">Signup Failed</h4>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Signup Form */}
          {!success && (
            <form className="space-y-6" onSubmit={handleSignup}>
              
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                </div>
                
                {/* Email */}
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your Email Address *"
                    className="pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                    disabled={loading}
                  />
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name *"
                    className="py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                    disabled={loading}
                  />
                  
                  <Input
                    type="text"
                    placeholder="Middle Name"
                    className="py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.middleName}
                    onChange={(e) => updateFormData('middleName', e.target.value)}
                    disabled={loading}
                  />
                  
                  <Input
                    type="text"
                    placeholder="Last Name *"
                    className="py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <PhoneIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                </div>
                
                {/* Country and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={formData.countryCode}
                    onChange={(e) => updateFormData('countryCode', e.target.value)}
                    required
                    disabled={loading}
                  >
                    {countryOptions.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      className="pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                      required
                      disabled={loading}
                    />
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Company Name */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Company Name *"
                    className="pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    required
                    disabled={loading}
                  />
                  <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Your Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                    disabled={loading}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Processing Info */}
          {success && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <ClockIcon className="w-5 h-5" />
                <span className="font-medium">What happens next?</span>
              </div>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Your hotel booking system is being configured</li>
                <li>• You'll receive an email with your login credentials</li>
                <li>• Process typically completes in 2-5 minutes</li>
                <li>• You'll be redirected to login automatically</li>
              </ul>
              
              {signupStatus?.status === 'completed' && (
                <div className="mt-3 p-2 bg-green-100 rounded border border-green-200">
                  <p className="text-green-700 text-sm font-medium">
                    ✅ Account ready! Redirecting to login in 3 seconds...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Benefits Section */}
          {!success && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">What you'll get:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>Exclusive hotel rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};