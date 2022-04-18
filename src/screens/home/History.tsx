import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/molecules/index";
import { ImageRenderer } from "../../components/organisms/index";
import { Container } from "../../containers/index";
import { HomeStackParamList, State } from "../../utils/types";

type HistoryProps = StackNavigationProp<HomeStackParamList, "History">;
type RouteProps = RouteProp<HomeStackParamList, "History">;

type Props = {
  navigation: HistoryProps;
  route: RouteProps;
};

export default function History({ navigation }: Props) {
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header
        title={"History"}
        onPress={() => {
          navigation.goBack();
        }}
      />
          {redux.states[0].images.length > 0 && (
            <ImageRenderer navigation={navigation as any} data={redux.states[0].seen} />
          )}
    </Container>
  );
}
