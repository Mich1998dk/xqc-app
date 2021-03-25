import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import {
  Header,
  ModeOption,
  IconButton,
  RMOverlay,
} from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { removeNegative, removePositive } from "../../redux/actions";

type PosAndNegProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: PosAndNegProps;
};

export default function PosAndNeg({ navigation }: Props) {
  const [state, setState] = useState({ loading: false, selected: "negative" });
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header title="Labeled images" onPress={() => navigation.goBack()} />
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
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={state.selected === "negative" ? redux.negatives : redux.positives}
        numColumns={calculateColumnAmount()}
        style={{ paddingBottom: 80 }}
        keyExtractor={(item) => item.exqId.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.box}>
              {/* //@ts-ignore */}
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "stretch",
                  borderRadius: 12,
                }}
                source={{
                  uri: item.imageURI,
                }}
              />
              <RMOverlay
                onClick={() => {
                  if (state.selected === "negative") {
                    dispatch(removeNegative(item));
                  }
                  if (state.selected === "positive") {
                    dispatch(removePositive(item));
                  }
                }}
              />
            </View>
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: 12,
  },
  box: {
    width: calculateImageWidth(),
    backgroundColor: "#393939",
    height: 180,
    marginTop: 10,
    borderRadius: 12,
  },
});
