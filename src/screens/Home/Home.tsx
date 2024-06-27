import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, ScrollView, View, Modal, Button, StyleSheet } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { ViewContainer } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "@hooks/useUserLocation";
import PlaceComponent from "@components/PlaceComponent/PlaceComponent";
import newPlacesApiNearbyPlace from "@services/placesApi/endpoints/newPlacesApiNearbyPlace";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import SkeletonLoader from "@components/SkeletonLoader/SkeletonLoader";
import { FlatList } from "react-native-gesture-handler";
import { api } from "@services/api/api";

type geminiParams = {
  latitude: number | undefined;
  longitude: number | undefined;
  id: number; 
};

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  const { currentLocation, isGranted } = useLocation();
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<PlaceDetails[]>([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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
  
  async function getUserPreferences(userId: any) {
    try {
      const response = await api.get(`/preferences/user/3`);
      if(response?.data?.userPreferences){
        await getGeminiRec(3)
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  }

  async function getGeminiRec(id: number) {
    let params: geminiParams;
    params = {
      latitude: currentLocation?.coords.latitude,
      longitude: currentLocation?.coords.longitude,
      id: id,
    };
    try {
      const response = await api.get("/gemini", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching Gemini recommendations:", error);
      throw error; 
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNearbyPlaces();
      getUserPreferences(3);
    }, [isGranted])
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  async function postPref(pref: []) {

  }

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      if(selectedOptions.length > 0){

      }
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  if (loading) {
    return (
      <View style={{ width: "100%", justifyContent: "center", paddingHorizontal: "4%" }}>
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
