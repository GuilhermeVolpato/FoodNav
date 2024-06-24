import styled from "styled-components/native";

export const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #F8F8FF;
`;

export const InputStyled = styled.TextInput`
  height: 50px;
  background-color: #FFFFFF;
  border-color: #000;
  border-width: 1px;
  margin: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  height: 50px;
  background-color: #4682B4;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
  width: 100%;
`;

export const ButtonTextStyled = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

export const TextStyled = styled.Text`
  color: #FF4500;
  font-size: 14px;
  margin-bottom: 10px;
`;
