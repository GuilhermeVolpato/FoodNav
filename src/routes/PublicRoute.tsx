import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignIn } from "../screens/SignIn/SignIn";
import { SignUp } from "../screens/SignUp/SignUp";
import theme from "@theme/index";

type PublicRoutes = {
  SignIn: undefined;
  SignUp: undefined;
};

export type PublicNavigatorRoutesProps = NativeStackNavigationProp<PublicRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutes>();

export function PublicRoute() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: theme.COLORS.GRAY_600,
        }
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
