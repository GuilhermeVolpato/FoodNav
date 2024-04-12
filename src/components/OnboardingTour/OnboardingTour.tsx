import React from "react";
import { Text, View } from "react-native";
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
  function renderSlides({ item }: { item: Slide }) {

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={item.image}
          contentFit="contain"
          style={{ height: "55%", width: "80%", marginBottom: 20 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {item.description}
        </Text>
      </View>
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
        <Feather name="check" size={20}/>
      </View>
    );
  }

  function renderNextButton() {
    return (
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 30,
          backgroundColor: "#87CEFA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="arrow-right" size={20}/>
      </View>
    );
  }

  function renderPrevButton() {
    return (
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#87CEFA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="arrow-left" />
      </View>
    );
  }

  return (
    <AppIntroSlider
      renderItem={renderSlides}
      data={slides}
      activeDotStyle={{ backgroundColor: "red", width: 30 }}
      style={{ backgroundColor: "#d3d3d3" }}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderPrevButton={renderPrevButton}
      onDone={onDone}
    />
  );
}
