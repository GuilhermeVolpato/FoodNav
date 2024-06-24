import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PlaceDetailsComponent = ({ place, onNavigate }: { place: any; onNavigate: any }) => {
  if (!place) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onNavigate(place)}>
      <View style={styles.content}>
        <Text style={styles.title}>{place.displayName.text}</Text>
        <Text style={styles.address}>{place.formattedAddress}</Text>
        <Text style={styles.details}>Rating: {place.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: 300, // Tamanho fixo para garantir consistência
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: "gray",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "darkgray",
  },
});

export default PlaceDetailsComponent;
