import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";

type CategoryComponentProps = {
  data: {
    id: number;
    name: string;
    value: string;
    image: string;
  };
};

export default function CategoryComponent({ data }: CategoryComponentProps) {
  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.text}>{data.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
});
