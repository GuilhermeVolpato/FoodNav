import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export function LoadingAnimation() {
  const [color, setColor] = useState("teal");

  useEffect(() => {
    const id = setInterval(() => {
      setColor((prevColor) => (prevColor === "teal" ? "royalblue" : "teal"));
    }, 700);

    return () => clearInterval(id);
  }, []);

  return (
    <View>
      <ActivityIndicator
        style={{ width: 24, height: 24 }}
        color={color}
        size={64}
      />
    </View>
  );
}
