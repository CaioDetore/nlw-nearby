import { FlatList, View } from "react-native";
import { s } from "./styles";
import { Category } from "../Category";

export type CategoriesProps = {
  id: string;
  name: string;
}[];

type Props = {
  selected: string;
  data: CategoriesProps;
  onSelect: (id: string) => void;
};

export function Categories({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      horizontal
      data={data}
      style={s.container}
      keyExtractor={(item) => item.id}
      contentContainerStyle={s.content}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
    />
  );
}
