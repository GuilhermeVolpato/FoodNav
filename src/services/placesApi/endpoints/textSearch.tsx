import { config, placeApi } from "../placeApi";

async function textSearch(query: any, latitude: any, longitude: any) {
  const baseUrl = `https://places.googleapis.com/v1/places:searchText?key=${process.env.API_KEY}`;

  const requestBody = {
    textQuery: "hamburguer",
    includedType: "fast_food_restaurant",
    locationBias: {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius: 1000.0,
      },
    },
  };

  try {
    const response = await placeApi.post(baseUrl, requestBody, config);
    console.log(response.data.places[0]);
    return response.data.places;
  } catch (error) {
    console.error("Erro na pesquisa de texto:", error);
    return null;
  }
}

export default textSearch;
