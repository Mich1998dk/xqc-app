import React from "react";
import { Image, StyleSheet } from "react-native";

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
