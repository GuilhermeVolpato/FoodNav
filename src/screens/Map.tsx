import { View, Text } from "react-native";
import { LoadingAnimation } from "@components/LoadingAnimation";

export function Map() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Map</Text>
      <LoadingAnimation />
    </View>
  );
}
