import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { CSSProperties, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../components/atoms";
import { Header } from "../../components/molecules/index";
import { ButtonBar, ImageRenderer } from "../../components/organisms/index";
import { Container } from "../../containers/index";
import { setSearchData } from "../../redux/actions";
import {
    addNewModelAsync,
    initModelAsync, reset
} from "../../redux/reducers";
import { calculateImageWidth } from "../../utils/layout";
import { colors, fonts, sizes } from "../../utils/theme";
import { HomeStackParamList, State } from "../../utils/types";


type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;
type RouteProps = RouteProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};
/**
 * This is the main page for projection mode. 
 * 
 * @param navigation This is of @type {HomeStackParamList} which is something that contains all the information that Projection modes need to function
 * @param rotue
 */
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

    /**
     * This function returns a style @type {CSSProperties} 
     * It changes the color of the background based on if it is for the positive or negative header
     * @param pos of @type {Boolean} this is used to determine if it is for the negative or positive header
     */
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

    // Makes sure the following container will use the entire screen if not on mobile
    var mobilestylingContainer = (!isMobile) ? {
        width: "100%", maxWidth: "100%", flexDirection: "column"
    } as CSSProperties : {};

    // Makes a style sheet that sets the width to 50% of the screen if not on mobile, otherwise sets the width to 100%
    var mobileStyle = (!isMobile) ? {
        width: "50%"
    } as CSSProperties : { width: "100%" } as CSSProperties;
    return (

        // Main container that contains everything in projection mode
        <Container model={loadModel} navigation={navigation} tabIndex={selectedTab} style={mobilestylingContainer}>
            <Tabs onChange={(index) => setSelectedTab(index)}>
                {/*Makes a div inside the container with the height of the screen minus 64 which is the height of the ButtonBar at the bottom of the screen*/}
                <div style={{ height: (Dimensions.get("window").height - 64) }}>
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
                                onPressFilter={() => navigation.navigate("Filter", {tabIndex:selectedTab})}
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
                </div>
                <ButtonBar navigation={navigation} tabIndex={selectedTab} posAndNeg randomSet train />
            </Tabs>
    </Container>
  );

    /**
     *  Adds another model as the next in line
     */
    function addModel() {
        var index = redux.states.length
        dispatch(addNewModelAsync(index))
    }

    /**
     * returns the a stylesheet which is used for the tabs. 
     * checks if the tab has been selected, and changes the color of the tab accordingly
     * @param index the index of the tab @type {number}
     */
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

    /**
     * returns a list of tabs.
     * it runs through all the states to see how many models there is and tabs that need to be generated, and adds them to the list, with unique keys. 
     * it sets the style of each tab using tabStyle, and sets the visible name of the tab to the name of the model.
     * lastly it adds a tab with the text "+" that generates extra tabs
     */
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

                        <ScrollView style={{ height: "82.2vh", backgroundColor: colors.lightRed, borderRadius: 12 }} >
                        {redux.states[i].negatives.length > 0 && (
                                <ImageRenderer navigation={navigation} data={redux.states[i].negatives} tabIndex={i} style={{ width: "45%" }} numberOfImages={2} />
                        )}
                        </ScrollView>
                    </div>}
                    <div style={mobileStyle}>
                        {redux.states[i].images.length === 0 && !redux.states[i].loading && (
                            <Text.Regular style={{ display: "flex", justifyContent: "center" }}>
                                No results - maybe your filter is too strict
                            </Text.Regular>
                        )}
                        <ScrollView style={{ height: "82.2vh" }}>
                            {redux.states[i].images.length > 0 && (
                                    <ImageRenderer navigation={navigation} data={redux.states[i].images} tabIndex={i} />
                            )}
                        </ScrollView>
                    </div>
                    {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} title={"Positives"}>
                        <ScrollView style={{ height: "82.2vh", backgroundColor: colors.lightGreen, borderRadius: 12 }}>
                            {redux.states[i].positives.length > 0 && (
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
