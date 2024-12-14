import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 12,
    padding: 24,
    paddingBottom: 100
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[200]
  },
  title: {
    marginBottom: 16,
    color: colors.gray[600],
    fontFamily: fontFamily.regular
  }
});
