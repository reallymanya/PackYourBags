import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const ItineraryPlanner = () => {
  const { user } = useContext(AuthContext);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    notes: '',
    isPublic: false,
  });

  useEffect(() => {
    if (user) {
      fetchItineraries();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchItineraries = async () => {
    try {
      const res = await fetch(`${BASE_URL}/itinerary/user/all`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setItineraries(data.data);
      }
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItinerary(null);
    setFormData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      notes: '',
      isPublic: false,
    });
    setShowModal(true);
  };

  const handleEdit = (itinerary) => {
    setEditingItinerary(itinerary);
    setFormData({
      title: itinerary.title,
      destination: itinerary.destination,
      startDate: itinerary.startDate ? new Date(itinerary.startDate).toISOString().split('T')[0] : '',
      endDate: itinerary.endDate ? new Date(itinerary.endDate).toISOString().split('T')[0] : '',
      notes: itinerary.notes || '',
      isPublic: itinerary.isPublic || false,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItinerary
        ? `${BASE_URL}/itinerary/${editingItinerary._id}`
        : `${BASE_URL}/itinerary`;
      const method = editingItinerary ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        userId: String(user._id || user.id),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        fetchItineraries();
        setShowModal(false);
        setEditingItinerary(null);
        alert(editingItinerary ? 'Itinerary updated successfully' : 'Itinerary created successfully');
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving itinerary:', error);
      alert('Failed to save itinerary');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary? This action cannot be undone.')) return;

    try {
      const res = await fetch(`${BASE_URL}/itinerary/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to delete itinerary' }));
        alert(errorData.message || `Error: ${res.status}`);
        return;
      }

      const data = await res.json();
      if (data.success) {
        await fetchItineraries();
        alert('Itinerary deleted successfully');
      } else {
        alert(data.message || 'Failed to delete itinerary');
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      alert('Failed to delete itinerary: ' + error.message);
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const handleAddActivity = (itinerary) => {
    const startDate = new Date(itinerary.startDate);
    const days = calculateDays(itinerary.startDate, itinerary.endDate);
    setSelectedItinerary(itinerary);
    setSelectedDay(null);
    setShowDayModal(true);
  };

  const handleSaveActivity = async (dayData) => {
    try {
      if (!selectedItinerary) {
        alert('No itinerary selected');
        return;
      }

      const itinerary = selectedItinerary;
      const startDate = new Date(itinerary.startDate);
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + (dayData.day - 1));
      
      // Ensure date is properly formatted
      dayDate.setHours(0, 0, 0, 0);

      // Validate activity data
      if (!dayData.activity.time || !dayData.activity.title) {
        alert('Please fill in required fields (Time and Title)');
        return;
      }

      const updatedActivities = [...(itinerary.activities || [])];
      const dayIndex = updatedActivities.findIndex((d) => d.day === dayData.day);

      if (dayIndex >= 0) {
        // Day exists, add activity to existing day
        updatedActivities[dayIndex] = {
          ...updatedActivities[dayIndex],
          activities: [...(updatedActivities[dayIndex].activities || []), dayData.activity],
        };
      } else {
        // New day, create new day entry
        updatedActivities.push({
          day: dayData.day,
          date: dayDate.toISOString(),
          activities: [dayData.activity],
        });
      }

      const res = await fetch(`${BASE_URL}/itinerary/${itinerary._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ activities: updatedActivities }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to update itinerary' }));
        alert(errorData.message || `Error: ${res.status}`);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setShowDayModal(false);
        setSelectedItinerary(null);
        await fetchItineraries();
        alert('Activity added successfully!');
      } else {
        alert(data.message || 'Failed to add activity');
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('Failed to save activity: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to plan your itinerary</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Travel Itinerary Planner
              </h1>
              <p className="mt-2 text-gray-600">Plan and organize your perfect trip</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreate}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <PlusIcon className="h-5 w-5" />
              Create New Itinerary
            </motion.button>
          </div>
        </div>

        {/* Itineraries Grid */}
        {itineraries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No itineraries yet</h3>
            <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              Create Your First Itinerary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => {
              const days = calculateDays(itinerary.startDate, itinerary.endDate);
              return (
                <motion.div
                  key={itinerary._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{itinerary.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPinIcon className="h-4 w-4" />
                          <span className="text-sm">{itinerary.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span className="text-sm">
                            {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                            {new Date(itinerary.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{days} days</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(itinerary)}
                          className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(itinerary._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Activities Summary */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Activities</h4>
                      {itinerary.activities && itinerary.activities.length > 0 ? (
                        <div className="space-y-1">
                          {itinerary.activities.slice(0, 3).map((day, idx) => (
                            <div key={idx} className="text-xs text-gray-600">
                              Day {day.day}: {day.activities.length} activities
                            </div>
                          ))}
                          {itinerary.activities.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{itinerary.activities.length - 3} more days
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500">No activities added yet</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddActivity(itinerary)}
                      className="w-full py-2 bg-sky-50 text-sky-600 rounded-lg font-medium hover:bg-sky-100 transition-colors"
                    >
                      Manage Activities
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {editingItinerary ? 'Edit Itinerary' : 'Create New Itinerary'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="e.g., Summer Vacation in Paris"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="e.g., Paris, France"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        rows="3"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Additional notes about your trip..."
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPublic}
                        onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Make this itinerary public</label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setEditingItinerary(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                      >
                        {editingItinerary ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Activity Modal */}
        <AnimatePresence>
          {showDayModal && selectedItinerary && (
            <DayActivityModal
              itinerary={selectedItinerary}
              onClose={() => {
                setShowDayModal(false);
                setSelectedItinerary(null);
              }}
              onSave={handleSaveActivity}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Day Activity Modal Component
const DayActivityModal = ({ itinerary, onClose, onSave }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activity, setActivity] = useState({
    time: '',
    title: '',
    description: '',
    location: '',
    type: 'activity',
    notes: '',
  });

  const days = (() => {
    if (!itinerary.startDate || !itinerary.endDate) return [];
    const start = new Date(itinerary.startDate);
    const end = new Date(itinerary.endDate);
    const daysArray = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysArray.push(new Date(d));
    }
    return daysArray;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!activity.time || !activity.title) {
      alert('Please fill in Time and Title fields');
      return;
    }

    try {
      await onSave({
        day: selectedDay,
        activity,
      });
      // Reset form only after successful save
      setActivity({
        time: '',
        title: '',
        description: '',
        location: '',
        type: 'activity',
        notes: '',
      });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                {days.map((day, idx) => (
                  <option key={idx} value={idx + 1}>
                    Day {idx + 1} - {day.toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  required
                  value={activity.time}
                  onChange={(e) => setActivity({ ...activity, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={activity.type}
                  onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="activity">Activity</option>
                  <option value="flight">Flight</option>
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="transport">Transport</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={activity.title}
                onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="e.g., Visit Eiffel Tower"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={activity.location}
                onChange={(e) => setActivity({ ...activity, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="e.g., Champ de Mars, Paris"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="3"
                value={activity.description}
                onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Details about this activity..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                rows="2"
                value={activity.notes}
                onChange={(e) => setActivity({ ...activity, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Additional notes..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                Add Activity
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItineraryPlanner;

