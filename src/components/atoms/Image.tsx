import React, { CSSProperties } from "react";
import { StyleSheet, View, Image } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text, Icon } from "../atoms/index";

interface Props {
  src?: string;
}

export default function ModeOption({ src }: Props) {
  return <Image style={styles.container} source={src as any} />;
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
  },
});
