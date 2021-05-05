import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { customAlert } from "../../utils/helpers";
import { fonts, colors, sizes } from "../../utils/theme";
import * as Text from "../atoms/Text";

interface Props {
  onPressSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  thumbnail?: string;
}

export default function SubmitOverlay({ onPressSubmit, thumbnail }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.submitContainer, styles.positive]}></View>
      <TouchableOpacity
        onPress={onPressSubmit as any}
        style={[styles.submitContainer, styles.submit]}
      >
        <Text.Button>S</Text.Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "20%",
    flexDirection: "row",
    zIndex: 999,
    justifyContent: "space-between",
  },
  submitContainer: {
    zIndex: 1000,
    height: "100%",
    flex: 1,
  },

  positive: {
    flex: 5,
  },
  submit: {
    flex: 1,
    backgroundColor: colors.submitOverlay,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
});
