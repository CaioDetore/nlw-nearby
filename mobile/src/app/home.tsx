import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { api } from "@/services/api";
import { Categories, CategoriesProps } from "@/components/Categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";

import * as Location from "expo-location";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      if (data) {
        setCategories(data);
        setCategory(data[0].id);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  }

  async function fetchMarkets() {
    try {
      console.log(category)
      if (!category || category.trim() == "") {
        return;
      }

      const { data } = await api.get("/markets/category/" + category);
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            image={require("@/assets/pin.png")}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {markets?.length > 0 && <Places data={markets} />}
    </View>
  );
}
