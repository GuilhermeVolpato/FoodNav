import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "src/hooks/useAuth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function Routes() {
  const { boolean } = useAuth();
  return <NavigationContainer>{boolean ? <PrivateRoute /> : <PublicRoute />}</NavigationContainer>;
}
