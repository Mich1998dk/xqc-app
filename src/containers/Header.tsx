import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, sizes, fonts } from "../utils/theme";
import { Text } from "../components/atoms/index";
import i18n from "i18n-js";

interface Props {
  title: string | "";
  goBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({ title, goBack }: Props) {
  return (
    <View style={styles.container}>
      {goBack && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          //@ts-ignore
          onPress={goBack}
        >
          <Ionicons color={colors.dark} size={24} name="chevron-back-sharp" />
        </TouchableOpacity>
      )}

      {title && <Text.Header>{title}</Text.Header>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingBottom: 14,
    alignItems: "center",
    marginBottom: 4,
  },
  backButton: {
    position: "absolute",
    left: 12,
    top: 0,
    width: 40,
    height: 40,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#adadad",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 13.65,

    elevation: 7,
  },
});
