import { placeApi } from "../placeApi";

const newPlacesApiNearbyPlace = async (latitude: number, longitude: number) => {
  
  try {
    const API_KEY = 'AIzaSyBe3mt1m4WC1CN18u2yp7vmeAqav5XC6cg';

    const requestBody = {
      includedTypes: ["restaurant"],
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude
          },
          radius: 200.0
        }
      } 
    };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.reviews,places.priceLevel,places.currentOpeningHours,places.regularOpeningHours,places.photos,places.id,places.plusCode,places.userRatingCount,places.shortFormattedAddress,places.websiteUri,places.accessibilityOptions,places.takeout,places.delivery,places.dineIn,places.dineIn,places.curbsidePickup,places.dineIn,places.curbsidePickup,places.reservable,places.dineIn,places.curbsidePickup,places.reservable,places.servesBreakfast,places.servesLunch,places.servesDinner,places.servesBeer,places.servesWine,places.servesBrunch,places.servesVegetarianFood,places.paymentOptions,places.parkingOptions,places.subDestinations,places.outdoorSeating,places.liveMusic,places.menuForChildren,places.servesCocktails,places.servesDessert,places.servesCoffee,places.goodForChildren,places.allowsDogs,places.goodForGroups,places.goodForWatchingSports'
      }
    }; 
    
    const response = await placeApi.post('https://places.googleapis.com/v1/places:searchNearby?key=' + API_KEY, requestBody, config) 
    console.log(JSON.stringify(response.data.places[0]))
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default newPlacesApiNearbyPlace;