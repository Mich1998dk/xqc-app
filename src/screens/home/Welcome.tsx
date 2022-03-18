import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { Text, Icon } from "../../components/atoms/index";
import { Button, ModeOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { initExquisitorAsync, reducer } from "../../redux/reducers";

type WelcomeProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: WelcomeProps;
};

export default function Welcome({ navigation }: Props) {
  const [state, setState] = useState({ loading: false });
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(initExquisitorAsync());
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={{ alignItems: "center", justifyContent: "space-around" }}>
      <Text.Title>XQC</Text.Title>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Button
          title="TRAIN NEW MODEL"
          onPress={() => navigation.navigate("ChooseMode")}
          style={{ marginBottom: 10 }}
        />
        <Button
          secondary
          title="LOAD MODEL"
          onPress={() => navigation.navigate("LoadModal")}
          style={{ marginBottom: 10 }}
        />
        <Button
          secondary
          title="COMBINE MODELS"
          onPress={() => navigation.navigate("CombineModels")}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
