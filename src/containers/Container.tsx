import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { CSSProperties } from "react";
import {
    KeyboardAvoidingView,
    Platform, SafeAreaView, StyleSheet,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/molecules/index";
import { Menu, Search } from "../components/organisms/index";
import { setMenu } from "../redux/actions";
import { reset, resetModelAsync } from "../redux/reducers";
import { customAlert } from "../utils/helpers";
import { saveModelInAsyncStorage } from "../utils/storage";
import { colors } from "../utils/theme";
import { HomeStackParamList, Model, State } from "../utils/types";

type HomeProps = StackNavigationProp<HomeStackParamList>;

interface Props {
  children: React.ReactNode;
  isKeyBoardAvoiding?: boolean;
  style?: CSSProperties;
  model?: Model;
  navigation?: HomeProps;
  tabIndex?: number;
}

export default function Container({
  children,
  isKeyBoardAvoiding,
  style,
  model,
  navigation,
  tabIndex = 0,
}: Props) {
  const redux = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const quickSaveModel = async () => {
    const tempModel: Model = {
      mode: "projection",
      name: model?.name!,
      negatives: redux.states[tabIndex].negatives,
      positives: redux.states[tabIndex].positives,
      seen: redux.states[tabIndex].seen,
      lastSeen: redux.states[tabIndex].images,
      created: new Date(model?.created!),
      filter: redux.states[tabIndex].tempFilter,
    };

    await saveModelInAsyncStorage(tempModel);
    customAlert("success", " has been saved!");
    dispatch(setMenu(false,tabIndex));
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

      {redux.states[tabIndex].loading && <Loader loadingTitle="Please wait.." />}
      {redux.states[tabIndex].search && <Search />}
      {redux.states[tabIndex].menu && (
              <Menu tabIndex={tabIndex }
          onExit={() => {
            dispatch(setMenu(false,tabIndex));
            dispatch(reset());
            navigation?.navigate("Welcome");
          }}
          onClickHelp={() => {
            dispatch(setMenu(false,tabIndex));
            navigation?.navigate("Info");
          }}
          onClickReset={() => {
            dispatch(resetModelAsync(tabIndex));
            dispatch(setMenu(false,tabIndex));
          }}
          onClickSaveModel={() => {
            dispatch(setMenu(false,tabIndex));
            navigation!.navigate("ModelName", { mode: redux.states[tabIndex].mode,tabIndex });
          }}
          canQuickSave={model !== undefined}
          onClickQuickSave={() => {
            quickSaveModel();
          }}
          onClickLoadModel={() => {
            dispatch(setMenu(false,tabIndex));
            navigation?.navigate("LoadModal");
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
