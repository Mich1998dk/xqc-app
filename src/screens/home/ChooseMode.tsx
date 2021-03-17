import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Header, ModeOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { setMode } from "../../redux/actions";

type WelcomeProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: WelcomeProps;
};

export default function ChooseMode({ navigation }: Props) {
  const [state, setState] = useState({ loading: false });
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header title="Choose mode" onPress={() => navigation.goBack()} />
      <ScrollView style={{ paddingTop: 10 }}>
        <ModeOption
          title="STANDARD MODE"
          onPress={() => {
            dispatch(setMode("standard"));
            navigation.navigate("Home", { loadModel: undefined });
          }}
        />
        {/* <Text.Regular style={{ paddingHorizontal: 6, marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text.Regular> */}
        <ModeOption
          title="SPEED MODE"
          onPress={() => {
            dispatch(setMode("speed"));
            navigation.navigate("SpeedMode");
          }}
        />
        <ModeOption
          title="PROJECTION MODE"
          onPress={() => {
            dispatch(setMode("projection"));
            navigation.navigate("ProjectionMode");
          }}
        />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
