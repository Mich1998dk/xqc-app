import React, { CSSProperties, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { RouteProp } from "@react-navigation/native";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { Header, ImageOverlay } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
    addNewModelAsync,
  initModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  reset,
} from "../../redux/reducers";
import { ButtonBar, ImageRenderer } from "../../components/organisms/index";
import { addNewModel, setSearchData, setSeen, setSelectedFilter } from "../../redux/actions";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { Text } from "../../components/atoms";
import { isMobile } from "react-device-detect";
import { colors, fonts, sizes } from "../../utils/theme";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;
type RouteProps = RouteProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};

export default function Home({ navigation, route }: Props) {
  const { loadModel } = route.params;
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [selectedTab,setSelectedTab] = useState(0)
  useEffect(() => {
    if (loadModel === undefined) {
      dispatch(initModelAsync());
    }
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

    function posNegHeaderStyle(pos: Boolean): CSSProperties {
        var temp = {
            width: "25%",
            height: "auto",
            backgroundColor: colors.accent,
            borderRadius: 12,
            fontSize: sizes.base28
        }

        if (pos) {
            temp.backgroundColor = colors.green
        } else {
            temp.backgroundColor = colors.red
        }
        return temp
    }

    var mobilestylingContainer = (!isMobile) ? {
        width: "100%", maxWidth: "100%", flexDirection: "column"
    } as CSSProperties : {};
    var mobileStyle = (!isMobile) ? {
        width: "50%"
    } as CSSProperties : { width: "100%" } as CSSProperties;
    return (
        <Container model={loadModel} navigation={navigation} tabIndex={selectedTab} style={mobilestylingContainer}>
            <Tabs onChange={(index) => setSelectedTab(index)}>
                <div style={{ display: "flex" }}>
                    {!isMobile && (<Header title={"Negative"} hideBack style={posNegHeaderStyle(false)} />)}
                <div style={mobileStyle}>
                    <Header
                        title={Platform.OS === "web" ? "PROJECTION" : ""}
                        onPress={() => {
                            dispatch(reset());
                            navigation.goBack();
                        }}
                        tabIndex={selectedTab}
                        hideBack
                        menu
                        filter
                        onPressFilter={() => navigation.navigate("Filter")}
                        search
                        onPressSearch={() => {
                            dispatch(setSearchData(redux.states[selectedTab].terms, selectedTab));
                            console.log("before navigation:" + selectedTab)
                            navigation.navigate("Search", { mode: "terms", tabIndex: selectedTab });
                        }}/>
                        <TabList>
                            {tabGenerator()}
                        </TabList>
                    </div>
                    {!isMobile && (<Header title={"Positive"} hideBack style={posNegHeaderStyle(true)} />)}
            </div>
            <TabPanels>
                    {panelGenerator()}
                </TabPanels>
                <ButtonBar navigation={navigation} tabIndex={selectedTab} posAndNeg randomSet train />
            </Tabs>
    </Container>
  );

    function addModel() {
        var index = redux.states.length
        dispatch(addNewModelAsync(index))
    }
    function tabStyle(index : number) {
       var temp = {
            backgroundColor: colors.background,
            borderWidth: 1.6,
            borderColor: colors.accent,
            fontFamily: fonts.med,
            fontSize: sizes.base20,
            color: colors.accent,
            borderRadius: 10,
            margin: 5
        } as CSSProperties

        if (index == selectedTab) {
            temp.backgroundColor = colors.accent;
            temp.color = colors.white
        }

        return temp
    }

    function tabGenerator() {
        var acc = [];
        for (var i = 0; i < redux.states.length; i++) {
            acc.push(<Tab key={"tab" + i} index={i} style={
                tabStyle(i)
            }>{redux.states[i].name}</Tab>)
        }
        acc.push(<button onClick={() => addModel()} style={tabStyle(-1)} >+</button>)
        return acc
    }

    function panelGenerator() {
        var acc = [];

        for (var i = 0; i < redux.states.length; i++)
        {
            acc.push(
                <TabPanel key={"panel" + i} style={{ width: "100%" }} index={i}>
                <div style={{ width: "100%", display: "flex" }}>
                    {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} >

                            <ScrollView style={{ height: "90vh", backgroundColor: colors.lightRed, borderRadius: 12 }} >
                            {redux.states[i].images.length > 0 && (
                                    <ImageRenderer navigation={navigation} data={redux.states[i].negatives} tabIndex={i} style={{ width: "45%" }} numberOfImages={2} />
                            )}
                        </ScrollView>
                    </div>}
                    <div style={mobileStyle}>
                        <ScrollView style={{ height: "90vh" }}>
                            {redux.states[i].images.length > 0 && (
                                <ImageRenderer navigation={navigation} data={redux.states[i].images} tabIndex={i} />
                            )}
                        </ScrollView>

                        {redux.states[i].images.length === 0 && !redux.states[i].loading && (
                            <Text.Regular style={{ alignSelf: "center" }}>
                                No results - maybe your filter is too strict
                            </Text.Regular>
                        )}
                    </div>
                    {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} title={"Positives"}>
                        <ScrollView style={{ height: "90vh", backgroundColor: colors.lightGreen, borderRadius: 12 }}>
                            {redux.states[i].images.length > 0 && (
                                    <ImageRenderer navigation={navigation} data={redux.states[i].positives} tabIndex={i} style={{ width: "45%" }} numberOfImages={2} />
                            )}
                        </ScrollView>
                    </div>}
                </div>
            </TabPanel>
            )
        }
        return acc
    }
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
