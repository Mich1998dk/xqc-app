import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import {
  Header,
  ModeOption,
  IconButton,
} from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { FlatList } from "react-native-gesture-handler";

type PosAndNegProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: PosAndNegProps;
};

export default function PosAndNeg({ navigation }: Props) {
  const [state, setState] = useState({ loading: false, selected: "negative" });
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header title="Pos and neg" onPress={() => navigation.goBack()} />
      <View style={styles.buttonContainer}>
        <IconButton
          title="NEGATIVE"
          onPress={() => setState({ ...state, selected: "negative" })}
          secondary={state.selected === "positive"}
          style={{ marginRight: 10 }}
        />
        <IconButton
          title="POSITIVE"
          onPress={() => setState({ ...state, selected: "positive" })}
          secondary={state.selected === "negative"}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
