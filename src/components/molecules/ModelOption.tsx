import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text } from "../atoms/index";
import { Model } from "../../utils/types";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  model: Model;
}

export default function ModeOption({ onPress, style, model }: Props) {
  var stats = [
    { title: "SEEN", value: model.seen.length, color: "#fff" },
    { title: "POSITIVES", value: model.positives.length, color: colors.green },
    { title: "NEGATIVES", value: model.negatives.length, color: colors.red },
  ];

  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={[styles.container, style as any]}
      activeOpacity={0.75}
    >
      <View style={styles.top}>
        <Text.ButtonSecondary>{model.name.toUpperCase()}</Text.ButtonSecondary>
        <Text.Small style={{ opacity: 0.3 }}>{model.mode} MODE</Text.Small>
      </View>
      <View style={styles.bottom}>
        {stats.map((item, index) => {
          return (
            <View key={index} style={styles.stat}>
              <Text.Small style={{ opacity: 0.4 }}>{item.title}</Text.Small>
              <Text.Header style={{ color: item.color }}>
                {item.value}
              </Text.Header>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderWidth: 1.6,
    borderColor: colors.accent,
    width: "100%",
    borderRadius: 28,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  bottom: {
    flexDirection: "row",
    width: "100%",
  },
  stat: {
    flexDirection: "column",
    marginRight: 25,
  },
});
