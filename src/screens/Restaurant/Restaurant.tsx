import { Image, Text, View, StyleSheet, TouchableOpacity, Share, Alert, Linking } from "react-native";
import { ViewContainer } from "./styles";
import { useRoute } from "@react-navigation/native";
import { PlaceResult, PlacesApiResponse } from "src/dto/apiPlacesDTO";
import { Feather } from "@expo/vector-icons";
import theme from "@theme/index";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import { useEffect, useRef, useState } from "react";

import MapView, { MapStyleElement, Marker } from "react-native-maps";
import { LoadingAnimation } from "@components/LoadingAnimation/LoadingAnimation";
import HeaderSearch from "@components/HeaderSearch/HeaderSearch";
import { useLocation } from "@hooks/useUserLocation";
import darkMapStyle from "../Map/MapStyle/darkMapStyle.json";
interface params {
  item: PlaceDetails;
}

export function Restaurant() {
  const { currentLocation, isGranted, loading } = useLocation(); // Usando o hook useLocation
  const [places, setPlaces] = useState<PlacesApiResponse["results"]>([]); // Inicializando o estado places com um array vazio de PlacesApiResponse["results"
  const mapRef = useRef<MapView>(null);
  const route = useRoute();
  const { item } = route.params as params;
  const photoUrl = item?.photos[0]?.authorAttributions[0]?.photoUri
    ? `https:${item?.photos[0]?.authorAttributions[0]?.photoUri}`
    : "";

  async function sharePlace() {
    try {
      // pegar imagem para compartilhar também

      await Share.share({
        message: `Check out this place: ${item.displayName.text} located at ${item.formattedAddress}, Shared via FoodNav`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const DirectionButton = () => {
      const url = 'https://www.google.com/maps';
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_500 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 26 }}>{item.displayName.text}</Text>
        <View
          style={{
            alignItems: "center",
            gap: 5,
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Feather name="star" size={24} color="yellow" />
          <Text>{item.rating}</Text>
        </View>
        <Image style={{ width: "100%", height: 200, borderRadius: 15, marginTop: 10 }} source={{ uri: photoUrl }} />
        <Text style={{ fontSize: 16, marginTop: 10, color: theme.COLORS.GRAY_300 }}>
          {"Endereço: "}
          {item.formattedAddress}
        </Text>
        {item?.currentOpeningHours.openNow ? (
          <Text style={{ color: item?.currentOpeningHours.openNow ? "green" : "red" }}>
            {item?.currentOpeningHours.openNow == true ? "Aberto" : "Fechado"}
          </Text>
        ) : null}


        <View style={{ marginTop: 10, flexDirection: "row", display: "flex", gap: 10, justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={DirectionButton}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: theme.COLORS.GRAY_200,
              width: 110,
              padding: 3,
              borderRadius: 40,
              justifyContent: "center",
            }}
          >
            <Feather name="navigation" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Direction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sharePlace()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: theme.COLORS.GRAY_200,
              width: 90,
              padding: 3,
              borderRadius: 40,
              justifyContent: "center",
            }}
          >
            <Feather name="share" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Share</Text>
          </TouchableOpacity>
        </View>
        <MapView
          ref={mapRef}

          style={{
            width: "100%",
            height: "35%",
            marginTop: 15,
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
      </View>
    </View>
  );
}
