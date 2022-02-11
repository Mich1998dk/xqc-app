import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/theme";
import { Text } from "../atoms/index";
export default function Button({ title, onPress, secondary, style }) {
    return (<TouchableOpacity onPress={onPress} style={[
            styles.container,
            style,
            secondary
                ? {
                    backgroundColor: colors.background,
                    borderWidth: 1.6,
                    borderColor: colors.accent,
                }
                : {},
        ]} activeOpacity={0.75}>
      {secondary ? (<Text.ButtonSecondary>{title}</Text.ButtonSecondary>) : (<Text.Button>{title}</Text.Button>)}
    </TouchableOpacity>);
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.accent,
        width: 340,
        height: 52,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});
