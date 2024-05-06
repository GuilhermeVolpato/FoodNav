import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { PlaceResult } from "src/dto/apiPlacesDTO";
import { AntDesign } from "@expo/vector-icons";
import { useLocation } from "@hooks/useUserLocation";

type PlaceItemProps = {
  data: PlaceResult;
};

export default function PlaceItem({ data }: PlaceItemProps) {
  const [distance, setDistance] = React.useState<number>(0);
  const { currentLocation } = useLocation();
  const photoUrl =
    data?.photos?.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=${process.env.API_KEY}`
      : data.icon;

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
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng,
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
    <View
      style={{ flexDirection: "row", flex: 1, width: "100%", gap: 15, marginBottom: 10, backgroundColor: "#62626231" }}
    >
      <Image source={{ uri: photoUrl }} style={{ width: 100, borderRadius: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, marginBottom: 5 }} numberOfLines={2}>
          {data.name}
        </Text>
        <Text style={{ fontSize: 12, marginBottom: 5 }} numberOfLines={2}>
          {data.vicinity}
        </Text>
        <Text style={{ fontSize: 12, marginBottom: 5 }} numberOfLines={2}>
          {distance?.toFixed(2)} km
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <AntDesign name="star" size={20} color="black" />
          <Text>{data.rating}</Text>
        </View>
      </View>
    </View>
  );
}
