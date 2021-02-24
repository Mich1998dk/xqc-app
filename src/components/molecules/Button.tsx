import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";

interface Props {
  title: string;
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  style?: CSSProperties;
}

export default function Button({ title, onPress, secondary, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={[
        styles.container,
        style as any,
        secondary
          ? {
              backgroundColor: colors.background,
              borderWidth: 1.6,
              borderColor: colors.accent,
            }
          : {},
      ]}
      activeOpacity={0.75}
    >
      {secondary ? (
        <Text.ButtonSecondary>{title}</Text.ButtonSecondary>
      ) : (
        <Text.Button>{title}</Text.Button>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    width: 340,
    height: 52,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
