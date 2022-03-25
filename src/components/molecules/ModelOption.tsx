import React, { CSSProperties } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text, Icon } from "../atoms/index";
import { Mode, Model } from "../../utils/types";
import moment from "moment";

interface Props {
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  model: Model;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  mode: string;
}


export default function ModeOption({ onPress, onDelete, style, model, mode }: Props) {

 const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderWidth: 1.6,
    borderColor: mode,
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
    justifyContent: "space-between",
  },
  stat: {
    flexDirection: "column",
    marginRight: 20,
  },
});


  var stats = [
    {
      title: "CREATED",
      value: moment(model.created).format("Do MMM YY"),
      color: colors.white,
    },
    { title: "SEEN", value: model.seen.length, color: colors.white },
    { title: "POS", value: model.positives.length, color: colors.green },
    { title: "NEG", value: model.negatives.length, color: colors.red },
    {
      title: "FILTERS",
      value:
        model.filter.activities.length +
        model.filter.days.length +
        model.filter.locations.length +
        model.filter.years.length,
      color: colors.white,
    },
  ];

  const renderMode = () => {
    switch (model.mode) {
      case "standard":
        return "PROJECTION";
      case "projection":
        return "PROJECTION";
      case "speed":
        return "SPEED";
      default:
        return "STANDARD";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress as any}
      style={[styles.container, style as any]}
      activeOpacity={0.75}
    >
      <View style={styles.top}>
        <Text.ButtonSecondary>{model.name.toUpperCase()}</Text.ButtonSecondary>
        <Text.Small style={{ opacity: 0.3 }}>{renderMode()} MODE</Text.Small>
      </View>
      <View style={styles.bottom}>
        <View style={{ flexDirection: "row" }}>
          {stats.map((item, index) => {
            return (
              <View key={index} style={styles.stat}>
                <Text.Small style={{ opacity: 0.3, fontSize: 11.5 }}>
                  {item.title}
                </Text.Small>
                <Text.Header style={{ color: item.color, fontSize: 16 }}>
                  {item.value}
                </Text.Header>
              </View>
            );
          })}
        </View>
        <Icon type="delete" onPress={onDelete as any} />
      </View>
    </TouchableOpacity>
    );
}


