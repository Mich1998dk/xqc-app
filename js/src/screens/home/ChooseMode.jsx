import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "../../components/atoms/index";
import { Header, ModeOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { setMode } from "../../redux/actions";
export default function ChooseMode({ navigation }) {
    const [state, setState] = useState({ loading: false });
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);
    return (<Container>
      <Header title="Choose mode" onPress={() => navigation.goBack()}/>
      <ScrollView style={{ paddingTop: 10 }}>
        <ModeOption title="PROJECTION MODE (BROWSE ORIENTED)" onPress={() => {
            dispatch(setMode("standard"));
            navigation.navigate("Home", { loadModel: undefined });
        }}/>
        <Text.Regular style={{ paddingHorizontal: 6, marginBottom: 30 }}>
        Projection mode is the ideal mode for building an interactive classifier that captures your information needs. 
        This mode aims to add transparency to the classifier building process, 
        and lets the user see the consequences of each labelling through the “Projection” UI. 
        Simply press a picture to see how your labelling affects the classifier. 
        </Text.Regular>
        <ModeOption title="SPEED MODE (SEARCH ORIENTED)" onPress={() => {
            dispatch(setMode("speed"));
            navigation.navigate("SpeedMode", { loadModel: undefined });
        }}/>
        <Text.Regular style={{ paddingHorizontal: 6, marginBottom: 30 }}>
        Speed mode is the mode for finding specific target image(s) as rapidly as possible. 
        This mode focuses less on transparency and more on speed and competitiveness, 
        which is why this mode is ideal for competitions. 
        Utilize the search and filter functionalities to quickly target 
        relevant pictures and find the desired picture before everyone else. 
        </Text.Regular>
        {/* <ModeOption
          title="PROJECTION MODE"
          onPress={() => {
            dispatch(setMode("projection"));
            navigation.navigate("ProjectionMode", { loadModel: undefined });
          }}
        />
        <Text.Regular style={{ paddingHorizontal: 6, marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text.Regular> */}
      </ScrollView>
    </Container>);
}
const styles = StyleSheet.create({});
