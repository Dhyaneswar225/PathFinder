import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logoImage from "figma:asset/7e933fbd1a1da41e7338e5e7ec861efc7a14b875.png";
import { login } from "../lib/auth";
import { toast } from "sonner@2.0.3";

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

export function Login({ onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success(result.message);
        setEmail("");
        setPassword("");
        onLoginSuccess();
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
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
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
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border-0 rounded-xl px-4 py-6"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Sign up Link */}
        <div className="mt-8 text-center">
          <span className="text-gray-700">
            Don't have an account?{" "}
          </span>
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}