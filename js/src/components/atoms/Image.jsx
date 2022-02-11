import React from "react";
import { StyleSheet, Image } from "react-native";
export default function ModeOption({ src }) {
    return <Image style={styles.container} source={src}/>;
}
const styles = StyleSheet.create({
    container: {
        width: "48%",
    },
});
