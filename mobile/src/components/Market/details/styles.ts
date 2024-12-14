import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.gray[100]
  },
  name: {
    fontSize: 20,
    color: colors.gray[600],
    fontFamily: fontFamily.bold
  },
  description: {
    fontSize: 16,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 22
  },
  group: {
    width: "100%",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200]
  },
  title: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    marginBottom: 12
  },
  rule: {}
})