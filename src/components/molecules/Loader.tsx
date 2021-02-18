import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";

interface Props {}

export default function Loader({}: Props) {
  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <ActivityIndicator size="large" />
      <Text.Regular></Text.Regular>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 99,
    bottom: 0,
    backgroundColor: colors.loaderBackground,
    justifyContent: "center",
    alignItems: "center",
  },
});
