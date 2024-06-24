import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Share, Alert, Linking, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { PlaceDetails } from "src/dto/newApiPlacesDTO";
import MapView, { Marker } from "react-native-maps";
import { useLocation } from "@hooks/useUserLocation";
import { Card, Title, Paragraph } from "react-native-paper";

interface params {
  item: PlaceDetails;
}

export function Restaurant() {
  const { currentLocation } = useLocation();
  const [places, setPlaces] = useState([]);
  const mapRef = useRef<MapView>(null);
  const route = useRoute();
  const { item } = route.params as params;
  const photoUrl = item?.photos[0]?.authorAttributions[0]?.photoUri
    ? `https:${item?.photos[0]?.authorAttributions[0]?.photoUri}`
    : "";

  async function sharePlace() {
    try {
      await Share.share({
        message: `Check out this place: ${item.displayName.text} located at ${item.formattedAddress}, Shared via FoodNav`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const DirectionButton = (latitude: any, longitude: any) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>{item.displayName.text}</Title>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={24} color="gold" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.userRatingCount} reviews)
          </Text>
        </View>
        <Image style={styles.image} source={{ uri: photoUrl }} />

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Endereço</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.formattedAddress}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Website</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.websiteUri}
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Horário de Funcionamento</Title>
            {item.currentOpeningHours.weekdayDescriptions.map((day, index) => (
              <Paragraph key={index} style={styles.cardText} selectable>
                {day}
              </Paragraph>
            ))}
            <Paragraph style={{ color: item.currentOpeningHours.openNow ? "green" : "red" }} selectable>
              {item.currentOpeningHours.openNow ? "Aberto" : "Fechado"}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Serviços Oferecidos</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.dineIn && "Dine-In "}
              {item.delivery && "Delivery "}
              {item.takeout && "Takeout "}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Comidas e Bebidas</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.servesBreakfast && "Café da Manhã "}
              {item.servesDinner && "Jantar "}
              {item.servesDessert && "Sobremesas "}
              {item.servesBeer && "Cerveja "}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Opções de Pagamento</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.paymentOptions.acceptsCashOnly && "Aceita apenas dinheiro "}
              {item.paymentOptions.acceptsCreditCards && "Aceita cartões de crédito "}
              {item.paymentOptions.acceptsDebitCards && "Aceita cartões de débito "}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Acessibilidade</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.accessibilityOptions.wheelchairAccessibleEntrance && "Entrada Acessível "}
              {item.accessibilityOptions.wheelchairAccessibleParking && "Estacionamento Acessível "}
              {item.accessibilityOptions.wheelchairAccessibleRestroom && "Banheiro Acessível "}
              {item.accessibilityOptions.wheelchairAccessibleSeating && "Assentos Acessíveis "}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Facilidades</Title>
            <Paragraph style={styles.cardText} selectable>
              {item.liveMusic && "Música ao Vivo"}
              {item.goodForChildren && "Bom para Crianças"}
              {item.goodForGroups && "Bom para Grupos"}
            </Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => DirectionButton(item.location.latitude, item.location.longitude)}
            style={styles.button}
          >
            <Feather name="navigation" size={24} color="white" />
            <Text style={styles.buttonText}>Direção</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sharePlace()} style={styles.button}>
            <Feather name="share" size={24} color="white" />
            <Text style={styles.buttonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation?.coords.latitude ?? 0,
            longitude: currentLocation?.coords.longitude ?? 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            onPress={() =>
              Alert.alert(
                "Você está aqui",
                `Sua coordenada atual é ${currentLocation?.coords.latitude}, ${currentLocation?.coords.longitude}`
              )
            }
            coordinate={{
              latitude: currentLocation?.coords.latitude ?? 0,
              longitude: currentLocation?.coords.longitude ?? 0,
            }}
            title="Você está aqui"
            description="Sua localização atual"
          />
          {[item].map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.location.latitude,
                longitude: place.location.longitude,
              }}
              onPress={() =>
                Alert.alert("Restaurante encontrado", "Clique em 'Direção' para obter a rota até o restaurante")
              }
              description={place.shortFormattedAddress}
            />
          ))}
        </MapView>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Avaliações</Title>
            {item.reviews.map((review, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.reviewAuthor}>{review.authorAttribution.displayName}</Text>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Feather name="star" size={16} color="gold" style={{ marginRight: 4 }} />
                  <Paragraph style={styles.cardText} selectable>
                    {review.rating} estrelas
                  </Paragraph>
                </View>
                <Paragraph style={styles.cardText} selectable>
                  {review.originalText.text}
                </Paragraph>
                <Paragraph style={styles.cardText} selectable>
                  {review.relativePublishTimeDescription}
                </Paragraph>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#c4bcbcf1",
  },
  card: {
    marginTop: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  cardTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    color: "#666",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 40,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 5,
  },
  map: {
    width: "100%",
    height: 300,
    marginTop: 15,
    borderRadius: 4,
  },
  reviewAuthor: {
    fontWeight: "bold",
    color: "#000",
  },
  menuImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Restaurant;
