import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon, BriefcaseIcon } from "lucide-react";

export const Auth = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-[color:var(--body)] text-sm">
                {isLogin 
                  ? "Sign in to access your account" 
                  : "Join us to find your perfect home"}
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="First Name"
                          className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                          required
                        />
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                          required
                        />
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Business Name (Optional)"
                        className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                      />
                      <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Current Travel Agency (Optional)"
                        className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                      />
                      <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                    </div>
                  </>
                )}

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-12 pr-4 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    required
                  />
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-12 pr-12 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                    required
                  />
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-app-accent"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {!isLogin && (
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="pl-12 pr-12 py-3 rounded-[15px] bg-[#f0f0f0] border-none"
                      required
                    />
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-accent w-5 h-5" />
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-app-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button className="w-full bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] py-3 rounded-[15px]">
                <span className="font-accent">
                  {isLogin ? "Sign In" : "Create Account"}
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[color:var(--body)]">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-app-primary hover:underline font-medium"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
