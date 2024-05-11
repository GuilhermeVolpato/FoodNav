import styled from "styled-components/native";
import theme from "@theme/index";
import Constants from "expo-constants";
import { SafeAreaViewProps } from "react-native-safe-area-context";

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

export const ViewMap = styled.View`
  flex: 1;
  width: 100%;
  background-color: black;
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
