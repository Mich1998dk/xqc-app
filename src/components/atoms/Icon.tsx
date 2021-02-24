import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface Props {
  type: "menu" | "back";
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Icon({ type, onPress }: Props) {
  const iconSwitch = () => {
    switch (type) {
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
      default:
        <Text.Button>NA</Text.Button>;
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={styles.container}
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
