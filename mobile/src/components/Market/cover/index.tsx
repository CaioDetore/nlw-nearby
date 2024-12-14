import { ImageBackground, View } from "react-native"
import { s } from "./styles"
import { Button } from "@/components/Button"
import { router } from "expo-router"
import { IconArrowLeft } from "@tabler/icons-react-native"

type Props = {
  uri: string
}

export function Cover({uri} : Props) {
  return <ImageBackground source={{uri}} style={s.contianer}>
    <View style={s.header}>
      <Button style={{width: 40, height: 40}} onPress={() => router.back()}>
        <IconArrowLeft size={16} color={"red"} />
      </Button>
    </View>
  </ImageBackground>
}