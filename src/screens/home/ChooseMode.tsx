import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Header, ModeOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";

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
          onPress={() => navigation.navigate("Home")}
        />
        <Text.Regular style={{ paddingHorizontal: 6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text.Regular>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
