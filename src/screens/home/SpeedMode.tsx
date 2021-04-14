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
import { ButtonBar, Menu } from "../../components/organisms/index";
import { Obj } from "../../utils/types";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { RouteProp } from "@react-navigation/native";
import { setSeen, setSelectedFilter } from "../../redux/actions";

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

  useEffect(() => {
    if (loadModel === undefined) {
      dispatch(initModelAsync());
    }

    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container navigation={navigation} model={loadModel}>
      <Header
        title="SPEED"
        onPress={() => {
          dispatch(setSeen([]));
          dispatch(setSelectedFilter({ activities: [], locations: [] }));
          navigation.goBack();
        }}
        search
        menu
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
