'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order, ServiceBooking } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Placeholder types - will be replaced with actual Supabase types
type Order = {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
};

type ServiceBooking = {
  id: number;
  service_type: string;
  device_model: string;
  issue_description: string;
  status: string;
  created_at: string;
};

export default function ProfilePage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'services'>('profile');

  // In a real app, this would fetch from Supabase
  useEffect(() => {
    if (!isLoaded || !user) return;

    // Placeholder data - would be replaced with actual Supabase fetch
    setOrders([
      { id: 1, total_amount: 'Rp 15,000,000', status: 'completed', created_at: '2023-05-15' },
      { id: 2, total_amount: 'Rp 2,500,000', status: 'pending', created_at: '2023-06-20' },
    ]);

    setServiceBookings([
      { id: 1, service_type: 'Screen Replacement', device_model: 'iPhone 14 Pro', issue_description: 'Cracked screen', status: 'completed', created_at: '2023-04-10' },
      { id: 2, service_type: 'Battery Replacement', device_model: 'iPhone 13', issue_description: 'Battery swelling', status: 'in progress', created_at: '2023-07-15' },
    ]);
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <UserButton />
      </div>

      <Card className="border border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-900">My Account</CardTitle>
          <CardDescription className="text-gray-600">Manage your profile and view your history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('services')}
              >
                Service Bookings
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border border-gray-200">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{user.fullName || user.emailAddresses[0].emailAddress}</h2>
                    <p className="text-gray-600">Member since {user.createdAt?.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{user.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.emailAddresses[0].emailAddress}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-900">Order History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.created_at}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total_amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-900">Service Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {serviceBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.device_model}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.issue_description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}