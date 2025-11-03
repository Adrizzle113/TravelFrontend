import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { MailIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

export const EmailVerification = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get email from location state or localStorage
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem('pendingVerificationEmail');
    const email = emailFromState || emailFromStorage;
    
    console.log('🔍 EmailVerification - Email check:', {
      emailFromState,
      emailFromStorage,
      selectedEmail: email
    });
    
    if (!email) {
      console.log('❌ No email found, redirecting to register');
      navigate('/auth/register');
      return;
    }
    
    setUserEmail(email);
    // Ensure email is stored in localStorage
    localStorage.setItem('pendingVerificationEmail', email);
    console.log('✅ Email stored in localStorage:', email);
  }, [location.state, navigate]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/email-verification`, {
        email: userEmail,
        otp: otp
      });

      if (response.data.success) {
        setVerificationStatus('success');
        toast.success("Email verified successfully!");
        
        // Keep email in localStorage for pending approval page
        // Don't clear it here, let the pending approval page handle it
        
        // Auto-redirect to pending approval page after 3 seconds
        setTimeout(() => {
          console.log('🔄 Redirecting to pending approval page with email:', userEmail);
          console.log('📧 Current localStorage pendingVerificationEmail:', localStorage.getItem('pendingVerificationEmail'));
          navigate('/auth/pending-approval', { 
            state: { 
              message: "Email verified successfully! Your account is now under review.",
              verifiedEmail: userEmail 
            }
          });
        }, 3000);
      } else {
        setVerificationStatus('failed');
        toast.error(response.data.message || "Verification failed");
      }
    } catch (error: any) {
      setVerificationStatus('failed');
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // You might want to add a resend OTP endpoint
      toast.info("OTP sent to your email");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />;
      case 'failed':
        return <XCircleIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />;
      default:
        return <MailIcon className="w-16 h-16 text-app-primary mx-auto mb-4" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'success':
        return {
          title: "Email Verified Successfully!",
          subtitle: "Your account is being reviewed. You'll receive an email once approved.",
          showForm: false
        };
      case 'failed':
        return {
          title: "Verification Failed",
          subtitle: "The OTP you entered is incorrect. Please try again.",
          showForm: true
        };
      default:
        return {
          title: "Verify Your Email",
          subtitle: `We've sent a verification code to ${userEmail}`,
          showForm: true
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

      {/* Right Section - Verification Form */}
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

            {statusMessage.showForm && (
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="relative">
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                    disabled={isVerifying}
                  />
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                </div>

                <Button
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] py-3 rounded-[15px] disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Verify Email"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-[color:var(--body)]">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-app-primary hover:underline font-medium text-sm"
                    disabled={isVerifying}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            {verificationStatus === 'success' && (
              <div className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-[15px]">
                  <p className="text-sm text-green-700">
                    🎉 Your email has been verified! Your account is now under review.
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    You'll receive an email notification once your account is approved.
                  </p>
                </div>
                <p className="text-xs text-[color:var(--body)]">
                  Redirecting to approval status page in a few seconds...
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-[color:var(--body)]">
                Need help?
                <button
                  onClick={() => navigate('/contact')}
                  className="ml-2 text-app-primary hover:underline font-medium"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
