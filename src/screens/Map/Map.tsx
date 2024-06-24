import { useEffect, useRef, useState } from "react";
import {
  Text,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Linking,
  FlatList,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LoadingAnimation } from "@components/LoadingAnimation/LoadingAnimation";
import HeaderSearch from "@components/HeaderSearch/HeaderSearch";
import {
  ButtonText,
  TextStyled,
  TextContainer,
  TouchableOpacityStyled,
  ViewContainer,
  SafeAreaViewContainer,
  ViewMap,
} from "./styles";
import { useLocation } from "@hooks/useUserLocation";
import { PlacesApiResponse } from "src/dto/apiPlacesDTO";
import placesApiNearbyPlace from "@services/placesApi/endpoints/placesApiNearbyPlace";
import textSearch from "@services/placesApi/endpoints/textSearch";
import newPlacesApiNearbyPlace from "@services/placesApi/endpoints/newPlacesApiNearbyPlace";
import PlaceDetailsComponent from "@components/MapPlaceDetail/MapPlaceDetail";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { useNavigation } from "@react-navigation/native";
import { set } from "react-hook-form";

export function Map() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const { currentLocation, isGranted } = useLocation();
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [placesBySearch, setPlacesBySearch] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const mapRef = useRef<MapView>(null);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  async function getNearbyPlaces() {
    setLoading(true);
    if (!currentLocation) return;
    if (!isGranted) return;
    try {
      const response: PlaceDetails[] = await newPlacesApiNearbyPlace(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      if (response.length > 0) {
        setPlaces(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getNearbyPlacesTextSearch(query: any) {
    if (!currentLocation) return;
    try {
      const response = await textSearch(query, currentLocation.coords.latitude, currentLocation.coords.longitude);
      setSelectedPlace(null);
      setPlacesBySearch(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isGranted && currentLocation) {
      mapRef.current?.animateCamera({
        pitch: 45,
        center: currentLocation.coords,
      });
    }

    if (isGranted) {
      getNearbyPlaces();
    }
  }, [isGranted, currentLocation]);

  if (loading) {
    return (
      <ViewContainer>
        <LoadingAnimation loading={loading} size={26} />
        <Text style={{ paddingTop: 16 }}>Carregando o mapa...</Text>
      </ViewContainer>
    );
  }

  if (!isGranted) {
    return (
      <ViewContainer>
        <TextContainer>
          <TextStyled>Para ter acesso ao Mapa, é necessário permitir acesso a sua localização</TextStyled>
          <TouchableOpacityStyled onPress={openSettings}>
            <ButtonText>Permitir acesso a localização</ButtonText>
          </TouchableOpacityStyled>
        </TextContainer>
      </ViewContainer>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaViewContainer>
        <StatusBar
          translucent={true}
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          backgroundColor={"black"}
        />
        <HeaderSearch onSearch={getNearbyPlacesTextSearch} />
        <View style={{ flex: 1, width: "100%" }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1, backgroundColor: "black" }}
            initialRegion={{
              latitude: currentLocation?.coords.latitude ?? 0,
              longitude: currentLocation?.coords.longitude ?? 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              onPress={() =>
                Alert.alert(
                  "Você está aqui",
                  `Sua coordenada atual é ${currentLocation?.coords.latitude}, ${currentLocation?.coords.longitude}`
                )
              }
              coordinate={{
                latitude: currentLocation?.coords.latitude ?? 0,
                longitude: currentLocation?.coords.longitude ?? 0,
              }}
              title="Você está aqui"
              description="Sua localização atual"
            />
            {places.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.location.latitude,
                  longitude: place.location.longitude,
                }}
                onPress={() => {
                  setSelectedPlace(place);
                  setPlacesBySearch([]);
                }} // Atualiza o estado do local selecionado
                title={place.displayName.text}
                description={place.formattedAddress}
              />
            ))}
          </MapView>
          {selectedPlace && (
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <PlaceDetailsComponent
                place={selectedPlace}
                onNavigate={(place) => navigation.navigate("Restaurant", { item: place })} // Navega para a tela de detalhes do local
              />
            </View>
          )}
          {placesBySearch.length > 0 && (
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <FlatList
                data={placesBySearch}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PlaceDetailsComponent
                    place={item}
                    onNavigate={(item) => navigation.navigate("Restaurant", { item: item })} // Navega para a tela de detalhes do local
                  />
                )}
              />
            </View>
          )}
        </View>
      </SafeAreaViewContainer>
    </TouchableWithoutFeedback>
  );
}
