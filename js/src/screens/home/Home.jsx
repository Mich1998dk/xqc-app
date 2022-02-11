import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Platform, } from "react-native";
import { Header } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { initModelAsync, reset, } from "../../redux/reducers";
import { ButtonBar, ImageRenderer } from "../../components/organisms/index";
import { setSearchData } from "../../redux/actions";
import { calculateImageWidth } from "../../utils/layout";
import { Text } from "../../components/atoms";
export default function Home({ navigation, route }) {
    const { loadModel } = route.params;
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    useEffect(() => {
        if (loadModel === undefined) {
            dispatch(initModelAsync());
        }
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container model={loadModel} navigation={navigation}>
      <Header title={Platform.OS === "web" ? "PROJECTION" : ""} onPress={() => {
            dispatch(reset());
            navigation.goBack();
        }} hideBack menu filter onPressFilter={() => navigation.navigate("Filter")} search onPressSearch={() => {
            dispatch(setSearchData(redux.terms));
            navigation.navigate("Search", { mode: "terms" });
        }}/>
      <ScrollView>
        {redux.images.length > 0 && (<ImageRenderer navigation={navigation} data={redux.images}/>)}
      </ScrollView>

      {redux.images.length === 0 && !redux.loading && (<Text.Regular style={{ alignSelf: "center" }}>
          No results - maybe your filter is too strict
        </Text.Regular>)}
      <ButtonBar navigation={navigation} posAndNeg randomSet train/>
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
});
