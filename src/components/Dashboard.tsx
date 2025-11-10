import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getCurrentUser, logout } from "../lib/auth";
import logoImage from "figma:asset/7e933fbd1a1da41e7338e5e7ec861efc7a14b875.png";

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="PathFinder Logo" className="w-10 h-10" />
            <span className="text-black">PathFinder</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-lg"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {user?.fullName}!</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and edit your profile information.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Your activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track your progress and achievements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Adjust preferences and notifications.</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-900 mb-2">Demo Authentication System</h3>
          <p className="text-blue-800">
            This is a demo implementation using localStorage and password hashing. 
            Your credentials are stored locally in your browser with hashed passwords.
          </p>
          <p className="text-blue-800 mt-2">
            <strong>Note:</strong> For production use, implement proper backend authentication 
            with a service like Supabase.
          </p>
        </div>
      </main>
    </div>
  );
}
