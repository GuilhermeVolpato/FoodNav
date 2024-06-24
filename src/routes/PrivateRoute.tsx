import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { Feather } from "@expo/vector-icons";
import { Home } from "@screens/Home/Home";
import { Map } from "@screens/Map/Map";
import { Profile } from "@screens/Profile/Profile";
import { Restaurant } from "@screens/Restaurant/Restaurant";
import theme from "@theme/index";
import { PlaceResult } from "src/dto/apiPlacesDTO";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";

const { Navigator, Screen } = createBottomTabNavigator();

const Stack = createStackNavigator();

type PrivateRoutes = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
  Restaurant: { item: PlaceDetails };
  Teste2: undefined;
};

export type PrivatecNavigatorRoutesProps = NativeStackNavigationProp<PrivateRoutes>;

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Teste1" component={Restaurant} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.COLORS.GRAY_600,
        },
        headerTintColor: theme.COLORS.GRAY_150,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Teste1" component={Restaurant} />
    </Stack.Navigator>
  );
}

export function PrivateRoute() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.RED_500,
        tabBarInactiveTintColor: theme.COLORS.GRAY_300,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_400,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Screen
        name="MapStack"
        component={MapStack}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="map" size={size} color={color} />,
        }}
      />
      <Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Navigator>
  );
}
