import React, { useEffect } from "react";
import { StyleSheet, View, Image, FlatList, TouchableOpacity, Platform, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { negativeExamplePressed, positiveExamplePressed, replaceImageAsync, makeProjection, getImageInfo, submitImage, } from "../../redux/reducers";
import { ImageOverlay, SubmitOverlay } from "../molecules";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { setImageForProjection } from "../../redux/actions";
export default function ImageRenderer({ data, navigation, time }) {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    console.log("Length");
    console.log(data.length);
    useEffect(() => {
        if (Platform.OS !== "web") {
            //LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        }
    }, []);
    return (<View style={styles.container}>
      {redux.mode === "standard" && (<FlatList columnWrapperStyle={{ justifyContent: "space-between" }} data={data} style={{ paddingBottom: 80 }} numColumns={calculateColumnAmount()} keyExtractor={(item) => item.exqId.toString()} renderItem={({ item, index }) => {
                return (<TouchableOpacity style={styles.box} onPress={async () => {
                        dispatch(getImageInfo(item.exqId));
                        await dispatch(makeProjection(item));
                        await dispatch(setImageForProjection(item));
                        navigation.navigate("Projection", { uri: item.imageURI });
                    }}>
                {/* //@ts-ignore */}
                <Image style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "stretch",
                        borderRadius: 12,
                    }} source={{
                        uri: item.imageURI,
                    }}/>
                <SubmitOverlay onPressSubmit={() => dispatch(submitImage(item.exqId))} thumbnail={item.thumbnail}/>

                <ImageOverlay onPressNegative={() => {
                        dispatch(negativeExamplePressed(item));
                    }} onPressPositive={() => {
                        dispatch(positiveExamplePressed(item));
                    }} negativeSelected={redux.negatives.includes(item)} positiveSelected={redux.positives.includes(item)}/>
              </TouchableOpacity>);
            }}/>)}
      {redux.mode === "speed" && (<FlatList columnWrapperStyle={{ justifyContent: "space-between" }} data={data || redux.images} style={{ paddingBottom: 80 }} numColumns={calculateColumnAmount()} keyExtractor={(item) => item.exqId.toString()} renderItem={({ item }) => {
                return (<View style={[styles.box]}>
                <SubmitOverlay />
                {/* //@ts-ignore */}
                <Image style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "stretch",
                        borderRadius: 12,
                    }} source={{
                        uri: item.imageURI,
                    }}/>
                <SubmitOverlay onPressSubmit={() => {
                        if (Platform.OS === "web") {
                            //customAlert("success", "Image: " + item.thumbnail);
                            console.log("SUBMITTING IMAGE: " + item.thumbnail);
                            dispatch(submitImage(item.exqId));
                        }
                        else {
                            //alert("Image: " + item.thumbnail);
                            console.log("SUBMITTING IMAGE: " + item.thumbnail);
                            dispatch(submitImage(item.exqId));
                        }
                    }}/>

                <ImageOverlay onPressNegative={() => {
                        dispatch(negativeExamplePressed(item));
                        dispatch(replaceImageAsync(redux.images.indexOf(item)));
                    }} onPressPositive={() => {
                        dispatch(positiveExamplePressed(item));
                        dispatch(replaceImageAsync(redux.images.indexOf(item)));
                    }} negativeSelected={redux.negatives.includes(item)} positiveSelected={redux.positives.includes(item)}/>
              </View>);
            }}/>)}
    </View>);
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
