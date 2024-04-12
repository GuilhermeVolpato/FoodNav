import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, ActivityIndicatorProps } from "react-native";

type LoadingAnimationProps = ActivityIndicatorProps & {
  loading: boolean;
};

export function LoadingAnimation({ loading, ...props }: LoadingAnimationProps) {
  const [color, setColor] = useState("dodgerblue");

  useEffect(() => {
    const id = setInterval(() => {
      setColor((prevColor) => (prevColor === "dodgerblue" ? "mediumseagreen" : "dodgerblue"));
    }, 700);

    return () => clearInterval(id);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <ActivityIndicator color={color} {...props} />
    </View>
  );
}
