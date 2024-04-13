import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { ViewContainer, TextStyled } from "./styles";
import RestaurantHomeComponent from "@components/RestaurantHomeComponent/RestaurantHomeComponent";

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();

  return (
    <ViewContainer>
      <Text style={{marginTop: 50, marginBottom: 25, right: 100, fontSize: 25, color: 'white'}}> Churrascarias </Text>
      <ScrollView horizontal>
        <RestaurantHomeComponent />
        <RestaurantHomeComponent />
        <RestaurantHomeComponent />
        <RestaurantHomeComponent />
        <RestaurantHomeComponent />
      </ScrollView>
      <TextStyled>Home</TextStyled>
      <TouchableOpacity onPress={() => navigation.navigate("Teste1")}>
        <TextStyled>Ir para tela de restaurante</TextStyled>
      </TouchableOpacity>
    </ViewContainer>
  );
}
