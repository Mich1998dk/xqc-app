import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";

interface Props {
  onPressPositive?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPressNegative?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  negativeSelected?: boolean;
  positiveSelected?: boolean;
}

export default function ImageOverlay({
  onPressPositive,
  onPressNegative,
  negativeSelected,
  positiveSelected,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressNegative as any}
        style={[
          styles.feedbackContainer,
          styles.negative,
          negativeSelected ? styles.selected : {},
        ]}
      >
        <Text.Header>-</Text.Header>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressPositive as any}
        style={[
          styles.feedbackContainer,
          styles.positive,
          positiveSelected ? styles.selected : {},
        ]}
      >
        <Text.Header>+</Text.Header>
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
    height: "30%",
    flexDirection: "row",
    backgroundColor: "#888",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 998,
    justifyContent: "space-between",
  },
  feedbackContainer: {
    zIndex: 999,
    height: "100%",
    flex: 1,
    width: 95,
  },
  positive: {
    backgroundColor: colors.positiveOverlay,
    borderBottomRightRadius: 12,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 8,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  negative: {
    backgroundColor: colors.negativeOverlay,
    borderBottomLeftRadius: 12,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 8,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    borderWidth: 2,
    borderColor: colors.white,
  },
});
