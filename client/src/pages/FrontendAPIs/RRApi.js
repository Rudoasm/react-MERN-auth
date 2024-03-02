import axios from "axios";

// copied from rapidapi and modified as needed
const api_key="b696e77f13c812a5dddd5b7f2cddfebf";
// https://api.openweathermap.org/data/2.5/weather?q=paris&appid=b696e77f13c812a5dddd5b7f2cddfebf

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
            "ba06641a90msh92b104e75070e1cp15f5ccjsnb0c2938337c7",
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

// export const getWeatherData = async (lat, lng) => {
//   try {
//     if (lat && lng) {
//       const { data } = await axios.get('https://open-weather-map27.p.rapidapi.com/weather', {
//         params: { lat:lat , lon: lng },
//         headers: {
//           'X-RapidAPI-Key': '99fa5699c3msh8bc73730a13ed9cp1c5518jsn3eff5e9368d8',
//           'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
//         },
//       });

//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
