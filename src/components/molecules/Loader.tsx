import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { colors } from "../../utils/theme";
import * as Text from "../atoms/Text";

interface Props {
  loadingTitle?: string;
}

export default function Loader({ loadingTitle }: Props) {
  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={200}>
      <ActivityIndicator size="large" color="#fff" />
      <View style={{ marginTop: 10 }}>
        <Text.Button>{loadingTitle ? loadingTitle : "Loading.."}</Text.Button>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 99,
    bottom: 0,
    backgroundColor: colors.loader_bg,
    justifyContent: "center",
    alignItems: "center",
  },
});
