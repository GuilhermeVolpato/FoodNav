import React, { useEffect, useState } from "react";
import { Animated, Easing, View } from "react-native";

export function LoadingPulse() {
  const [scale] = useState(new Animated.Value(1));
  const [pulseAnimation, setPulseAnimation] = useState<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: getRandomValue(0.6, 0.8),
          duration: 750,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 750,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
          useNativeDriver: true,
        }),
      ])
    );

    setPulseAnimation(animation);

    animation.start();

    return () => animation.stop();
  }, []);

  const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          transform: [{ scale }],
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "rgba(70,130,180,0.7)",
        }}
      />
    </View>
  );
}
