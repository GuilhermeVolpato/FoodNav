import { useEffect, useState, useRef } from "react";
import { View, Text, Alert } from "react-native";

import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

import { styles } from "./styles";
import darkMapStyle from './darkMapStyle.json'; // Importe o estilo do mapa escuro


export function Map() {
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null
  );
  const mapRef = useRef<MapView>(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setCurrentLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={darkMapStyle as any} // Provide a valid map style object
        showsTraffic={true}
        initialRegion={{
          latitude: currentLocation?.coords.latitude ?? 0,
          longitude: currentLocation?.coords.longitude ?? 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {
          // marker bom para marcar um ponto no mapa.
        }
        <Marker
        onPress={() => Alert.alert("Você está aqui", `Sua cordenada atual é ${currentLocation?.coords.latitude}, ${currentLocation?.coords.longitude}`)}
          coordinate={{
            latitude: currentLocation?.coords.latitude ?? 0,
            longitude: currentLocation?.coords.longitude ?? 0,
          }}
          title="Você está aqui"
          description="Sua localização atual"
        />
      </MapView>
    </View>
  );
}
