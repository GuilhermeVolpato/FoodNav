import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";
import { ViewContainer, TextStyled } from "./styles";

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();

  return (
    <ViewContainer>
      <TextStyled>Home</TextStyled>
      <TouchableOpacity onPress={() => navigation.navigate("Teste1")}>
        <TextStyled>Ir para tela de restaurante</TextStyled>
      </TouchableOpacity>
    </ViewContainer>
  );
}
