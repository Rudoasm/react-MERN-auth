// profile picture
// inside my database inside a collection called itineraries , I have this data _id
// : 
// ObjectId('65e9dec8085ce4beb011ea06')

// itineraries
// : 
// Array (4)

// 0
// : 
// Object
// content
// : 
// "Travel from your location: galle to the hotel: My Holiday Ticket Colom…"

// 1
// : 
// Object
// content
// : 
// "Day 1 - Have breakfast at the hotel  My Holiday Ticket Colombo Go to t…"

// 2
// : 
// Object
// content
// : 
// "Day 2 - For breakfast go the restaurant Echo (Cinnamon Grand) which is…"

// 3
// : 
// Object
// content
// : 
// "Travel from the hotel: My Holiday Ticket Colombo back to your residenc…"

import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  itineraries: {  // Use "itineraries" for consistency with the collection name
    type: [{
      content: {
        type: String,
        required: true
      }
    }],
    required: true
  }
});

const ItineraryGenerated = mongoose.model('Itinerary', itinerarySchema, 'itineraries');

export default ItineraryGenerated;

