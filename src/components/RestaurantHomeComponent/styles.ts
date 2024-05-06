// RestaurantHomeComponent.styles.ts
import theme from "@theme/index";
import styled from "styled-components/native";

export const ImageWrapper = styled.View`
  height: 180px;
  width: 200px;
  overflow: hidden;
  border-radius: 30px;
  margin: 10px;
`;

export const TheImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const TextContainer = styled.View`
  background-color: ${theme.COLORS.GRAY_100_TRANSPARENT};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  padding: 10px;
`;
