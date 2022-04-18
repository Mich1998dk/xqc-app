import { StackNavigationProp } from "@react-navigation/stack";
import React, { CSSProperties, useEffect } from "react";
import {
    FlatList, Image, Platform, StyleSheet, TouchableOpacity, View
} from "react-native";
import { AnyIfEmpty, useDispatch, useSelector } from "react-redux";
import { setImageForProjection } from "../../redux/actions";
import {
    getImageInfo, makeProjection, negativeExamplePressed,
    positiveExamplePressed,
    replaceImageAsync, submitImage
} from "../../redux/reducers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { HomeStackParamList, State } from "../../utils/types";
import { ImageOverlay, SubmitOverlay } from "../molecules";
type HomeProps = StackNavigationProp<HomeStackParamList>;

interface Props {
  data: any;
  navigation: HomeProps;
  style?: CSSProperties;
  numberOfImages?: number;
  tabIndex: number;
}

/** ImageRendere creates a view containing a flatlist of all the data you supply it with.
 * 
 * @param data Is the data you want to be rendered and displayed in thew view, this is of type @type {any}
 * @param navigation Is used to be able to navigate to projection of image, when in projection mode, this is of type @type {HomeProps}
 * @param style is an optional paramter, it is used to override the style of the view/touchable opacity, that the data resides inside, this is of type @type {CSSProperties}
 * @param numberOfImages is an optional paramter, it is used to override how many boxes of data you want per row before going to next row, 
 * if not set this is decided by the size of the window, this is of type @type {number}
 * @param tabIndex is the index of the tab/panel that the ImageRenderer is associated with, this is of type @type {number}
 */

export default function ImageRenderer({ data, navigation, style, numberOfImages, tabIndex }: Props) {
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
          numColumns={numberOfCollumns}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[styles.box, style as any]}
                onPress={async () => {
                  dispatch(getImageInfo(item.exqId,tabIndex));
                  await dispatch(makeProjection(item,tabIndex));
                    await dispatch(setImageForProjection(item, tabIndex));
                    navigation.navigate("Projection", { tabIndex });
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
          columnWrapperStyle={{ justifyContent: "center" }}
          data={data}
          numColumns={numberOfCollumns}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item }) => {
            return (
              <View style={[styles.box, style as any]}>
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
                      dispatch(submitImage(item.exqId,tabIndex));
                    } else {
                      //alert("Image: " + item.thumbnail);
                      console.log("SUBMITTING IMAGE: " + item.thumbnail);
                      dispatch(submitImage(item.exqId,tabIndex));
                    }
                  }}
                />

                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item,tabIndex));
                    dispatch(replaceImageAsync(redux.states[tabIndex].images.indexOf(item),tabIndex));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item,tabIndex));
                    dispatch(replaceImageAsync(redux.states[tabIndex].images.indexOf(item),tabIndex));
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
