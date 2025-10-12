import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  status: 'pending' | 'approved' | 'rejected';
  email_Verification: 'verified' | 'unverified';
  created_at: string;
}

export const UserManagement = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/user/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (email: string, status: 'approved' | 'rejected') => {
    setActionLoading(email);
    try {
      const response = await axios.put(`http://localhost:3001/api/user/approve/${email}`, {
        status: status
      });

      if (response.data.success) {
        toast.success(`User ${status} successfully`);
        // Update local state
        setUsers(users.map(user => 
          user.email === email ? { ...user, status } : user
        ));
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(`Failed to ${status} user`);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3ecdc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto mb-4"></div>
          <h2 className="text-lg font-heading-standar text-app-accent mb-2">
            Loading Users
          </h2>
          <p className="text-sm text-[color:var(--body)]">
            Fetching user data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3ecdc] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading-big text-app-accent mb-2">
            User Management
          </h1>
          <p className="text-[color:var(--body)]">
            Manage user registrations and approvals
          </p>
        </div>

        <div className="grid gap-6">
          {users.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-[color:var(--body)]">No users found</p>
              </CardContent>
            </Card>
          ) : (
            users.map((user) => (
              <Card key={user.id} className="bg-white rounded-[15px] shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(user.status)}
                      <div>
                        <CardTitle className="text-lg text-app-accent">
                          {user.first_name} {user.last_name}
                        </CardTitle>
                        <p className="text-sm text-[color:var(--body)]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.email_Verification === 'verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.email_Verification === 'verified' ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[color:var(--body)]">
                      <p>Registered: {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      {user.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => updateUserStatus(user.email, 'approved')}
                            disabled={actionLoading === user.email}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-[10px] text-sm"
                          >
                            {actionLoading === user.email ? 'Approving...' : 'Approve'}
                          </Button>
                          <Button
                            onClick={() => updateUserStatus(user.email, 'rejected')}
                            disabled={actionLoading === user.email}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-[10px] text-sm"
                          >
                            {actionLoading === user.email ? 'Rejecting...' : 'Reject'}
                          </Button>
                        </>
                      )}
                      {user.status === 'approved' && (
                        <Button
                          onClick={() => updateUserStatus(user.email, 'rejected')}
                          disabled={actionLoading === user.email}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-[10px] text-sm"
                        >
                          {actionLoading === user.email ? 'Rejecting...' : 'Reject'}
                        </Button>
                      )}
                      {user.status === 'rejected' && (
                        <Button
                          onClick={() => updateUserStatus(user.email, 'approved')}
                          disabled={actionLoading === user.email}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-[10px] text-sm"
                        >
                          {actionLoading === user.email ? 'Approving...' : 'Approve'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={fetchUsers}
            className="bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] px-6 py-3 rounded-[15px]"
          >
            Refresh Users
          </Button>
        </div>
      </div>
    </main>
  );
};
