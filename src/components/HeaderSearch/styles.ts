import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Platform, StatusBar } from "react-native";
import theme from "@theme/index";

export const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 5%;
  position: absolute;
  top: 10px;
  z-index: 1;
  margin-top: ${Platform.OS === "android" ?  StatusBar.currentHeight : 60}px;
`;

export const FeatherLogo = styled(Feather).attrs({
  name: "map-pin",
  size: 24,
  color: theme.COLORS.GRAY_100,
})`
  width: 35px;
`;

export const SearchBar = styled.TextInput.attrs({
  placeholder: "Procure por restaurantes",
  placeholderTextColor: theme.COLORS.GRAY_300,
})`
  border-width: 1px;
  border-color: ${theme.COLORS.GRAY_300};
  padding: 4px;
  border-radius: 16px;
  background-color: ${theme.COLORS.GRAY_500};
  padding-left: 16px;
  width: 80%;
`;
