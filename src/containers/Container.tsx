import React, { CSSProperties } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Loader } from "../components/molecules/index";
import { colors, sizes, fonts } from "../utils/theme";
import i18n from "i18n-js";
import { StatusBar } from "expo-status-bar";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  isKeyBoardAvoiding?: boolean;
  style?: CSSProperties;
  loadingTitle?: string;
}

export default function Container({
  children,
  loading,
  isKeyBoardAvoiding,
  style,
  loadingTitle,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {isKeyBoardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={[styles.content, style as any]}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.content, style as any]}>{children}</View>
      )}

      {loading && <Loader loadingTitle={loadingTitle} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: "column",
    maxWidth: 1000,
    width: "96%",
  },
});
