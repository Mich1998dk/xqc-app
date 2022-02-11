import React, { useEffect } from "react";
import { StyleSheet, } from "react-native";
import { Header } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { ImageRenderer } from "../../components/organisms/index";
export default function History({ navigation }) {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container>
      <Header title={"History"} onPress={() => {
            navigation.goBack();
        }}/>
      {redux.images.length > 0 && (<ImageRenderer navigation={navigation} data={redux.seen}/>)}
    </Container>);
}
const styles = StyleSheet.create({});
