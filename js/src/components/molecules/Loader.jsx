import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { colors } from "../../utils/theme";
import * as Text from "../atoms/Text";
export default function Loader({ loadingTitle }) {
    return (<Animatable.View style={styles.container} animation="fadeIn" duration={200}>
      <ActivityIndicator size="large" color="#fff"/>
      <View style={{ marginTop: 10 }}>
        <Text.Button>{loadingTitle ? loadingTitle : "Loading.."}</Text.Button>
      </View>
    </Animatable.View>);
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
