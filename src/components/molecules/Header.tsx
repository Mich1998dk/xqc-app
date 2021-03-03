import React, { CSSProperties } from "react";
import { StyleSheet, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text, Icon } from "../atoms/index";

interface Props {
  title?: string;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  menu?: boolean;
  onMenuPressed?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ModeOption({
  title,
  onPress,
  style,
  menu,
  onMenuPressed,
}: Props) {
  return (
    <View style={[styles.container, style as any]}>
      <View style={{ zIndex: 2 }}>
        <Icon type="back" onPress={onPress!} />
      </View>
      <View style={styles.title}>
        <Text.Header>{title}</Text.Header>
      </View>
      {menu && <Icon onPress={onMenuPressed as any} type="menu" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: "100%",
    alignSelf: "center",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
});
