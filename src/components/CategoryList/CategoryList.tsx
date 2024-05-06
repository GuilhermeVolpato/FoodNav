import { View, Text, FlatList } from "react-native";
import React from "react";
import CategoryComponent from "@components/CategoryComponent/CategoryComponent";

export default function CategoryList() {
  const categories = [
    { id: 1, name: "Churrascarias", value: "churrascarias", image: require("@assets/carne.png") },
    { id: 2, name: "Pizzarias", value: "pizzarias", image: require("@assets/pizza_icon_131067.png") },
    { id: 3, name: "Lanches", value: "lanches", image: require("@assets/hamburge.jpeg") },
    { id: 4, name: "Japonesa", value: "japonesa", image: require("@assets/suchi.jpeg") },
  ];

  return (
    <View>
      <Text style={{ marginTop: 50, marginBottom: 25, fontSize: 25, color: "white" }}> Selecione Categorias </Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <CategoryComponent data={item} />
          </View>
        )}
        horizontal
      />
    </View>
  );
}
