import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";
import { ModeOption } from "../molecules/index";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setMenu } from "../../redux/actions";
import { Model } from "../../utils/types";

interface Props {
  onClickReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSaveModel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickQuickSave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickHelp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onExit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  canQuickSave?: boolean;
}

export default function Menu({
  onClickReset,
  onClickSaveModel,
  onClickQuickSave,
  canQuickSave,
  onClickHelp,
  onExit,
}: Props) {
  const dispatch = useDispatch();

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <Animatable.View animation="zoomIn" duration={240}>
        <View style={{ marginBottom: 20 }}>
          <ModeOption
            style={{ width: 300 }}
            title="HELP"
            onPress={onClickHelp as any}
          />
          <ModeOption
            style={{ width: 300 }}
            title="RESET MODEL"
            onPress={onClickReset as any}
          />
          <ModeOption
            style={{ width: 300 }}
            title="SAVE MODEL AS"
            onPress={onClickSaveModel as any}
          />
          {canQuickSave && (
            <ModeOption
              style={{ width: 300 }}
              title="QUICK SAVE"
              onPress={onClickQuickSave as any}
            />
          )}

          <ModeOption
            style={{ width: 300 }}
            title="EXIT"
            onPress={onExit as any}
          />
        </View>

        <TouchableOpacity
          onPress={() => dispatch(setMenu(false))}
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
});
