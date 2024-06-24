import { config, placeApi } from "../placeApi";

async function textSearch(query: any, latitude: any, longitude: any) {
  const baseUrl = `https://places.googleapis.com/v1/places:searchText?key=${process.env.API_KEY}`;

  const requestBody = {
    textQuery: "Montalccino Pas",
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
    return response.data.places
  } catch (error) {
    console.error("Erro na pesquisa de texto:", error);
    return null;
  }
}

export default textSearch;
