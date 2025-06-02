import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BarChart3Icon,
  Building2Icon,
  HomeIcon,
  LogOutIcon,
  SearchIcon,
  Settings2Icon,
  ShoppingBagIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: SearchIcon,
    label: "Search Hotels",
    path: "/dashboard/search",
  },
  {
    icon: ShoppingBagIcon,
    label: "Orders",
    path: "/dashboard/orders",
  },
  {
    icon: BarChart3Icon,
    label: "Reports",
    path: "/dashboard/reports",
  },
  {
    icon: UserIcon,
    label: "Profile",
    path: "/dashboard/profile",
  },
  {
    icon: Settings2Icon,
    label: "Settings",
    path: "/dashboard/settings",
  },
];

export const DashboardLayout = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [ratehawkSessionId, setRatehawkSessionId] = useState("");

  useEffect(() => {
    // Get user information from localStorage
    const email = localStorage.getItem('userEmail') || '';
    const sessionId = localStorage.getItem('ratehawkSessionId') || '';
    setUserEmail(email);
    setRatehawkSessionId(sessionId);
  }, []);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('ratehawkSessionId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('tempLogin');
    
    // Redirect to login
    navigate('/auth/login');
  };

  return (
    <div className="flex h-screen bg-[#f3ecdc]">
      {/* Show Sidebar Button - appears when sidebar is hidden */}
      {!sidebarVisible && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarVisible(true)}
            className="group relative p-2 bg-app-accent text-white rounded-lg hover:bg-app-primary transition-colors"
            title="Show Sidebar"
          >
            <ChevronRightIcon className="w-5 h-5" />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Show Sidebar
            </div>
          </button>
        </div>
      )}

      {/* Sidebar */}
      {sidebarVisible && (
        <aside className="w-64 bg-app-accent text-white p-6 flex flex-col">
          {/* Hide Sidebar Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2Icon className="w-8 h-8" />
              <span className="font-heading-standar text-xl">Agent Portal</span>
            </div>
            <button
              onClick={() => setSidebarVisible(false)}
              className="group relative p-1 hover:bg-white/10 rounded transition-colors"
              title="Hide Sidebar"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Hide Sidebar
              </div>
            </button>
          </div>

          {/* RateHawk Status */}
          <div className="mb-6 p-3 bg-green-600/20 rounded-lg border border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">RateHawk Connected</span>
            </div>
            <div className="text-xs text-white/70">
              <div className="mb-1">User: {userEmail}</div>
              <div className="truncate">Session: {ratehawkSessionId.slice(0, 20)}...</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-app-primary text-white"
                    : "text-white/70 hover:bg-white/10"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <Button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 w-full justify-start bg-transparent hover:bg-white/10"
            >
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};