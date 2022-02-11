import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/theme";
import { Text } from "../atoms/index";
import { MaterialIcons } from "@expo/vector-icons";
export default function ModeOption({ title, onPress, style }) {
    return (<TouchableOpacity onPress={onPress} style={[styles.container, style]} activeOpacity={0.75}>
      <Text.ButtonSecondary>{title}</Text.ButtonSecondary>
      <MaterialIcons name="keyboard-arrow-right" size={20} color={colors.accent}/>
    </TouchableOpacity>);
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderWidth: 1.6,
        borderColor: colors.accent,
        width: "100%",
        height: 56,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        marginBottom: 5,
        marginTop: 10,
    },
});
