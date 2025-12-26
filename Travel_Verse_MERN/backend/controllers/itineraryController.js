import Itinerary from '../models/Itinerary.js';

// Create new itinerary
export const createItinerary = async (req, res) => {
  try {
    const { userId, title, destination, startDate, endDate, activities, notes, isPublic } = req.body;

    if (!userId || !title || !destination || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, title, destination, startDate, endDate',
      });
    }

    const newItinerary = new Itinerary({
      userId,
      title,
      destination,
      startDate,
      endDate,
      activities: activities || [],
      notes,
      isPublic: isPublic || false,
    });

    const savedItinerary = await newItinerary.save();
    res.status(200).json({
      success: true,
      message: 'Itinerary created successfully',
      data: savedItinerary,
    });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create itinerary',
      error: error.message,
    });
  }
};

// Get user's itineraries
export const getUserItineraries = async (req, res) => {
  try {
    const userId = String(req.user.id);
    const itineraries = await Itinerary.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Itineraries fetched successfully',
      data: itineraries,
    });
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch itineraries',
    });
  }
};

// Get single itinerary
export const getItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    // Check if user owns the itinerary or if it's public (convert both to strings for comparison)
    const userId = String(req.user.id);
    const itineraryUserId = String(itinerary.userId);
    
    if (itineraryUserId !== userId && !itinerary.isPublic && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Itinerary fetched successfully',
      data: itinerary,
    });
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch itinerary',
    });
  }
};

// Update itinerary
export const updateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    // Check if user owns the itinerary (convert both to strings for comparison)
    const userId = String(req.user.id);
    const itineraryUserId = String(itinerary.userId);
    
    if (itineraryUserId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    // Process activities to ensure dates are properly formatted
    if (req.body.activities) {
      req.body.activities = req.body.activities.map((day) => ({
        ...day,
        date: day.date ? new Date(day.date) : new Date(),
      }));
    }

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Itinerary updated successfully',
      data: updatedItinerary,
    });
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update itinerary',
      error: error.message,
    });
  }
};

// Delete itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Itinerary ID is required',
      });
    }

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    // Check if user owns the itinerary (convert both to strings for comparison)
    const userId = String(req.user.id);
    const itineraryUserId = String(itinerary.userId);
    
    if (itineraryUserId !== userId && req.user.role !== 'admin') {
      console.log('User ID mismatch:', { userId, itineraryUserId, userRole: req.user.role });
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own itineraries.',
      });
    }

    const deletedItinerary = await Itinerary.findByIdAndDelete(id);
    
    if (!deletedItinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found or already deleted',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete itinerary',
      error: error.message,
    });
  }
};

