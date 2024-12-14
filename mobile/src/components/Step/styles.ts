import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    gap: 16,
    width: "100%",
    flexDirection: "row",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.gray[500],
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
