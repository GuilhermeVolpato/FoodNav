import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";

export function Home() {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Teste1")}>
        <Text>Ir para tela de restaurante</Text>
      </TouchableOpacity>
    </View>
  );
}
