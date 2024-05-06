import { View, Text, TouchableOpacity, FlatListProps } from "react-native";
import React from "react";
import { PlaceResult } from "src/dto/apiPlacesDTO";
import { FlatList } from "react-native-gesture-handler";
import PlaceItem from "./PlaceItem/PlaceItem";
import RestaurantHomeComponent from "@components/RestaurantHomeComponent/RestaurantHomeComponent";
import { useNavigation } from "@react-navigation/native";
import { PrivatecNavigatorRoutesProps } from "src/routes/PrivateRoute";

type PlaceComponentProps = {
  data: PlaceResult[];
};

export default function PlaceComponent({ data }: PlaceComponentProps) {
  const navigation = useNavigation<PrivatecNavigatorRoutesProps>();
  return (
    <View style={{ flex: 1, width: "95%" }}>
      <Text style={{ marginTop: 25, marginBottom: 15, fontSize: 20, color: "white" }}>
        {" "}
        {data.length} Restaurantes Próximos!
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { item: item })}>
            {index % 4 === 0 ? <RestaurantHomeComponent data={item} /> : <PlaceItem data={item} />}

          </TouchableOpacity>
        )}
      />
    </View>
  );
}
