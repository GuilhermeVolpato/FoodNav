import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "../../src/screens/SignIn";
import { SignUp } from "../../src/screens/SignUp";

type PublicRoutes = {
  SignIn: undefined;
  SignUp: undefined;
};

export type PublicNavigatorRoutesProps =
  NativeStackNavigationProp<PublicRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutes>();

export function PublicRoute() {
  return (
    <Navigator initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
