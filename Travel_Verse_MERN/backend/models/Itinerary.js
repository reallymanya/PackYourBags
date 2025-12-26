import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    activities: [
      {
        day: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        activities: [
          {
            time: {
              type: String,
              required: true,
            },
            title: {
              type: String,
              required: true,
            },
            description: {
              type: String,
            },
            location: {
              type: String,
            },
            type: {
              type: String,
              enum: ['flight', 'hotel', 'activity', 'restaurant', 'transport', 'other'],
              default: 'activity',
            },
            notes: {
              type: String,
            },
          },
        ],
      },
    ],
    notes: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);

