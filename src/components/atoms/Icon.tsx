import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  type: "menu" | "back" | "delete" | "time" | "search" | "filter";
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  marginRight?: boolean;
}

export default function Icon({ type, onPress, marginRight }: Props) {
  const iconSwitch = () => {
    switch (type) {
      case "time":
        return (
          <Ionicons name="ios-timer-outline" size={26} color={colors.accent} />
        );
      case "search":
        return (
          <Ionicons name="search-outline" size={26} color={colors.accent} />
        );
      case "menu":
        return <Ionicons name="ios-menu" size={26} color={colors.accent} />;
      case "back":
        return (
          <MaterialIcons
            name="keyboard-arrow-left"
            size={26}
            color={colors.accent}
          />
        );
      case "delete":
        return (
          <MaterialCommunityIcons
            name="delete"
            size={24}
            color={colors.accent}
          />
        );
      case "filter":
        return <FontAwesome name="filter" size={24} color={colors.accent} />;
      default:
        <Text.Button>NA</Text.Button>;
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={[styles.container, marginRight ? { marginRight: 10 } : {}]}
      activeOpacity={0.5}
    >
      {iconSwitch()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.box,
    height: 42,
    width: 42,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
