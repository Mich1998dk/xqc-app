import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import {
  Header,
  Button,
  IconButton,
  ImageOverlay,
} from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  initModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  learnModelAsync,
  randomSetAsync,
  resetModelAsync,
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import { formatDate, isUpperCase, formatToLocation } from "../../utils/helpers";
import { Menu } from "../../components/organisms/index";
import { Obj } from "../../utils/types";

import axios from "axios";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({
    loading: true,
    loadingTitle: "Initiating the model..",
  });

  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <Container loading={redux.loading} loadingTitle={state.loadingTitle}>
      <Header title="SPEED MODE" onPress={() => navigation.goBack()} />

      <View style={styles.buttons}>
        <IconButton
          title="+/-"
          onPress={() => {
            console.log("hej");
          }}
          secondary
        />
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => console.log("hej")}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
        <IconButton
          title="TRAIN"
          onPress={() => console.log("hej")}
          type="sync"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
