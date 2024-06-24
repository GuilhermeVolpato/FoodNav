import { placeApi } from "../placeApi";

const placesApiNearbyPlace = async (latitude: number, longitude: number) => {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await placeApi.get(`${process.env.BASE_URL}/nearbysearch/json`, {
      params: {
        keyword: "cruise",
        location: `${latitude},${longitude}`,
        radius: 80000,
        type: "restaurant",
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default placesApiNearbyPlace;
