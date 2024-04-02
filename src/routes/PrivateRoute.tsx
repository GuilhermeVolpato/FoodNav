import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { Home } from "@screens/Home";
import { Map } from "@screens/Map";
import { Profile } from "@screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

type PrivateRoutes = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
};

export type PrivatecNavigatorRoutesProps =
  NativeStackNavigationProp<PrivateRoutes>;

export function PrivateRoute() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "#000",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
