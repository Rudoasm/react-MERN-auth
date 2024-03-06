import mongoose from 'mongoose';
const itinerarySchema = new mongoose.Schema(
    {
      location: String,
      estimatedBudget: Number,
      TypeofTrip: String,
      fromDate: Date,
      toDate: Date,
      travelingCount: Number,
    },
    { timestamps: true }
  );
  
  const Itinerary = mongoose.model('Itinerary', itinerarySchema);

  export default Itinerary;