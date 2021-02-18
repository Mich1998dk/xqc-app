import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { useSelector, useDispatch } from "react-redux";
import { Container, Header } from "../../containers/index";
import {} from "../../redux/reducers";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({ loading: false });
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <>
        <Header title="XQC" />
      </>
    </Container>
  );
}

const styles = StyleSheet.create({});
