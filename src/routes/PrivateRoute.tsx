import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { Feather } from "@expo/vector-icons";
import { Home } from "@screens/Home";
import { Map } from "@screens/Map";
import { Profile } from "@screens/Profile";
import { Restaurant } from "@screens/Restaurant";

const { Navigator, Screen } = createBottomTabNavigator();

const Stack = createStackNavigator();

type PrivateRoutes = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
  Teste1: undefined;
  Teste2: undefined;
};

export type PrivatecNavigatorRoutesProps =
  NativeStackNavigationProp<PrivateRoutes>;

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Teste1" component={Restaurant} />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Teste1" component={Restaurant} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Teste1" component={Restaurant} />
    </Stack.Navigator>
  );
}

export function PrivateRoute() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "#000",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="MapStack"
        component={MapStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
