import axios from "axios";

// copied from rapidapi and modified as needed
const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Key": "99fa5699c3msh8bc73730a13ed9cp1c5518jsn3eff5e9368d8",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};


export const getplacedata = async () => {
  try {
    const {data:{data}} = await axios.get(url,options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
