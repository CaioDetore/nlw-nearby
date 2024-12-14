import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 24,
    marginBottom: 28
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.gray[600]
  },
  subtitle: {
    fontSize: 16,
    marginTop: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.regular
  }
})