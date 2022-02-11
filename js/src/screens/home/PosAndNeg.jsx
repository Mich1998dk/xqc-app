import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Header, IconButton, RMOverlay, SubmitOverlay, } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { removeNegative, removePositive } from "../../redux/actions";
import { ImageRenderer } from "../../components/organisms";
import { customAlert } from "../../utils/helpers";
export default function PosAndNeg({ navigation }) {
    const [state, setState] = useState({ loading: false, selected: "positive" });
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container>
      <Header title="Labeled images" onPress={() => navigation.goBack()}/>
      <View style={styles.buttonContainer}>
        <IconButton title="NEGATIVE" onPress={() => setState({ ...state, selected: "negative" })} secondary={state.selected !== "negative"} style={{ marginRight: 10 }}/>
        <IconButton title="POSITIVE" onPress={() => setState({ ...state, selected: "positive" })} secondary={state.selected !== "positive"} style={{ marginRight: 10 }}/>
        <IconButton title="HISTORY" onPress={() => setState({ ...state, selected: "history" })} secondary={state.selected !== "history"}/>
      </View>
      {state.selected !== "history" && (<FlatList columnWrapperStyle={{ justifyContent: "space-between" }} data={state.selected === "negative" ? redux.negatives : redux.positives} numColumns={calculateColumnAmount()} style={{ paddingBottom: 80 }} keyExtractor={(item) => item.exqId.toString()} renderItem={({ item, index }) => {
                return (<View style={styles.box}>
                {/* //@ts-ignore */}
                <Image style={{
                        width: "100%",
                        height: 180,
                        resizeMode: "stretch",
                        borderRadius: 12,
                    }} source={{
                        uri: item.imageURI,
                    }}/>
                <SubmitOverlay onPressSubmit={() => customAlert("success", item.thumbnail)}/>
                <RMOverlay onClick={() => {
                        if (state.selected === "negative") {
                            dispatch(removeNegative(item));
                        }
                        if (state.selected === "positive") {
                            dispatch(removePositive(item));
                        }
                    }}/>
              </View>);
            }}/>)}

      {state.selected === "history" && (<ImageRenderer navigation={navigation} data={redux.seen}/>)}
    </Container>);
}
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "center",
        paddingBottom: 12,
    },
    box: {
        width: calculateImageWidth(),
        backgroundColor: "#393939",
        height: 180,
        marginTop: 10,
        borderRadius: 12,
    },
});
