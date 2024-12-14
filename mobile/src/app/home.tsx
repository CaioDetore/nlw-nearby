import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/services/api";
import { Categories, CategoriesProps } from "@/components/Categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView from "react-native-maps";

type MarketsProps = PlaceProps & {};

export default function Home() {
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data);
      setCategory(data[0]);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category && category.trim() != "") {
        return;
      }

      const { data } = await api.get("/markets/category/" + category);
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView style={{flex: 1}} />

      <Places data={markets} />
    </View>
  );
}
