import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    gap: 8,
    height: 36,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderColor: colors.gray[300],
    backgroundColor: colors.gray[100],
  },
  name: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
  containerSelected: {
    backgroundColor: colors.green.base,
    borderWidth: 0,
  },
  nameSelected: {
    color: colors.gray[100],
  },
});
