import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Alert,
  Platform,
  ScrollView,
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
  reset,
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import {
  formatTime,
  formatDate,
  isUpperCase,
  formatToLocation,
} from "../../utils/helpers";
import {
  ButtonBar,
  ImageRenderer,
  Menu,
} from "../../components/organisms/index";
import { Obj } from "../../utils/types";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { RouteProp } from "@react-navigation/native";
import { setSearchData, setSeen, setSelectedFilter } from "../../redux/actions";

type HomeProps = StackNavigationProp<HomeStackParamList, "SpeedMode">;
type RouteProps = RouteProp<HomeStackParamList, "SpeedMode">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};

export default function SpeedMode({ navigation, route }: Props) {
  const { loadModel } = route.params;
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    if (loadModel === undefined) {
      dispatch(initModelAsync());
    }

    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!redux.loading) {
      var _s = 0;
      var _m = 0;

      const interval = setInterval(() => {
        if (seconds !== 60) {
          setSeconds((sec) => sec + 1);
          _s++;
        }
        if (_s == 60) {
          setSeconds(0);
          _s = 0;
          setMin((min) => min + 1);
          _m++;
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [redux.loading]);

  return (
    <Container navigation={navigation} model={loadModel}>
      <Header
        title="SPEED"
        onPress={() => {
          dispatch(reset());
          navigation.goBack();
        }}
        filter
        onPressFilter={() => navigation.navigate("Filter")}
        search
        onPressSearch={() => {
          dispatch(setSearchData(redux.terms));
          navigation.navigate("Search", { mode: "terms" });
        }}
        menu
        time
      />
      {redux.timerStatus && (
        <Text.Button style={{ alignSelf: "center" }}>
          {formatTime(min) + ":" + formatTime(seconds)}
        </Text.Button>
      )}
      {redux.images.length === 0 && !redux.loading && (
        <Text.Regular style={{ alignSelf: "center" }}>
          No results - maybe your filter is too strict
        </Text.Regular>
      )}
      <ScrollView>
        {redux.images.length > 0 && (
          <ImageRenderer navigation={navigation} data={redux.images} />
        )}
      </ScrollView>

      <ButtonBar navigation={navigation} randomSet update />
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
