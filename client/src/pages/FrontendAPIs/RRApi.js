import axios from "axios";

// copied from rapidapi and modified as needed

export const getplacedata = async (type, sw, ne) => {
  try {
    const response = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key":
            "614defb7e8msh31f3df93bb638adp13cd1ejsn365b61f6df15",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log("API Response:", response); // Log the entire response
    return response.data.data; // Return the 'data' property of the response data
  } catch (error) {
    console.error("Error in API call:", error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://open-weather-map27.p.rapidapi.com/weather', {
        params: { lat:lat , lon: lng },
        headers: {
          'X-RapidAPI-Key': '99fa5699c3msh8bc73730a13ed9cp1c5518jsn3eff5e9368d8',
          'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};