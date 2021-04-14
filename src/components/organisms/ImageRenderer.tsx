import React from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
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
} from "../../redux/reducers";
import { State } from "../../utils/types";
import { IconButton, ImageOverlay } from "../molecules";
import { colors } from "../../utils/theme";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";

interface Props {
  data: any;
}

export default function ImageRenderer({ data }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  return (
    <View style={styles.container}>
      {redux.mode === "standard" && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={data}
          style={{ paddingBottom: 80 }}
          numColumns={calculateColumnAmount()}
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
                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item));
                  }}
                  negativeSelected={redux.negatives.includes(item)}
                  positiveSelected={redux.positives.includes(item)}
                />
              </View>
            );
          }}
        />
      )}
      {redux.mode === "speed" && (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
