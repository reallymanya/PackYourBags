import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    beach:{
      type:Boolean,
      default:false
    },
    wild:{
      type:Boolean,
      default:false
    },
    si:{
      type:Boolean,
      default:false
    },
    dev:{
      type:Boolean,
      default:false
    },
    old:{
      type:Boolean,
      default:false
    },
    cul:{
      type:Boolean,
      default:false
    },
    honey:{
      type:Boolean,
      default:false
    },
    hill:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);