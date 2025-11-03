import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {  MailIcon,  UserIcon, BriefcaseIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    agency_name: "",
    legal_name: "",
    city: "",
    address: "",
    actual_address_matches: false,
    itn: "",
  });

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/users`, formData);
      console.log("Success:", res.data);
      console.log("Success:", res.data.success);

      toast.success(res.data.success || "Registration successful! Please check your email for verification code.");

      // Store email for verification process
      console.log('📧 Storing email for verification:', formData.email);
      localStorage.setItem('pendingVerificationEmail', formData.email);

      // Reset form
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        agency_name: "",
        legal_name: "",
        city: "",
        address: "",
        actual_address_matches: false,
        itn: "",
      });

      // Redirect to email verification page
      console.log('🔄 Redirecting to email verification with email:', formData.email);
      navigate('/auth/email-verification', { 
        state: { email: formData.email } 
      });



    } catch (err) {
      console.error("Error:", err);
      alert("Registration failed!");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Section - Image */}
      <div 
        className="hidden md:block w-[60%] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Header.png')",
        }}
      />

      {/* Right Section - Auth Form */}
      <div className="w-full md:w-[40%] bg-[#f3ecdc] p-8 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white rounded-[30px] shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="font-heading-big text-3xl text-app-accent mb-2">
                Create Account
              </h1>
              <p className="text-[color:var(--body)] text-sm">
                Join us to find your perfect home
              </p>
            </div>

            
<form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* First + Last name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="First Name"
                        className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                        required
                      />
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                    </div>
                    <div className="relative">
                      <Input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Last Name"
                        className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                        required
                      />
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                      required
                    />
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                  </div>

                  {/* Phone */}
                  <div className="flex items-center">
                    <select
                      name="countryCode"
                      onChange={handleChange}
                      required
                      className="border border-gray-300 bg-[#f0f0f0] rounded-l-[15px] p-3 text-sm text-gray-700"
                    >
                      <option value="+1">US (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+49">DE (+49)</option>
                    </select>
                    <input
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className="border border-gray-300 bg-[#f0f0f0] rounded-r-[15px] p-3 text-sm text-gray-700 flex-grow"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="relative">
                    <Input
                      name="agency_name"
                      value={formData.agency_name}
                      onChange={handleChange}
                      type="text"
                      required
                      placeholder="Business Name"
                      className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    />
                    <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] py-3 rounded-[15px]"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <Input
                    name="legal_name"
                    value={formData.legal_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Legal entity name"
                    className="pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    required
                  />

                  <Input
                    name="itn"
                    value={formData.itn}
                    onChange={handleChange}
                    type="number"
                    placeholder="ITN (Individual Taxpayer Number)"
                    className="pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    required
                  />

                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="Legal entity city"
                    className="pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    required
                  />

                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    placeholder="Legal address"
                    className="pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none w-full"
                    required
                  />

                  <div className="flex items-center space-x-2">
                    <input
                      name="actual_address_matches"
                      type="checkbox"
                      checked={formData.actual_address_matches}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 cursor-pointer border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">
                      I am part of Host/Agency chain/Franchise
                    </label>
                  </div>

                  <p className="text-xs text-gray-500">
                    By clicking "Complete Registration", you accept the offer.
                  </p>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-gray-300 text-gray-700 hover:text-white py-3 rounded-[15px]"
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] py-3 rounded-[15px]"
                    >
                      Complete Register
                    </Button>
                  </div>
                </div>
              )}
            </form>                


            <div className="mt-6 text-center">
              <p className="text-sm text-[color:var(--body)]">
                Already have an account?
                <Link
                  to="/auth/login"
                  className="ml-2 text-app-primary hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};