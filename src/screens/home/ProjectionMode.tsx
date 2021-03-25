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
import { RouteProp } from "@react-navigation/native";
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
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import { customAlert } from "../../utils/helpers";
import { Menu } from "../../components/organisms/index";
import { Obj, Model } from "../../utils/types";
import { saveModelInAsyncStorage } from "../../utils/storage";
import axios from "axios";
import { setImageForProjection, setSeen } from "../../redux/actions";
import moment from "moment";
import { makeProjection } from "../../redux/reducers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";

type HomeProps = StackNavigationProp<HomeStackParamList, "ProjectionMode">;
type RouteProps = RouteProp<HomeStackParamList, "ProjectionMode">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};

export default function ProjectionMode({ navigation, route }: Props) {
  const [state, setState] = useState({
    menu: false,
  });
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

  const quickSaveModel = async () => {
    const model: Model = {
      mode: "projection",
      name: loadModel?.name!,
      negatives: redux.negatives,
      positives: redux.positives,
      seen: redux.seen,
      lastSeen: redux.images,
      created: new Date(loadModel?.created!),
    };

    await saveModelInAsyncStorage(model);
    customAlert("success", "Your model has been saved!");
  };

  return (
    <Container loading={redux.loading} loadingTitle="Loading..">
      <Header
        onPress={() => {
          dispatch(setSeen([]));
          navigation.goBack();
        }}
        title="PROJECTION MODE"
        onMenuPressed={() => setState({ ...state, menu: true })}
      />
      {state.menu && (
        <Menu
          onClickReset={() => {
            setState({ ...state, menu: false });
            dispatch(resetModelAsync());
          }}
          onClickSaveModel={() => {
            setState({ ...state, menu: false });
            navigation.navigate("ModelName", { mode: "projection" });
          }}
          canQuickSave={loadModel !== undefined}
          onClickQuickSave={() => {
            quickSaveModel();
          }}
          onClose={() => setState({ ...state, menu: false })}
        />
      )}

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

      <View style={styles.buttons}>
        <IconButton
          title="+/-"
          onPress={() => {
            navigation.navigate("PosAndNeg");
          }}
          secondary
        />
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => {
            console.log(redux);

            //dispatch(randomSetAsync())
          }}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
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
