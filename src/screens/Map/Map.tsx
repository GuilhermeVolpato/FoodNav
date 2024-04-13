import { useEffect, useState, useRef } from "react";
import { Text, Alert, Platform, TouchableWithoutFeedback, Keyboard, StatusBar } from "react-native";

import MapView, { MapStyleElement, Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

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
//import { StatusBar } from "expo-status-bar";

export function Map() {
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [isGranted, setIsGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  async function requestLocationPermission() {
    setLoading(true);

    const { granted, canAskAgain } = await requestForegroundPermissionsAsync();

    if (!granted && !canAskAgain) {
      Alert.alert(
        "Permissão negada",
        "Você negou a permissão de localização. Por favor, habilite a permissão nas configurações de seu dispositivo"
      );
    }

    if (granted) {
      setLoading(false);
      setIsGranted(true);
      const currentPosition = await getCurrentPositionAsync();
      setCurrentLocation(currentPosition);
    } else {
      setLoading(false);
      setIsGranted(false);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (isGranted) {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Balanced,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation(location);
          mapRef.current?.animateCamera({
            pitch: 45,
            center: location.coords,
          });
        }
      );
    }
  }, [isGranted]);

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
          <TouchableOpacityStyled onPress={requestLocationPermission}>
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
        </MapView>
      </SafeAreaViewContainer>
    </TouchableWithoutFeedback>
  );
}
