import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  style?: CSSProperties;
  type?: "sync" | "random";
}

export default function IconButton({
  title,
  onPress,
  secondary,
  style,
  type,
}: Props) {
  const iconSwitch = () => {
    switch (type) {
      case "sync":
        return (
          <Ionicons
            name="sync-outline"
            size={26}
            color={secondary ? colors.accent : colors.white}
            style={{ marginRight: 8 }}
          />
        );
      case "random":
        return (
          <Ionicons
            name="shuffle"
            size={26}
            color={secondary ? colors.accent : colors.white}
            style={{ marginRight: 8 }}
          />
        );
      default:
        return <View></View>;
    }
  };

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
      activeOpacity={0.5}
    >
      {iconSwitch()}
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
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
