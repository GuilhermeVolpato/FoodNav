import { Image, Text, View, StyleSheet, TouchableOpacity, Share } from "react-native";
import { ViewContainer } from "./styles";
import { useRoute } from "@react-navigation/native";
import { PlaceResult } from "src/dto/apiPlacesDTO";
import { Feather } from "@expo/vector-icons";
import theme from "@theme/index";

interface params {
  item: PlaceResult;
}

export function Restaurant() {
  const route = useRoute();
  const { item } = route.params as params;
  const photoUrl =
    item?.photos?.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${process.env.API_KEY}`
      : item.icon;

  async function sharePlace() {
    try {
      // pegar imagem para compartilhar também

      await Share.share({
        message: `Check out this place: ${item.name} located at ${item.vicinity}, Shared via FoodNav`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_500 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 26 }}>{item.name}</Text>
        <View
          style={{
            alignItems: "center",
            gap: 5,
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Feather name="star" size={24} color="yellow" />
          <Text>{item.rating}</Text>
        </View>
        <Image style={{ width: "100%", height: 200, borderRadius: 15, marginTop: 10 }} source={{ uri: photoUrl }} />
        <Text style={{ fontSize: 16, marginTop: 10, color: theme.COLORS.GRAY_300 }}>
          {"Endereço: "}
          {item.vicinity}
        </Text>
        {item?.opening_hours?.open_now ? (
          <Text style={{ color: item?.opening_hours?.open_now ? "green" : "red" }}>
            {item?.opening_hours?.open_now == true ? "Aberto" : "Fechado"}
          </Text>
        ) : null}

        <View style={{ marginTop: 10, flexDirection: "row", display: "flex", gap: 10, justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: theme.COLORS.GRAY_200,
              width: 110,
              padding: 3,
              borderRadius: 40,
              justifyContent: "center",
            }}
          >
            <Feather name="navigation" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Direction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sharePlace()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: theme.COLORS.GRAY_200,
              width: 90,
              padding: 3,
              borderRadius: 40,
              justifyContent: "center",
            }}
          >
            <Feather name="share" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
