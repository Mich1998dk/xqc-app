import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";
import { ModeOption } from "../molecules/index";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/actions";

interface Props {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const webStyles = {
  outlineWidth: 0,
};

export default function Menu({ onClose }: Props) {
  const dispatch = useDispatch();
  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <Animatable.View animation="zoomIn" duration={240}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={18} color={colors.white} />

          <TextInput
            style={[
              styles.input,
              Platform.OS === "web" ? webStyles : ({} as any),
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => dispatch(setSearch(false))}
          style={{ alignSelf: "center", alignItems: "center" }}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle-sharp" size={36} color={colors.white} />
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
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.box,
    borderRadius: sizes.base16,
    alignItems: "center",
    paddingLeft: 20,
  },
  input: {
    padding: 20,
    color: colors.white,
    fontSize: sizes.base20,
    fontFamily: fonts.med,
    width: 400,
  },
});
