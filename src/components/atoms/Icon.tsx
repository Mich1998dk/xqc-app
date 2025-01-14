import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/theme";

interface Props {
  type:
    | "menu"
    | "back"
    | "delete"
    | "time"
    | "search"
    | "filter"
    | "history"
    | "reset";
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
      case "history":
        return (
          <MaterialCommunityIcons
            name="timer-sand-full"
            size={20}
            color={colors.accent}
          />
        );
      case "search":
        return (
          <Ionicons name="search-outline" size={26} color={colors.accent} />
        );
      case "reset":
        return <Ionicons name="refresh" size={22} color={colors.accent} />;

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
           return <View></View>;
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
