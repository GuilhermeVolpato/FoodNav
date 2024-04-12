import { useAuth } from "src/hooks/useAuth";
import { TextStyled, TouchableOpacityStyled, ViewContainer } from "./styles";

export function Profile() {
  const { changeRoute } = useAuth();
  return (
    <ViewContainer>
      <TextStyled>Profile</TextStyled>
      <TouchableOpacityStyled style={{ margin: 25 }} onPress={changeRoute}>
        <TextStyled>Deslogar</TextStyled>
      </TouchableOpacityStyled>
    </ViewContainer>
  );
}
