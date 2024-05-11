// RestaurantHomeComponent.styles.ts
import theme from "@theme/index";
import styled from "styled-components/native";

export const ImageWrapper = styled.View`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const TheImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 30px;

  background-color: ${theme.COLORS.GRAY_100_TRANSPARENT};
`;

export const TextContainer = styled.View`
  background-color: ${theme.COLORS.GRAY_100_TRANSPARENT};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  padding: 10px;
`;
