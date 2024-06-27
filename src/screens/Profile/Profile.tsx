import React, { useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components/native";
import MultiSelectModal from "../../screens/MultiSelectModal/MultiSelectModal"; // Ajuste o caminho conforme necessário

const ViewContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
  border-width: 2px;
  border-color: #c4bcbcf1;
`;

const UserInfoContainer = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

const UserInfoText = styled.Text`
  font-size: 16px;
  color: #666;
`;

const TouchableOpacityStyled = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const TextStyled = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export function Profile() {
  const { changeRoute } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //todo conectar com o api
  async function savePreferences() {}

  async function getPreferences() {}
  return (
    <ViewContainer>
      <HeaderContainer>
        <ProfileImage source={require("src/assets/1-antigo.jpg")} />
        <UserInfoContainer>
          <UserName>Guilherme</UserName>
          <UserInfoText>guilherme@gmail.com</UserInfoText>
        </UserInfoContainer>
      </HeaderContainer>

      <TouchableOpacityStyled onPress={toggleModal}>
        <TextStyled>Preferências Gastronômicas</TextStyled>
      </TouchableOpacityStyled>

      <TouchableOpacityStyled style={{ backgroundColor: "#FF6347" }} onPress={changeRoute}>
        <TextStyled>Deslogar</TextStyled>
      </TouchableOpacityStyled>

      <MultiSelectModal
        options={preferences}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </ViewContainer>
  );
}
