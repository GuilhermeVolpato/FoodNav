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

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const { currentLocation } = useLocation();
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<PlaceResult[]>([]);

  async function getNearbyPlaces() {
    if (!currentLocation) return;

    try {
      const response: PlacesApiResponse = await nearbyPlace( 
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      ); 
      if (response.results.length > 0) {
        setRestaurants(response.results);
        setShowNearbyRestaurants(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNearbyPlaces(); 
    }, [])
  );
  
  return (
    <ViewContainer>
      <CategoryList />
      <PlaceComponent data={restaurants}/>
    </ViewContainer>
  );
}
