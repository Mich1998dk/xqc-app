import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

interface Props {
  title: string;
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  style?: CSSProperties;
  type?: "sync" | "random" | "delete" | "update" | undefined;
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
            size={22}
            color={secondary ? colors.accent : colors.white}
            style={{ marginRight: 8 }}
          />
        );
      case "random":
        return (
          <Ionicons
            name="shuffle"
            size={22}
            color={secondary ? colors.accent : colors.white}
            style={{ marginRight: 8 }}
          />
        );

      case "delete":
        return (
          <Ionicons
            name="close"
            size={22}
            color={secondary ? colors.accent : colors.white}
            style={{ marginRight: 8 }}
          />
        );
      case "update":
        return (
          <Ionicons
            name="refresh"
            size={22}
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
        <Text.ButtonSecondary style={{ fontSize: 14 }}>
          {title}
        </Text.ButtonSecondary>
      ) : (
        <Text.Button style={{ fontSize: 14 }}>{title}</Text.Button>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.6,
    borderColor: colors.background,
  },
});
