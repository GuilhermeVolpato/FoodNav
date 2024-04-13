import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "src/hooks/useAuth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { StatusBar } from "react-native";
import theme from "@theme/index";

export function Routes() {
  const { boolean } = useAuth();
  return (
    <NavigationContainer>
      {boolean ? <PrivateRoute /> : <PublicRoute />}
    </NavigationContainer>
  );
}
