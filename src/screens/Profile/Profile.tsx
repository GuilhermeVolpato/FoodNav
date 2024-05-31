import React, { useState } from 'react';
import { useAuth } from "src/hooks/useAuth";
import { TextStyled, TouchableOpacityStyled, ViewContainer } from "./styles";
import MultiSelectModal from "../../screens/MultiSelectModal/MultiSelectModal"; // Ajuste o caminho conforme necessário

export function Profile() {
  const { changeRoute } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  const options = [
    'Churrascaria', 'Hamburgueria', 'Pizzaria', 'Sushi bar', 'Cafeteria', 'Restaurante de frutos do mar', 'Restaurante vegetariano',
    'Restaurante vegano', 'Restaurante de comida caseira', 'Restaurante de comida típica brasileira', 'Restaurante de comida italiana autêntica',
     'Restaurante de comida mexicana autêntica','Restaurante francês','Cantina italiana'
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ViewContainer>
      <TextStyled>Profile</TextStyled>
      <TouchableOpacityStyled style={{ margin: 25 }} onPress={changeRoute}>
        <TextStyled>Deslogar</TextStyled>
      </TouchableOpacityStyled>
      
      <TouchableOpacityStyled onPress={toggleModal}>
        <TextStyled>Preferências Gastronômicas</TextStyled>
      </TouchableOpacityStyled>

      <MultiSelectModal
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </ViewContainer>
  );
}
