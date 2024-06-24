import styled from 'styled-components/native';

export const ViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const UserInfoContainer = styled.View`
  margin-left: 15px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const UserInfoText = styled.Text`
  font-size: 14px;
  color: #ccc;
`;

export const TextStyled = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const TouchableOpacityStyled = styled.TouchableOpacity`
  background-color: #006600;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
`;
