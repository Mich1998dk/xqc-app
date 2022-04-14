import React, { CSSProperties, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  learnModelAsync,
  learnWithProjectedImageAsync,
  applyFiltersAsync,
  randomSetAsync,
  resetModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  replaceImageAsync,
  makeProjection,
  getImageInfo,
  submitImage,
} from "../../redux/reducers";
import { HomeStackParamList, Obj, State } from "../../utils/types";
import { IconButton, ImageOverlay, SubmitOverlay } from "../molecules";
import { colors } from "../../utils/theme";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { setImageForProjection } from "../../redux/actions";
import { StackNavigationProp } from "@react-navigation/stack";
//import { LogBox } from "react-native";
import { customAlert, showSubmitPopup } from "../../utils/helpers";
import { ButtonBar } from "../../components/organisms";
type HomeProps = StackNavigationProp<HomeStackParamList>;

interface Props {
  data: any;
  navigation: HomeProps;
  tabIndex?: number;
  time?: string;
  style?: CSSProperties;
  numberOfImages?: number;
}

export default function ImageRenderer({ data, navigation, time, style, numberOfImages,tabIndex = 0 }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  console.log("Length");

  console.log(data.length);

  var numberOfCollumns : number
    if (numberOfImages != undefined) {
        if (numberOfImages > 0) {
            numberOfCollumns = numberOfImages
        } else {
            numberOfCollumns = calculateColumnAmount()
        }
    } else {
        numberOfCollumns = calculateColumnAmount()
    }

  useEffect(() => {
    if (Platform.OS !== "web") {
      //LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }
  }, []);
  return (
    <View style={styles.container}>
      {redux.states[tabIndex].mode === "projection" && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "center" }}
          data={data}
          style={{ paddingBottom: 80 }}
          numColumns={numberOfCollumns}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[styles.box, style as any]}
                onPress={async () => {
                  dispatch(getImageInfo(item.exqId,tabIndex));
                  await dispatch(makeProjection(item,tabIndex));
                  await dispatch(setImageForProjection(item,tabIndex));
                  navigation.navigate("Projection", { uri: item.imageURI! });
                }}
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
                <SubmitOverlay
                  onPressSubmit={() => dispatch(submitImage(item.exqId,tabIndex))}
                  thumbnail={item.thumbnail}
                />

                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item,tabIndex));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item,tabIndex));
                  }}
                  negativeSelected={redux.states[tabIndex].negatives.includes(item)}
                  positiveSelected={redux.states[tabIndex].positives.includes(item)}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      {redux.states[tabIndex].mode === "speed" && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          data={data}
          style={{ paddingBottom: 80 }}
          numColumns={calculateColumnAmount()}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item }) => {
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
                <SubmitOverlay
                  onPressSubmit={() => {
                    if (Platform.OS === "web") {
                      //customAlert("success", "Image: " + item.thumbnail);
                      console.log("SUBMITTING IMAGE: " + item.thumbnail);
                      dispatch(submitImage(item.exqId));
                    } else {
                      //alert("Image: " + item.thumbnail);
                      console.log("SUBMITTING IMAGE: " + item.thumbnail);
                      dispatch(submitImage(item.exqId));
                    }
                  }}
                />

                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item));
                    dispatch(replaceImageAsync(redux.states[tabIndex].images.indexOf(item)));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item));
                    dispatch(replaceImageAsync(redux.states[tabIndex].images.indexOf(item)));
                  }}
                  negativeSelected={redux.states[tabIndex].negatives.includes(item)}
                  positiveSelected={redux.states[tabIndex].positives.includes(item)}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  box: {
    width: calculateImageWidth(),
    backgroundColor: "#393939",
    margin: "0.5%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
});
