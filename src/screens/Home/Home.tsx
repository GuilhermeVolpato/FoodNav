import React from "react";
import { Image, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 20 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 10, color: "white" }}
          placeholder="Pesquisar"
          placeholderTextColor="white"
        />
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Text style={{ color: "white" }}>Pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 5 }}>
          <Text style={{ color: "white" }}>Filtros</Text>
        </TouchableOpacity>
      </View>


      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>Categorias</Text>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>More</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Sushi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Massas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Haburguer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Mexicana</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>Restaurantes recomendados</Text>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>Mapa</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Cia paulista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Mc donalds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>BK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "" }}>
          <Text>Sukoi</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>Restaurantes proximos</Text>
        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 24, color: "#FFFFFF" }}>Mapa</Text>
      </View>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ padding: 20, backgroundColor: "#666666", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>Restaurante tal</Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>4,5⭐</Text>
            </View>
            <Text style={{ fontSize: 16 }}>não sei</Text>
            <Text style={{ fontSize: 16 }}>Distância: 400 metros</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/400' }} style={{ width: 100, height: 100 }} resizeMode="cover" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20, backgroundColor: "#666666", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>Restaurante tal</Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>4,5⭐</Text>
            </View>
            <Text style={{ fontSize: 16 }}>não sei</Text>
            <Text style={{ fontSize: 16 }}>Distância: 400 metros</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/400' }} style={{ width: 100, height: 100 }} resizeMode="cover" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20, backgroundColor: "#666666", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>Restaurante tal</Text>
              <Text style={{ color: '#fff', fontSize: 18 }}>4,5⭐</Text>
            </View>
            <Text style={{ fontSize: 16 }}>não sei</Text>
            <Text style={{ fontSize: 16 }}>Distância: 400 metros</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/400' }} style={{ width: 100, height: 100 }} resizeMode="cover" />
        </TouchableOpacity>
      </ScrollView>







    </View>
  );
}