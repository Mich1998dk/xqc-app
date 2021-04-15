import React, { CSSProperties } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Loader } from "../components/molecules/index";
import { Menu, Search } from "../components/organisms/index";
import { colors } from "../utils/theme";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { Model, State } from "../utils/types";
import { resetModelAsync } from "../redux/reducers";
import { setMenu } from "../redux/actions";
import { saveModelInAsyncStorage } from "../utils/storage";
import { customAlert } from "../utils/helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../utils/types";

type HomeProps = StackNavigationProp<HomeStackParamList>;

interface Props {
  children: React.ReactNode;
  isKeyBoardAvoiding?: boolean;
  style?: CSSProperties;
  model?: Model;
  navigation?: HomeProps;
}

export default function Container({
  children,
  isKeyBoardAvoiding,
  style,
  model,
  navigation,
}: Props) {
  const redux = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const quickSaveModel = async () => {
    const tempModel: Model = {
      mode: "standard",
      name: model?.name!,
      negatives: redux.negatives,
      positives: redux.positives,
      seen: redux.seen,
      lastSeen: redux.images,
      created: new Date(model?.created!),
      filter: redux.tempFilter,
    };

    await saveModelInAsyncStorage(tempModel);
    customAlert("success", "Your model has been saved!");
    dispatch(setMenu(false));
  };

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

      {redux.loading && <Loader loadingTitle="Please wait.." />}
      {redux.search && <Search />}
      {redux.menu && (
        <Menu
          onClickHelp={() => {
            dispatch(setMenu(false));
            navigation?.navigate("Info");
          }}
          onClickReset={() => {
            dispatch(resetModelAsync());
            dispatch(setMenu(false));
          }}
          onClickSaveModel={() => {
            dispatch(setMenu(false));
            navigation!.navigate("ModelName", { mode: redux.mode });
          }}
          canQuickSave={model !== undefined}
          onClickQuickSave={() => {
            quickSaveModel();
          }}
        />
      )}
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
