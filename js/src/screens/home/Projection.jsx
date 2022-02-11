import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Image, Platform } from "react-native";
import { Header, IconButton } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { learnWithProjectedImageAsync } from "../../redux/reducers";
import { colors } from "../../utils/theme";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { Text } from "../../components/atoms";
export default function ProjectionMode({ navigation, route }) {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const [selected, setSelected] = useState("positive");
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container>
      <Header title="PROJECTION" onPress={() => {
            navigation.goBack();
        }}/>

      <View style={styles.imgInfo}>
        <Image style={{
            alignSelf: "center",
            width: Platform.OS === "web" ? 350 : 250,
            height: Platform.OS === "web" ? 300 : 200,
            resizeMode: "stretch",
            borderRadius: 12,
        }} source={{
            uri: redux.imageForProjection?.imageURI,
        }}/>
        <View style={styles.rightInfo}>
          {redux.imageInfo?.name && (<Text.Button>Name: {redux.imageInfo?.name}</Text.Button>)}
          {redux.imageInfo?.day !== "unknown" && (<Text.Button>Location: {redux.imageInfo?.day}</Text.Button>)}
          {redux.imageInfo?.hour && (<Text.Button>Hour: {redux.imageInfo?.hour}</Text.Button>)}
          {redux.imageInfo?.year && (<Text.Button>Year: {redux.imageInfo?.year}</Text.Button>)}
          {redux.imageInfo?.location !== "unknown" && (<Text.Button>Location: {redux.imageInfo?.location}</Text.Button>)}
          {redux.imageInfo?.activity !== "unknown" && (<Text.Button>Activity: {redux.imageInfo?.activity}</Text.Button>)}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <IconButton title="NEGATIVE" onPress={() => setSelected("negative")} secondary={selected === "positive"} style={{ marginRight: 10 }}/>
        <IconButton title="POSITIVE" onPress={() => setSelected("positive")} secondary={selected === "negative"}/>
      </View>
      <FlatList columnWrapperStyle={{ justifyContent: "space-between" }} data={selected === "negative"
            ? redux.negativeProjection
            : redux.positiveProjection} style={{ paddingBottom: 80 }} numColumns={calculateColumnAmount()} keyExtractor={(item) => item.exqId.toString()} renderItem={({ item, index }) => {
            return (<View style={styles.box}>
              {/* //@ts-ignore */}
              <Image style={{
                    width: "100%",
                    height: 200,
                    resizeMode: "stretch",
                    borderRadius: 12,
                }} source={{
                    uri: item.imageURI,
                }}/>
            </View>);
        }}/>
      <View style={styles.buttons}>
        <IconButton title="CONFIRM CHOICE" onPress={async () => {
            navigation.goBack();
            dispatch(learnWithProjectedImageAsync(selected));
        }}/>
      </View>
    </Container>);
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
    imgInfo: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    rightInfo: {
        marginLeft: 20,
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 12,
    },
});
