import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
