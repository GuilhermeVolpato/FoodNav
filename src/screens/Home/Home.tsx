import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { ViewContainer, TextStyled } from "./styles";
import RestaurantHomeComponent from "@components/RestaurantHomeComponent/RestaurantHomeComponent";
import CategoryList from "@components/CategoryList/CategoryList";
import { useCallback, useEffect, useState } from "react";
import nearbyPlace from "@services/placesApi/endpoints/placesApiNearbyPlace";
import { useLocation } from "@hooks/useUserLocation";
import { PlaceResult, PlacesApiResponse } from "src/dto/apiPlacesDTO";
import PlaceComponent from "@components/PlaceComponent/PlaceComponent";
import newPlacesApiNearbyPlace from "@services/placesApi/endpoints/newPlacesApiNearbyPlace";
import textSearch from "@services/placesApi/endpoints/textSearch";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const { currentLocation, isGranted } = useLocation();
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);

  async function getNearbyPlaces() {
    if (!currentLocation) return;
    if (!isGranted) return;
    try {
      const response: PlaceDetails[] = await newPlacesApiNearbyPlace(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      if (response.length > 0) {
        setRestaurants(response);
        setShowNearbyRestaurants(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNearbyPlaces();
    }, [isGranted])
  );

  return (
    <ViewContainer>
      <CategoryList />
      <PlaceComponent data={restaurants} />
    </ViewContainer>
  );
}
