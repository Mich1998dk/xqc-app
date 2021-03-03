import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";
import { ModeOption } from "../molecules/index";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Menu({ onClose }: Props) {
  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <Animatable.View animation="zoomIn" duration={240}>
        <View style={{ marginBottom: 20 }}>
          <ModeOption
            style={{ width: 300 }}
            title="OPTION 1"
            onPress={() => console.log("option 1")}
          />
          <ModeOption
            style={{ width: 300 }}
            title="OPTION 2"
            onPress={() => console.log("option 2")}
          />
        </View>

        <TouchableOpacity
          onPress={onClose as any}
          style={{ alignSelf: "center", alignItems: "center" }}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle-sharp" size={36} color={colors.white} />
          {/* <Text.Button>Close</Text.Button> */}
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,

    backgroundColor: colors.loader_bg,
    justifyContent: "center",
    alignItems: "center",
  },
});
