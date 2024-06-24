import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, ScrollView, View, Modal, Button, StyleSheet } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { ViewContainer, TextStyled } from "./styles";
import RestaurantHomeComponent from "@components/RestaurantHomeComponent/RestaurantHomeComponent";
import CategoryList from "@components/CategoryList/CategoryList";
import { useCallback, useEffect, useState } from "react";
import nearbyPlace from "@services/placesApi/endpoints/placesApiNearbyPlace";
import { useLocation } from "@hooks/useUserLocation";
import { PlaceResult, PlacesApiResponse } from "src/dto/apiPlacesDTO";
import PlaceComponent from "@components/PlaceComponent/PlaceComponent";
import newPlacesApiNearbyPlace from "@services/placesApi/endpoints/newPlacesApiNearbyPlace";
import textSearch from "@services/placesApi/endpoints/textSearch";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import SkeletonLoader from "@components/SkeletonLoader/SkeletonLoader";
import { FlatList } from "react-native-gesture-handler";

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const { currentLocation, isGranted } = useLocation();
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const preferences = [
    { name: "american_restaurant", nameToShow: "Restaurante Americano", category: "Restaurantes" },
    { name: "bakery", nameToShow: "Padaria", category: "Lanches" },
    { name: "bar", nameToShow: "Bar", category: "Bebidas" },
    { name: "barbecue_restaurant", nameToShow: "Restaurante de Churrasco", category: "Restaurantes" },
    { name: "brazilian_restaurant", nameToShow: "Restaurante Brasileiro", category: "Restaurantes" },
    { name: "breakfast_restaurant", nameToShow: "Restaurante de Café da Manhã", category: "Restaurantes" },
    { name: "brunch_restaurant", nameToShow: "Restaurante de Brunch", category: "Restaurantes" },
    { name: "cafe", nameToShow: "Café", category: "Bebidas" },
    { name: "chinese_restaurant", nameToShow: "Restaurante Chinês", category: "Restaurantes" },
    { name: "coffee_shop", nameToShow: "Cafeteria", category: "Bebidas" },
    { name: "fast_food_restaurant", nameToShow: "Restaurante de Fast Food", category: "Restaurantes" },
    { name: "french_restaurant", nameToShow: "Restaurante Francês", category: "Restaurantes" },
    { name: "greek_restaurant", nameToShow: "Restaurante Grego", category: "Restaurantes" },
    { name: "hamburger_restaurant", nameToShow: "Restaurante de Hambúrguer", category: "Lanches" },
    { name: "ice_cream_shop", nameToShow: "Sorveteria", category: "Sobremesas" },
    { name: "indian_restaurant", nameToShow: "Restaurante Indiano", category: "Restaurantes" },
    { name: "indonesian_restaurant", nameToShow: "Restaurante Indonésio", category: "Restaurantes" },
    { name: "italian_restaurant", nameToShow: "Restaurante Italiano", category: "Restaurantes" },
    { name: "japanese_restaurant", nameToShow: "Restaurante Japonês", category: "Restaurantes" },
    { name: "korean_restaurant", nameToShow: "Restaurante Coreano", category: "Restaurantes" },
    { name: "lebanese_restaurant", nameToShow: "Restaurante Libanês", category: "Restaurantes" },
    { name: "meal_delivery", nameToShow: "Entrega de Refeições", category: "Serviços" },
    { name: "meal_takeaway", nameToShow: "Refeições para Viagem", category: "Serviços" },
    { name: "mediterranean_restaurant", nameToShow: "Restaurante Mediterrâneo", category: "Restaurantes" },
    { name: "mexican_restaurant", nameToShow: "Restaurante Mexicano", category: "Restaurantes" },
    { name: "middle_eastern_restaurant", nameToShow: "Restaurante do Oriente Médio", category: "Restaurantes" },
    { name: "pizza_restaurant", nameToShow: "Pizzaria", category: "Restaurantes" },
    { name: "ramen_restaurant", nameToShow: "Restaurante de Ramen", category: "Restaurantes" },
    { name: "restaurant", nameToShow: "Restaurante", category: "Restaurantes" },
    { name: "sandwich_shop", nameToShow: "Lanchonete", category: "Lanches" },
    { name: "seafood_restaurant", nameToShow: "Restaurante de Frutos do Mar", category: "Restaurantes" },
    { name: "spanish_restaurant", nameToShow: "Restaurante Espanhol", category: "Restaurantes" },
    { name: "steak_house", nameToShow: "Churrascaria", category: "Restaurantes" },
    { name: "sushi_restaurant", nameToShow: "Restaurante de Sushi", category: "Restaurantes" },
    { name: "thai_restaurant", nameToShow: "Restaurante Tailandês", category: "Restaurantes" },
    { name: "turkish_restaurant", nameToShow: "Restaurante Turco", category: "Restaurantes" },
    { name: "vegan_restaurant", nameToShow: "Restaurante Vegano", category: "Restaurantes" },
    { name: "vegetarian_restaurant", nameToShow: "Restaurante Vegetariano", category: "Restaurantes" },
    { name: "vietnamese_restaurant", nameToShow: "Restaurante Vietnamita", category: "Restaurantes" },
  ];
  const [loading, setLoading] = useState(false);

  const groupedPreferences = preferences.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, typeof preferences>);

  async function getNearbyPlaces() {
    setLoading(true);
    if (!currentLocation) return;
    if (!isGranted) return;
    try {
      const response: PlaceDetails[] = await newPlacesApiNearbyPlace(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      if (response.length > 0) {
        setRestaurants(response);
        setShowNearbyRestaurants(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNearbyPlaces();
    }, [isGranted])
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  if (loading) {
    return (
      <View style={{ width: "100%", justifyContent: "center", paddingHorizontal: "4%"}}>
        <FlatList
          data={Array.from({ length: 10 }, (_, i) => ({
            id: i,
          }))}
          renderItem={() => (
            <>
              <View>
                <SkeletonLoader />
              </View>
            </>
          )}
        />
      </View>
    );
  }
  return (
    <ViewContainer>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha suas preferências alimentares</Text>
            <ScrollView style={styles.modalContent}>
              {Object.keys(groupedPreferences).map((category) => (
                <View key={category}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <View style={styles.optionsContainer}>
                    {groupedPreferences[category].map((option) => (
                      <TouchableOpacity
                        key={option.name}
                        style={[
                          styles.optionButton,
                          selectedOptions.includes(option.name) && styles.selectedOptionButton,
                        ]}
                        onPress={() => toggleOption(option.name)}
                      >
                        <Text>{option.nameToShow}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
            <Button title="Fechar" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <PlaceComponent data={restaurants} />
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContent: {
    width: "100%",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedOptionButton: {
    backgroundColor: "#add8e6",
  },
});

export default Home;
