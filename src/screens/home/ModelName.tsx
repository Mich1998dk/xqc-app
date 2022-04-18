import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header } from "../../components/molecules/index";
import { Container } from "../../containers/index";
import { setName } from "../../redux/actions";
import { } from "../../redux/reducers";
import { customAlert } from "../../utils/helpers";
import { checkName, saveModelInAsyncStorage } from "../../utils/storage";
import { colors, fonts } from "../../utils/theme";
import { HomeStackParamList, Model, State } from "../../utils/types";

type ModelNameProps = StackNavigationProp<HomeStackParamList, "ModelName">;
type RouteProps = RouteProp<HomeStackParamList, "ModelName">;

type Props = {
  navigation: ModelNameProps;
  route: RouteProps;
};

export default function ChooseMode({ navigation, route }: Props) {
  const [state, setState] = useState({ loading: false, name: "" });
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const { tabIndex } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const webStyles = {
    outlineWidth: 0,
  };

  const save = async () => {
    if (state.name.length === 0) {
      customAlert("error", "Your must have a name!");
      return;
    }
    if (await checkName(state.name)) {
        if (!confirm("This name already exist, do you want to override the existing model?")) {
            setState({ ...state, name: "" });
            return;
        }
    }

    const model: Model = {
      mode: redux.states[tabIndex].mode,
      name: state.name,
      negatives: redux.states[tabIndex].negatives,
      positives: redux.states[tabIndex].positives,
      seen: redux.states[tabIndex].seen,
      lastSeen: redux.states[tabIndex].images,
      filter: redux.states[tabIndex].selectedFilter,
      created: new Date(),
    };

    console.log("MODEL");
    console.log(model);

    await saveModelInAsyncStorage(model);
    dispatch(setName(model.name,tabIndex))
    customAlert("success", "Your model has been saved!");
    navigation.goBack();
  };

  return (
    <Container>
      <Header
        title="Enter a name for your model"
        onPress={() => navigation.goBack()}
      />
      <View style={{ marginVertical: 30 }}>
        <TextInput
          autoFocus
          value={state.name}
          onChangeText={(e) => setState({ ...state, name: e })}
          placeholder="Name"
          style={[
            styles.input,
            Platform.OS === "web" ? (webStyles as any) : ({} as any),
          ]}
        ></TextInput>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button title="SAVE" onPress={() => save()} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.med,
    textAlign: "center",
  },
});
