import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Alert,
  Platform,
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
  replaceImageAsync,
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import { formatDate, isUpperCase, formatToLocation } from "../../utils/helpers";
import { Menu } from "../../components/organisms/index";
import { Obj } from "../../utils/types";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import moment from "moment";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function SpeedMode({ navigation }: Props) {
  const [state, setState] = useState({
    loading: true,
    loadingTitle: "Initiating the model..",
    mediaInfo: null,
  });
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  const start = () => {
    run();
    setInterval(run, 10);
  };

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    return setTime({ h: updatedH, m: updatedM, s: updatedS });
  };

  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(initModelAsync());
    start();
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <Container loading={redux.loading} loadingTitle={state.loadingTitle}>
      <Header
        title={`${time.h}:${time.m}:${time.s}`}
        onPress={() => navigation.goBack()}
        onTimePressed={() => "Start time"}
      />
      {redux.images.length > 0 && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={redux.images}
          style={{ paddingBottom: 80 }}
          numColumns={calculateColumnAmount()}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.box]}>
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
                    dispatch(replaceImageAsync(redux.images.indexOf(item)));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item));
                    dispatch(replaceImageAsync(redux.images.indexOf(item)));
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
          onPress={() => dispatch(learnModelAsync())}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: calculateImageWidth(),
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
