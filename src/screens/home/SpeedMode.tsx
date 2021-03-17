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
  repImage,
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

export default function SpeedMode({ navigation }: Props) {
  const [state, setState] = useState({
    loading: true,
    loadingTitle: "Initiating the model..",
    mediaInfo: null
  });
  const [selected, setSelected] = useState<Obj[]>([]);

  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(initModelAsync());
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <Container loading={redux.loading} loadingTitle={state.loadingTitle}>
      <Header title="SPEED MODE" onPress={() => navigation.goBack()} />
      {redux.images.length > 0 && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={redux.images}
          numColumns={4}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.box,
                  selected.includes(item)
                    ? { backgroundColor: colors.gray }
                    : {},
                ]}
              >
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
                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item));
                    dispatch(repImage(redux.images.indexOf(item)));
                    //replace with first element from call to learn endpoint
                  }}
                  onPressPositive={() => {
                    console.log(redux.images);
                    console.log(redux.positives);
                    console.log(redux.negatives);
                    console.log(redux.seen);
                    dispatch(positiveExamplePressed(item));
                    dispatch(repImage(redux.images.indexOf(item)));
                    console.log("billeder efter replace:" + JSON.stringify(redux.images))
                    //replace with first element from call to learn endpoint

                  }}
                  negativeSelected={redux.negatives.includes(item)}
                  positiveSelected={redux.positives.includes(item)}
                />
              </View>
            );
          }}
        />
      )}


      <View style={styles.buttons}>
      <IconButton
          title="NEW RANDOM SET"
          onPress={() => dispatch(randomSetAsync())}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
        <IconButton
          title="UPDATE ALL"
          type="update"
          onPress={() => dispatch(learnModelAsync("Standard"))}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "24%",
    backgroundColor: "#393939",
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
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
