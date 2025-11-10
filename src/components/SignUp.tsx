import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logoImage from "figma:asset/7e933fbd1a1da41e7338e5e7ec861efc7a14b875.png";
import { signUp } from "../lib/auth";
import { toast } from "sonner@2.0.3";

interface SignUpProps {
  onSwitchToLogin: () => void;
}

export function SignUp({ onSwitchToLogin }: SignUpProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(fullName, email, password);
      
      if (result.success) {
        toast.success(result.message);
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Switch to login page after successful signup
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <img
            src={logoImage}
            alt="PathFinder Logo"
            className="w-12 h-12"
          />
          <span className="text-black">PathFinder</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-gray-600">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              placeholder=""
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 border-0 rounded-xl px-4 py-6"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border-0 rounded-xl px-4 py-6"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border-0 rounded-xl px-4 py-6"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-gray-600"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="bg-gray-50 border-0 rounded-xl px-4 py-6"
              required
            />
          </div>

          {/* Sign up Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 mt-8"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <span className="text-gray-700">
            Have an account?{" "}
          </span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}