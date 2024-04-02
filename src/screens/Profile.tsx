import { useAuth } from "src/hooks/useAuth";
import { View, Text, TouchableOpacity } from "react-native";

export function Profile() {
  const { changeRoute } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 25 }}>
      <Text>Profile</Text>
      <TouchableOpacity style={{margin: 25}} onPress={changeRoute}>
        <Text>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}
