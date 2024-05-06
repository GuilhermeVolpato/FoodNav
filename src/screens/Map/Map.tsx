import { useEffect, useRef, useState } from "react";
import { Text, Alert, Platform, TouchableWithoutFeedback, Keyboard, StatusBar } from "react-native";

import MapView, { MapStyleElement, Marker } from "react-native-maps";
import { LoadingAnimation } from "@components/LoadingAnimation/LoadingAnimation";
import HeaderSearch from "@components/HeaderSearch/HeaderSearch";

import {
  ButtonText,
  TextStyled,
  TextContainer,
  TouchableOpacityStyled,
  ViewContainer,
  SafeAreaViewContainer,
} from "./styles";
import darkMapStyle from "./MapStyle/darkMapStyle.json";
import theme from "@theme/index";
import { useLocation } from "@hooks/useUserLocation";
import { PlacesApiResponse } from "src/dto/apiPlacesDTO";
import placesApiNearbyPlace from "@services/placesApi/endpoints/placesApiNearbyPlace";

export function Map() { 
  const { currentLocation, isGranted, loading } = useLocation(); // Usando o hook useLocation
  const [places, setPlaces] = useState<PlacesApiResponse["results"]>([]); // Inicializando o estado places com um array vazio de PlacesApiResponse["results"
  const mapRef = useRef<MapView>(null);

  async function getNearbyPlaces() {
    if (!currentLocation) return;
    try {
      const response: PlacesApiResponse = await placesApiNearbyPlace(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      if (response.results.length > 0) {
        setPlaces(response.results);
      }
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
          <TouchableOpacityStyled onPress={() => {}}>
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
          backgroundColor={theme.COLORS.GRAY_600}
        />
        <HeaderSearch />
        <MapView
          ref={mapRef}
          provider="google"
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "black",
          }}
          customMapStyle={darkMapStyle as MapStyleElement[]}
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
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              onPress={() =>
                Alert.alert(
                  "Restaurante encontrado",
                  `Na coordenada ${place.geometry.location.lat}, ${place.geometry.location.lng}`
                )
              }
              title={place.name}
              description={place.vicinity}
            />
          ))}
        </MapView>
      </SafeAreaViewContainer>
    </TouchableWithoutFeedback>
  );
}
