import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/atoms/index";
import { Button } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { initExquisitorAsync } from "../../redux/reducers";
export default function Welcome({ navigation }) {
    const [state, setState] = useState({ loading: false });
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    useEffect(() => {
        dispatch(initExquisitorAsync());
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container style={{ alignItems: "center", justifyContent: "space-around" }}>
      <Text.Title>XQC</Text.Title>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Button title="TRAIN NEW MODEL" onPress={() => navigation.navigate("ChooseMode")} style={{ marginBottom: 10 }}/>
        <Button secondary title="LOAD MODEL" onPress={() => navigation.navigate("LoadModal")}/>
      </View>
    </Container>);
}
const styles = StyleSheet.create({});
