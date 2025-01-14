import { MaterialIcons } from "@expo/vector-icons";
import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/theme";
import { Text } from "../atoms/index";

interface Props {
  title: string;
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  style?: CSSProperties;
}

export default function ModeOption({ title, onPress, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={[styles.container, style as any]}
      activeOpacity={0.75}
    >
      <Text.ButtonSecondary>{title}</Text.ButtonSecondary>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={20}
        color={colors.accent}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderWidth: 1.6,
    borderColor: colors.accent,
    width: "100%",
    height: 56,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 5,
    marginTop: 10,
  },
});
