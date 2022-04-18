import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Text } from "../../components/atoms/index";
import { Button } from "../../components/molecules/index";
import { Container } from "../../containers/index";
import { initExquisitorAsync } from "../../redux/reducers";
import { HomeStackParamList } from "../../utils/types";

type WelcomeProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: WelcomeProps;
};

export default function Welcome({ navigation }: Props) {
  const dispatch = useDispatch();

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
      </View>
    </Container>
  );
}
