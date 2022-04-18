import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/theme";
import * as Text from "../atoms/Text";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RMOverlay({ onClick }: Props) {
  return (
    <TouchableOpacity onPress={onClick as any} style={styles.container}>
      <Text.Button>Remove</Text.Button>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(28, 28, 28, 0.60)",
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
