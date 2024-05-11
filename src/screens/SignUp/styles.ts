import theme from "@theme/index";
import styled from "styled-components/native";

export const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_600};
`;

export const TextStyled = styled.Text`
  color: ${theme.COLORS.RED};
  font-size: 14px;
`;
