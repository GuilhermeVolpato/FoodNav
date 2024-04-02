import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";

export function SignUp() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Voltar para tela de Login</Text>
      </TouchableOpacity>
    </View>
  );
}
