import { View, Text } from "react-native";
import React from "react";
import images from "@assets/images.jpg";
import { ImageWrapper, TheImage, TextContainer } from "./styles";

export default function RestaurantHomeComponent() {
  return (
    <ImageWrapper>
      <TheImage source={images} resizeMode="cover">
        <TextContainer>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
              <Text>nome rest</Text>
              <Text>35 estrela</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
              <Text>criciuma</Text>
              <Text>300 m</Text>
            </View>
          </View>
        </TextContainer>
      </TheImage>
    </ImageWrapper>
  );
}
