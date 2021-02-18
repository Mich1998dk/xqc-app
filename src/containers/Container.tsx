import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Loader } from "../components/molecules/index";
import { Header } from "../containers/index";
import { colors, sizes, fonts } from "../utils/theme";
import i18n from "i18n-js";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  isKeyBoardAvoiding?: boolean;
}

export default function Container({
  children,
  loading,
  isKeyBoardAvoiding,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {isKeyBoardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.content}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}

      {loading && <Loader />}
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
    maxWidth: 800,
    width: "100%",
  },
});
