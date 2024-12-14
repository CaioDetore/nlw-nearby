import { Image, Text, View } from "react-native";

import { s } from "./styles";

export function Wellcome() {
  return (
    <View>
      <Image style={s.logo} source={require("@/assets/logo.png")}></Image>

      <Text style={s.title}>Boas vindas ao Nearby!</Text>

      <Text style={s.subtitle}>
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
      </Text>
    </View>
  );
}
