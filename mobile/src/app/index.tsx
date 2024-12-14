import { View } from "react-native";

import { router } from "expo-router";

import { Steps } from "@/components/Steps";
import { Button } from "@/components/Button";
import { Wellcome } from "@/components/Wellcome";

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Wellcome />

      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
