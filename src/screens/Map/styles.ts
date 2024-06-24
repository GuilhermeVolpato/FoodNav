import styled from "styled-components/native";
import theme from "@theme/index";
import Constants from "expo-constants";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Platform, StatusBar } from "react-native";

type MapStyleElement = SafeAreaViewProps & {
  color?: string;
};

export const SafeAreaViewContainer = styled.SafeAreaView<MapStyleElement>`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const ViewContainer = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TouchableOpacityStyled = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: ${theme.COLORS.WHITE};
  padding: 20px;
  border-radius: 8px;
  align-self: center;
`;

export const ButtonText = styled.Text`
  color: ${theme.COLORS.BLUE_200};
`;

export const TextContainer = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const TextStyled = styled.Text`
  text-align: center;
`;

export const SearchBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
  position: absolute;
  top: 25px;
  z-index: 1;
  margin-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 60}px;
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
  border-color: "black";
  padding: 4px;
  border-radius: 16px;
  background-color: ${theme.COLORS.GRAY_500};
  padding-left: 16px;
  width: 80%;
`;
