import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Alert } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
} from "expo-location";

export interface UserLocationContextData {
  currentLocation: LocationObject | null;
  isGranted: boolean;
  loading: boolean;
}

export const UserLocationContext = createContext<UserLocationContextData>({} as UserLocationContextData);

interface UserLocationProviderProps {
  children: ReactNode;
}

export function UserLocationProvider({ children }: UserLocationProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [isGranted, setIsGranted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        }
      );
    }
  }, [isGranted]);

  return (
    <UserLocationContext.Provider value={{ currentLocation, isGranted, loading }}>
      {children}
    </UserLocationContext.Provider>
  );
}
