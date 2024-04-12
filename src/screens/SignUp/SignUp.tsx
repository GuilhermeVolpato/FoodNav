import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import { ViewContainer, TextStyled } from "./styles";

export function SignUp() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  return (
    <ViewContainer>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <TextStyled>Voltar para tela de Login</TextStyled>
      </TouchableOpacity>
    </ViewContainer>
  );
}
