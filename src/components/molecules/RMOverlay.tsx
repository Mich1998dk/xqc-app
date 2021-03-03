import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RMOverlay({ onClick }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onClick as any}
        style={styles.feedbackContainer}
      >
        <Text.Button>Remove</Text.Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "20%",
    flexDirection: "row",
    backgroundColor: "#888",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 998,
  },
  feedbackContainer: {
    zIndex: 999,
    height: "100%",
    flex: 1,
    backgroundColor: colors.loader_bg,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
