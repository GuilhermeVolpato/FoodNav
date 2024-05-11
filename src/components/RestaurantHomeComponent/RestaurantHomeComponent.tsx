import { View, Text } from "react-native";
import React, { useEffect } from "react";
import images from "@assets/images.jpg";
import { ImageWrapper, TheImage, TextContainer } from "./styles";
import { PlaceResult } from "src/dto/apiPlacesDTO";
import { useLocation } from "@hooks/useUserLocation";
import { AntDesign } from "@expo/vector-icons";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";

type PlaceItemProps = {
  data: PlaceDetails;
};

export default function RestaurantHomeComponent({ data }: PlaceItemProps) {
  const [distance, setDistance] = React.useState<number>(0);
  const { currentLocation } = useLocation();

  const photoUrl = data?.photos[0]?.authorAttributions[0]?.photoUri
    ? `https:${data?.photos[0]?.authorAttributions[0]?.photoUri}`
    : "";

  function getDistanceFromLatLonInKm(lat1: number | any, lon1: number | any, lat2: number, lon2: number) {
    const R = 6371; // Raio da Terra em Km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km
    return d;
  }

  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    let restaurantLocation = {
      latitude: data?.location?.latitude,
      longitude: data?.location?.longitude,
    };

    let distance = getDistanceFromLatLonInKm(
      currentLocation?.coords.latitude,
      currentLocation?.coords.longitude,
      restaurantLocation.latitude,
      restaurantLocation.longitude
    );

    setDistance(distance);
  }, [data, currentLocation]);

  return (
    <ImageWrapper>
      <TheImage source={{ uri: photoUrl }} resizeMode="cover" style={{}}>
        <TextContainer>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
              <View style={{ flex: 3 }}>
                <Text numberOfLines={1} style={{ fontSize: 12 }}>
                  {data?.displayName?.text}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <Text style={{ fontSize: 13 }}>{data?.rating}</Text>
                <AntDesign name="star" size={16} color="black" />
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
              <View style={{ flex: 3 }}>
                <Text numberOfLines={2}>{data?.formattedAddress}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{distance?.toFixed(2)} km</Text>
              </View>
            </View>
          </View>
        </TextContainer>
      </TheImage>
    </ImageWrapper>
  );
}
