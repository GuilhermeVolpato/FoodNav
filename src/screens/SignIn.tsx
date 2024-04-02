import { useAuth } from "src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";

export function SignIn() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  const { changeRoute } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ margin: 20 }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ margin: 20 }} onPress={() => changeRoute()}>
        <Text>Realizar Login</Text>
      </TouchableOpacity>
    </View>
  );
}
