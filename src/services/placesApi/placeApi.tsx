import axios from "axios";

import { AppError } from "@utils/AppError";
const NEW_BASE_URL = process.env.NEW_BASE_URL;
const placeApi = axios.create();
placeApi.defaults.timeout = 5000;

placeApi.defaults.baseURL = NEW_BASE_URL;

const API_KEY = process.env.API_KEY;

export const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask":
      "places.displayName,places.formattedAddress,places.rating,places.reviews,places.priceLevel,places.currentOpeningHours,places.regularOpeningHours,places.photos,places.id,places.plusCode,places.userRatingCount,places.shortFormattedAddress,places.websiteUri,places.accessibilityOptions,places.takeout,places.delivery,places.dineIn,places.dineIn,places.curbsidePickup,places.dineIn,places.curbsidePickup,places.reservable,places.dineIn,places.curbsidePickup,places.reservable,places.servesBreakfast,places.servesLunch,places.servesDinner,places.servesBeer,places.servesWine,places.servesBrunch,places.servesVegetarianFood,places.paymentOptions,places.parkingOptions,places.subDestinations,places.outdoorSeating,places.liveMusic,places.menuForChildren,places.servesCocktails,places.servesDessert,places.servesCoffee,places.goodForChildren,places.allowsDogs,places.goodForGroups,places.goodForWatchingSports,places.primaryType,places.primaryTypeDisplayName,places.location",
  },
};

placeApi.interceptors.request.use(
  (config) => {
    // const token = asyncStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

placeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { placeApi };
