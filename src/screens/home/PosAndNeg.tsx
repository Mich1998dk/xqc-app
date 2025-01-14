import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    Header, IconButton,
    RMOverlay,
    SubmitOverlay
} from "../../components/molecules/index";
import { ImageRenderer } from "../../components/organisms";
import { Container } from "../../containers/index";
import { removeNegative, removePositive } from "../../redux/actions";
import { } from "../../redux/reducers";
import { customAlert } from "../../utils/helpers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { HomeStackParamList, State } from "../../utils/types";

type PosAndNegProps = StackNavigationProp<HomeStackParamList, "Welcome">;

type Props = {
  navigation: PosAndNegProps;
  route: RouteProp<HomeStackParamList, "PosAndNeg">;
};


export default function PosAndNeg({ navigation,route }: Props) {
  const [state, setState] = useState({ loading: false, selected: "positive" });
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const { tabIndex } = route.params;
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
          secondary={state.selected !== "negative"}
          style={{ marginRight: 10 }}
        />
        <IconButton
          title="POSITIVE"
          onPress={() => setState({ ...state, selected: "positive" })}
          secondary={state.selected !== "positive"}
          style={{ marginRight: 10 }}
        />
        <IconButton
          title="HISTORY"
          onPress={() => setState({ ...state, selected: "history" })}
          secondary={state.selected !== "history"}
        />
      </View>
      {state.selected !== "history" && (
        <FlatList 
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          data={
            state.selected === "negative" ? redux.states[tabIndex].negatives : redux.states[tabIndex].positives
          }
          numColumns={calculateColumnAmount()}
          style={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item}) => {
            return (
              <View style={styles.box}>
                {/* //@ts-ignore */}
                <Image
                  style={{
                    width: "100%",
                    height: 180,
                    resizeMode: "stretch",
                    borderRadius: 12,
                  }}
                  source={{
                    uri: item.imageURI,
                  }}
                />
                <SubmitOverlay
                  onPressSubmit={() => customAlert("success", item.thumbnail)}
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
      )}

      {state.selected === "history" && (
        <ScrollView showsHorizontalScrollIndicator={false}>
                  <ImageRenderer navigation={navigation as any} tabIndex={tabIndex} data={redux.states[tabIndex].seen} />
        </ScrollView>
      )}
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
    margin: "0.5%",
    borderRadius: 12,
  },
});
