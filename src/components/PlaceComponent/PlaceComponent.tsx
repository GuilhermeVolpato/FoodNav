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
  { name: "american_restaurant", nameToShow: "Restaurante Americano" },
  { name: "bakery", nameToShow: "Padaria" },
  { name: "bar", nameToShow: "Bar" },
  { name: "barbecue_restaurant", nameToShow: "Restaurante de Churrasco" },
  { name: "brazilian_restaurant", nameToShow: "Restaurante Brasileiro" },
  { name: "breakfast_restaurant", nameToShow: "Restaurante de Café da Manhã" },
  { name: "brunch_restaurant", nameToShow: "Restaurante de Brunch" },
  { name: "cafe", nameToShow: "Café" },
  { name: "chinese_restaurant", nameToShow: "Restaurante Chinês" },
  { name: "coffee_shop", nameToShow: "Cafeteria" },
  { name: "fast_food_restaurant", nameToShow: "Restaurante de Fast Food" },
  { name: "french_restaurant", nameToShow: "Restaurante Francês" },
  { name: "greek_restaurant", nameToShow: "Restaurante Grego" },
  { name: "hamburger_restaurant", nameToShow: "Restaurante de Hambúrguer" },
  { name: "ice_cream_shop", nameToShow: "Sorveteria" },
  { name: "indian_restaurant", nameToShow: "Restaurante Indiano" },
  { name: "indonesian_restaurant", nameToShow: "Restaurante Indonésio" },
  { name: "italian_restaurant", nameToShow: "Restaurante Italiano" },
  { name: "japanese_restaurant", nameToShow: "Restaurante Japonês" },
  { name: "korean_restaurant", nameToShow: "Restaurante Coreano" },
  { name: "lebanese_restaurant", nameToShow: "Restaurante Libanês" },
  { name: "meal_delivery", nameToShow: "Entrega de Refeições" },
  { name: "meal_takeaway", nameToShow: "Refeições para Viagem" },
  { name: "mediterranean_restaurant", nameToShow: "Restaurante Mediterrâneo" },
  { name: "mexican_restaurant", nameToShow: "Restaurante Mexicano" },
  { name: "middle_eastern_restaurant", nameToShow: "Restaurante do Oriente Médio" },
  { name: "pizza_restaurant", nameToShow: "Pizzaria" },
  { name: "ramen_restaurant", nameToShow: "Restaurante de Ramen" },
  { name: "restaurant", nameToShow: "Restaurante" },
  { name: "sandwich_shop", nameToShow: "Lanchonete" },
  { name: "seafood_restaurant", nameToShow: "Restaurante de Frutos do Mar" },
  { name: "spanish_restaurant", nameToShow: "Restaurante Espanhol" },
  { name: "steak_house", nameToShow: "Churrascaria" },
  { name: "sushi_restaurant", nameToShow: "Restaurante de Sushi" },
  { name: "thai_restaurant", nameToShow: "Restaurante Tailandês" },
  { name: "turkish_restaurant", nameToShow: "Restaurante Turco" },
  { name: "vegan_restaurant", nameToShow: "Restaurante Vegano" },
  { name: "vegetarian_restaurant", nameToShow: "Restaurante Vegetariano" },
  { name: "vietnamese_restaurant", nameToShow: "Restaurante Vietnamita" },
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
