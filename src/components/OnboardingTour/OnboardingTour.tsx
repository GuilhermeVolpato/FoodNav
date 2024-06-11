import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import AppIntroSlider from "react-native-app-intro-slider";
import slides from "slides";
import { Feather } from "@expo/vector-icons";

type Slide = {
  key: string;
  title: string;
  description: string;
  image: string;
};

export function OnboardingTour({ onDone }: { onDone: () => void }) {
  function renderSlides({ item, index }: { item: Slide, index: number }) {

    let textPosition = "center"; // posição padrão do texto

    // Determinar a posição do texto com base no índice do slide
    if (index === 0) {
      textPosition = "top"; // texto no topo para o primeiro slide
    } else if (index === 1) {
      textPosition = "top"; // texto na parte inferior para o segundo slide
    }


    return (
      <ImageBackground
        source={item.image}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={{ alignItems: "center", position: textPosition === "top" ? "absolute" : "relative", top: textPosition === "top" ? 50 : undefined, bottom: textPosition === "bottom" ? 50 : undefined }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "white" }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", color: "white" }}>
            {item.description}
          </Text>
        </View>

      </ImageBackground>
    );

  }

  function renderDoneButton() {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          backgroundColor: "#87CEFA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="check" size={20} />
      </View>
    );
  }

  function renderNextButton() {
    return (
      <View
      >

      </View>
    );
  }

  function renderPrevButton() {
    return (
      <View

      >

      </View>
    );
  }

  return (
    <AppIntroSlider
      renderItem={renderSlides}
      data={slides}
      activeDotStyle={{ backgroundColor: "red", width: 30, marginBottom: 50 }}
      dotStyle={{ backgroundColor: "gray", width: 30, marginBottom: 50 }}
      style={{ backgroundColor: "#d3d3d3" }}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderPrevButton={renderPrevButton}
      onDone={onDone}
    />
  );
}