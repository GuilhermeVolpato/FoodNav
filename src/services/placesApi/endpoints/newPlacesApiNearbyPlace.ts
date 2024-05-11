import { config, placeApi } from "../placeApi";

const API_KEY = process.env.API_KEY;

const newPlacesApiNearbyPlace = async (latitude: number, longitude: number) => {
  console.log("newPlacesApiNearbyPlace", latitude, longitude);
  const requestBody = {
    includedTypes: ["restaurant"],
    locationRestriction: {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius: 10000.0,
      },
    },
  };
  try {
    const response = await placeApi.post(":searchNearby?key=" + API_KEY, requestBody, config);
    console.log(`newPlacesApiNearbyPlace`, JSON.stringify(response.data.places[0]));
    return response.data.places;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default newPlacesApiNearbyPlace;
