import { useAuth } from "src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import { TouchableOpacityStyled, ViewContainer, TextStyled } from "./styles";

export function SignIn() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  const { changeRoute } = useAuth();

  return (
    <ViewContainer>
      <TouchableOpacityStyled onPress={() => navigation.navigate("SignUp")}>
        <TextStyled>Criar conta</TextStyled>
      </TouchableOpacityStyled>

      <TouchableOpacityStyled onPress={() => changeRoute()}>
        <TextStyled>Realizar Login</TextStyled>
      </TouchableOpacityStyled>
    </ViewContainer>
  );
}
