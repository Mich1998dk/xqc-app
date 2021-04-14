import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { RouteProp } from "@react-navigation/native";
import { Header, IconButton } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  getImageInfo,
  initModelAsync,
  randomSetAsync,
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import {
  setImageForProjection,
  setSeen,
  setSelectedFilter,
} from "../../redux/actions";
import { makeProjection } from "../../redux/reducers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { ButtonBar } from "../../components/organisms";

type HomeProps = StackNavigationProp<HomeStackParamList, "ProjectionMode">;
type RouteProps = RouteProp<HomeStackParamList, "ProjectionMode">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};

export default function ProjectionMode({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const { loadModel } = route.params;

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
        onPress={() => {
          dispatch(setSeen([]));
          dispatch(setSelectedFilter({ activities: [], locations: [] }));
          navigation.goBack();
        }}
        title="PROJECTION MODE"
        menu
        search
        filter
        onPressFilter={() => navigation.navigate("Filter")}
      />

      {redux.images.length > 0 && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={redux.images}
          numColumns={calculateColumnAmount()}
          style={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  //await dispatch(getImageInfo(item.exqId));
                  await dispatch(makeProjection(item));
                  await dispatch(setImageForProjection(item));
                  navigation.navigate("Projection", { uri: item.imageURI! });
                }}
                style={styles.box}
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
              </TouchableOpacity>
            );
          }}
        />
      )}
      <ButtonBar navigation={navigation} posAndNeg randomSet />
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
});
