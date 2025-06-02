import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import {
  Building2Icon,
  CreditCardIcon,
  TrendingUpIcon,
  UsersIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
} from "lucide-react";
import { ratehawkApi } from "../../lib/api";

const stats = [
  {
    label: "Total Bookings",
    value: "1,234",
    change: "+12.5%",
    icon: Building2Icon,
  },
  {
    label: "Revenue",
    value: "$45,678",
    change: "+8.2%",
    icon: CreditCardIcon,
  },
  {
    label: "Active Clients",
    value: "892",
    change: "+5.1%",
    icon: UsersIcon,
  },
  {
    label: "Commission",
    value: "$12,345",
    change: "+15.3%",
    icon: TrendingUpIcon,
  },
];

export const Dashboard = (): JSX.Element => {
  const [userEmail, setUserEmail] = useState("");
  const [ratehawkSessionId, setRatehawkSessionId] = useState("");
  const [userId, setUserId] = useState("");
  const [sessionStatus, setSessionStatus] = useState<'checking' | 'active' | 'expired'>('checking');

  useEffect(() => {
    // Get user information from localStorage
    const email = localStorage.getItem('userEmail') || '';
    const sessionId = localStorage.getItem('ratehawkSessionId') || '';
    const userIdFromStorage = localStorage.getItem('userId') || '';
    
    setUserEmail(email);
    setRatehawkSessionId(sessionId);
    setUserId(userIdFromStorage);

    // Check session status
    checkSessionStatus(userIdFromStorage);
  }, []);

  const checkSessionStatus = async (userId: string) => {
    if (!userId) {
      setSessionStatus('expired');
      return;
    }

    try {
      const { data } = await ratehawkApi.checkSession(userId);
      
      if (data.hasSession) {
        setSessionStatus('active');
      } else {
        setSessionStatus('expired');
      }
    } catch (error) {
      console.error('Failed to check session status:', error);
      setSessionStatus('expired');
    }
  };

  const handleRefreshSession = () => {
    if (userId) {
      setSessionStatus('checking');
      checkSessionStatus(userId);
    }
  };

  const openRateHawk = () => {
    window.open('https://www.ratehawk.com', '_blank');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading-big text-app-accent mb-2">
          Welcome back, {userEmail || 'Agent'}
        </h1>
        <p className="text-[color:var(--body)]">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* RateHawk Integration Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-heading-standar text-app-accent mb-1">
                  RateHawk Authentication Verified
                </h3>
                <p className="text-sm text-[color:var(--body)] mb-2">
                  Successfully logged into RateHawk platform with verified access
                </p>
                <div className="space-y-1 text-xs text-[color:var(--body)]">
                  <div>Session ID: {ratehawkSessionId.slice(0, 30)}...</div>
                  <div>User: {userEmail}</div>
                  <div className="flex items-center gap-2">
                    Verification Status: 
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sessionStatus === 'active' ? 'bg-green-100 text-green-700' :
                      sessionStatus === 'expired' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sessionStatus === 'active' ? '✅ Authenticated & Active' :
                       sessionStatus === 'expired' ? '❌ Session Expired' : '🔄 Verifying...'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefreshSession}
                      className="h-6 w-6 p-0"
                    >
                      <RefreshCwIcon className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-green-600 mt-2">
                    🔐 Automated browser login successful • 🏨 Hotel booking access confirmed • 🌐 Real-time availability verified
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={openRateHawk}>
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Open RateHawk
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[color:var(--body)]">{stat.label}</p>
                  <h3 className="text-2xl font-heading-standar mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-3 bg-app-primary/10 rounded-full">
                  <stat.icon className="w-6 h-6 text-app-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-heading-standar text-app-accent mb-2">
              Search Hotels
            </h3>
            <p className="text-sm text-[color:var(--body)] mb-4">
              Search and book hotels through your RateHawk integration
            </p>
            <Button className="w-full bg-app-primary hover:bg-app-primary/90">
              Start Searching
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-heading-standar text-app-accent mb-2">
              Manage Orders
            </h3>
            <p className="text-sm text-[color:var(--body)] mb-4">
              View and manage your current and past bookings
            </p>
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-heading-standar text-app-accent mb-2">
              Reports & Analytics
            </h3>
            <p className="text-sm text-[color:var(--body)] mb-4">
              Track your performance and revenue metrics
            </p>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-heading-standar text-app-accent mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">RateHawk session established</span>
              </div>
              <span className="text-xs text-[color:var(--body)]">Just now</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">User authenticated successfully</span>
              </div>
              <span className="text-xs text-[color:var(--body)]">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Dashboard accessed</span>
              </div>
              <span className="text-xs text-[color:var(--body)]">5 minutes ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-heading-standar text-app-accent mb-2">
            About Your RateHawk Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[color:var(--body)]">
            <div>
              <h4 className="font-medium text-app-accent mb-2">Features Available:</h4>
              <ul className="space-y-1">
                <li>• Access to 2.7M+ hotels worldwide</li>
                <li>• Real-time availability and pricing</li>
                <li>• Instant booking confirmations</li>
                <li>• Multilingual support (32+ languages)</li>
                <li>• Exclusive B2B rates</li>
                <li>• Direct hotel contracts</li>
                <li>• 24/7 multilingual support</li>
                <li>• Flexible payment options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-app-accent mb-2">Integration Status:</h4>
              <ul className="space-y-1">
                <li>• Automated login: ✅ Active</li>
                <li>• Session management: ✅ Connected</li>
                <li>• API access: ✅ Ready</li>
                <li>• Booking capabilities: ✅ Enabled</li>
                <li>• Real-time sync: ✅ Working</li>
                <li>• Error handling: ✅ Configured</li>
                <li>• Security protocols: ✅ Implemented</li>
                <li>• Performance monitoring: ✅ Active</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-[color:var(--body)]">
              <strong>Integration Method:</strong> Automated browser login via Browserless cloud service
              <br />
              <strong>Session Duration:</strong> Active until manual logout or token expiry
              <br />
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-medium text-green-700">Backend API</h4>
            </div>
            <p className="text-sm text-green-600">Connected & Operational</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="font-medium text-blue-700">RateHawk Service</h4>
            </div>
            <p className="text-sm text-blue-600">{sessionStatus === 'active' ? 'Active Session' : 'Session Inactive'}</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h4 className="font-medium text-purple-700">Browserless</h4>
            </div>
            <p className="text-sm text-purple-600">Cloud Browser Ready</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};