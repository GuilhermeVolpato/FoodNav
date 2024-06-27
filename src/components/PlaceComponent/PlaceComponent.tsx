import React, { useEffect, useState } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import PlaceItem from "./PlaceItem/PlaceItem";
import RestaurantHomeComponent from "@components/RestaurantHomeComponent/RestaurantHomeComponent";
import { FlatList } from "react-native-gesture-handler";

type PlaceComponentProps = {
  data: PlaceDetails[];
};

const preferences = [
  { id: 1, name: "american_restaurant", nameToShow: "Restaurante Americano", category: "Restaurantes" },
  { id: 2, name: "bakery", nameToShow: "Padaria", category: "Lanches" },
  { id: 3, name: "bar", nameToShow: "Bar", category: "Bebidas" },
  { id: 4, name: "barbecue_restaurant", nameToShow: "Restaurante de Churrasco", category: "Restaurantes" },
  { id: 5, name: "brazilian_restaurant", nameToShow: "Restaurante Brasileiro", category: "Restaurantes" },
  { id: 6, name: "breakfast_restaurant", nameToShow: "Restaurante de Café da Manhã", category: "Restaurantes" },
  { id: 7, name: "brunch_restaurant", nameToShow: "Restaurante de Brunch", category: "Restaurantes" },
  { id: 8, name: "cafe", nameToShow: "Café", category: "Bebidas" },
  { id: 9, name: "chinese_restaurant", nameToShow: "Restaurante Chinês", category: "Restaurantes" },
  { id: 10, name: "coffee_shop", nameToShow: "Cafeteria", category: "Bebidas" },
  { id: 11, name: "fast_food_restaurant", nameToShow: "Restaurante de Fast Food", category: "Restaurantes" },
  { id: 12, name: "french_restaurant", nameToShow: "Restaurante Francês", category: "Restaurantes" },
  { id: 13, name: "greek_restaurant", nameToShow: "Restaurante Grego", category: "Restaurantes" },
  { id: 14, name: "hamburger_restaurant", nameToShow: "Restaurante de Hambúrguer", category: "Lanches" },
  { id: 15, name: "ice_cream_shop", nameToShow: "Sorveteria", category: "Sobremesas" },
  { id: 16, name: "indian_restaurant", nameToShow: "Restaurante Indiano", category: "Restaurantes" },
  { id: 17, name: "indonesian_restaurant", nameToShow: "Restaurante Indonésio", category: "Restaurantes" },
  { id: 18, name: "italian_restaurant", nameToShow: "Restaurante Italiano", category: "Restaurantes" },
  { id: 19, name: "japanese_restaurant", nameToShow: "Restaurante Japonês", category: "Restaurantes" },
  { id: 20, name: "korean_restaurant", nameToShow: "Restaurante Coreano", category: "Restaurantes" },
  { id: 21, name: "lebanese_restaurant", nameToShow: "Restaurante Libanês", category: "Restaurantes" },
  { id: 22, name: "meal_delivery", nameToShow: "Entrega de Refeições", category: "Serviços" },
  { id: 23, name: "meal_takeaway", nameToShow: "Refeições para Viagem", category: "Serviços" },
  { id: 24, name: "mediterranean_restaurant", nameToShow: "Restaurante Mediterrâneo", category: "Restaurantes" },
  { id: 25, name: "mexican_restaurant", nameToShow: "Restaurante Mexicano", category: "Restaurantes" },
  { id: 26, name: "middle_eastern_restaurant", nameToShow: "Restaurante do Oriente Médio", category: "Restaurantes" },
  { id: 27, name: "pizza_restaurant", nameToShow: "Pizzaria", category: "Restaurantes" },
  { id: 28, name: "ramen_restaurant", nameToShow: "Restaurante de Ramen", category: "Restaurantes" },
  { id: 29, name: "restaurant", nameToShow: "Restaurante", category: "Restaurantes" },
  { id: 30, name: "sandwich_shop", nameToShow: "Lanchonete", category: "Lanches" },
  { id: 31, name: "seafood_restaurant", nameToShow: "Restaurante de Frutos do Mar", category: "Restaurantes" },
  { id: 32, name: "spanish_restaurant", nameToShow: "Restaurante Espanhol", category: "Restaurantes" },
  { id: 33, name: "steak_house", nameToShow: "Churrascaria", category: "Restaurantes" },
  { id: 34, name: "sushi_restaurant", nameToShow: "Restaurante de Sushi", category: "Restaurantes" },
  { id: 35, name: "thai_restaurant", nameToShow: "Restaurante Tailandês", category: "Restaurantes" },
  { id: 36, name: "turkish_restaurant", nameToShow: "Restaurante Turco", category: "Restaurantes" },
  { id: 37, name: "vegan_restaurant", nameToShow: "Restaurante Vegano", category: "Restaurantes" },
  { id: 38, name: "vegetarian_restaurant", nameToShow: "Restaurante Vegetariano", category: "Restaurantes" },
  { id: 39, name: "vietnamese_restaurant", nameToShow: "Restaurante Vietnamita", category: "Restaurantes" },
];

const PlaceComponent: React.FC<PlaceComponentProps> = ({ data }) => {

  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const organizedData: { title: string; data: PlaceDetails[] }[] = preferences
    .map((preference) => {
      const filteredData = data.filter((item) => item.primaryType === preference.name);
      return {
        title: preference.nameToShow,
        data: filteredData,
      };
    })
    .filter((section) => section.data.length > 0);

  const iaRec: PlaceDetails[] = preferences
    .filter((preference) => preference.name === "hamburger_restaurant" || preference.name === "italian_restaurant")
    .reduce((acc, preference) => {
      const filteredData = data.filter((item) => item.primaryType === preference.name);
      return acc.concat(filteredData);
    }, [] as PlaceDetails[]);

  useEffect(() => {}, [organizedData]);

  const CategoryList = () => (
    <FlatList
      data={iaRec}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { item })}>
          <PlaceItem data={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item.id + index}
    />
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={organizedData}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { item })}>
            {index % 4 === 0 ? <RestaurantHomeComponent data={item} /> : <PlaceItem data={item} />}
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <>
            {section.title === organizedData[0].title && (
              <>
                <Text style={styles.locationText}>Restaurantes em: Criciúma</Text>
                <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Com base em seus gostos</Text>
                <CategoryList />
              </>
            )}
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  locationText: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#1e1b1b",
    fontSize: 18,
    marginTop: 10,
  },
});

export default PlaceComponent;
