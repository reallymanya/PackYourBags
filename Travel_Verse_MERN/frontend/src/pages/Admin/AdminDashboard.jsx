import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  TicketIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    tours: 0,
    users: 0,
    bookings: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is admin before fetching
    if (!user) {
      setError('Please log in to access the admin panel');
      setLoading(false);
      return;
    }
    
    if (user.role !== 'admin') {
      setError('Access denied. You must be an admin to view this page.');
      setLoading(false);
      return;
    }
    
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const [toursRes, usersRes, bookingsRes, reviewsRes] = await Promise.all([
        fetch(`${BASE_URL}/tours`, {
          credentials: 'include',
        }),
        fetch(`${BASE_URL}/users`, {
          credentials: 'include',
        }),
        fetch(`${BASE_URL}/booking`, {
          credentials: 'include',
        }),
        fetch(`${BASE_URL}/review/all`, {
          credentials: 'include',
        }),
      ]);

      // Check if any request failed
      const errors = [];
      
      if (!toursRes.ok) {
        const errorData = await toursRes.json().catch(() => ({ message: 'Failed to fetch tours' }));
        errors.push(`Tours: ${errorData.message || toursRes.status}`);
      }
      if (!usersRes.ok) {
        const errorData = await usersRes.json().catch(() => ({ message: 'Failed to fetch users' }));
        if (usersRes.status === 403) {
          errors.push('Users: Access denied. Please ensure you are logged in as an admin.');
        } else {
          errors.push(`Users: ${errorData.message || usersRes.status}`);
        }
      }
      if (!bookingsRes.ok) {
        const errorData = await bookingsRes.json().catch(() => ({ message: 'Failed to fetch bookings' }));
        if (bookingsRes.status === 403) {
          errors.push('Bookings: Access denied. Please ensure you are logged in as an admin.');
        } else {
          errors.push(`Bookings: ${errorData.message || bookingsRes.status}`);
        }
      }
      if (!reviewsRes.ok) {
        const errorData = await reviewsRes.json().catch(() => ({ message: 'Failed to fetch reviews' }));
        if (reviewsRes.status === 403) {
          errors.push('Reviews: Access denied. Please ensure you are logged in as an admin.');
        } else {
          errors.push(`Reviews: ${errorData.message || reviewsRes.status}`);
        }
      }

      if (errors.length > 0) {
        setError(errors.join('\n'));
        console.error('API Errors:', errors);
      }

      const toursData = toursRes.ok ? await toursRes.json() : { data: [] };
      const usersData = usersRes.ok ? await usersRes.json() : { data: [] };
      const bookingsData = bookingsRes.ok ? await bookingsRes.json() : { data: [] };
      const reviewsData = reviewsRes.ok ? await reviewsRes.json() : { data: [] };

      setStats({
        tours: toursData?.data?.length || 0,
        users: usersData?.data?.length || 0,
        bookings: bookingsData?.data?.length || 0,
        reviews: reviewsData?.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch dashboard data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Tours',
      value: stats.tours,
      icon: HomeIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Total Users',
      value: stats.users,
      icon: UserGroupIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Total Bookings',
      value: stats.bookings,
      icon: TicketIcon,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Total Reviews',
      value: stats.reviews,
      icon: StarIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
        <p className="text-red-700 whitespace-pre-line">{error}</p>
        <div className="mt-4 text-sm text-red-600">
          <p>Current user: {user?.username || 'Not logged in'}</p>
          <p>User role: {user?.role || 'Not set'}</p>
          <p className="mt-2">If you believe you should have admin access, please:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Log out and log back in</li>
            <li>Contact the system administrator to verify your role</li>
            <li>Ensure your account has the 'admin' role in the database</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/tours"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Manage Tours</h3>
            <p className="text-sm text-gray-600 mt-1">Add, edit, or delete tours</p>
          </a>
          <a
            href="/admin/users"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-1">View and manage user accounts</p>
          </a>
          <a
            href="/admin/bookings"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">View Bookings</h3>
            <p className="text-sm text-gray-600 mt-1">Monitor all tour bookings</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
