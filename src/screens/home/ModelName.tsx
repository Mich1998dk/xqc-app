import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, Model, State } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Header, Button } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { colors, fonts } from "../../utils/theme";
import { saveModelInAsyncStorage } from "../../utils/storage";

type ModelNameProps = StackNavigationProp<HomeStackParamList, "ModelName">;

type Props = {
  navigation: ModelNameProps;
};

export default function ChooseMode({ navigation }: Props) {
  const [state, setState] = useState({ loading: false, name: "" });
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const webStyles = {
    outlineWidth: 0,
  };

  const save = async () => {
    if (state.name.length === 0) {
      alert("hov du");
    }
    const model: Model = {
      mode: "STANDARD",
      name: state.name,
      negatives: redux.negatives,
      positives: redux.positives,
      seen: redux.seen,
    };

    await saveModelInAsyncStorage(model);
    alert("Done!");
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
