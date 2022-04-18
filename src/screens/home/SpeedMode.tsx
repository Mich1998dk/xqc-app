import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { CSSProperties, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
    Dimensions, Platform,
    ScrollView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../components/atoms/index";
import {
    Header
} from "../../components/molecules/index";
import {
    ButtonBar,
    ImageRenderer
} from "../../components/organisms/index";
import { Container } from "../../containers/index";
import { setSearchData } from "../../redux/actions";
import {
    addNewModelAsync, initModelAsync, reset
} from "../../redux/reducers";
import {
    formatTime
} from "../../utils/helpers";
import { colors, fonts, sizes } from "../../utils/theme";
import { HomeStackParamList, State } from "../../utils/types";




type HomeProps = StackNavigationProp<HomeStackParamList, "SpeedMode">;
type RouteProps = RouteProp<HomeStackParamList, "SpeedMode">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};


/**
 * This is the main page for speed mode.
 * 
 * @param navigation
 * @param route
 */
export default function SpeedMode({ navigation, route }: Props) {
  const { loadModel } = route.params;
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0)
  useEffect(() => {
    if (loadModel === undefined) {
      dispatch(initModelAsync());
    }
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  // This effect updates the timer that tells you how long you have been in speed mode
  useEffect(() => {
    if (!redux.states[selectedTab].loading) {
      var _s = 0;
      var _m = 0;

      const interval = setInterval(() => {
        if (seconds !== 60) {
          setSeconds((sec) => sec + 1);
          _s++;
        }
        if (_s == 60) {
          setSeconds(0);
          _s = 0;
          setMin((min) => min + 1);
          _m++;
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    const unsubscribe = navigation.addListener("focus", () => {});
      return unsubscribe;
  }, [redux.states[selectedTab].loading]);

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

    // Makes sure the following container will use the entire screen if not on a mobile device
    var mobilestylingContainer = (!isMobile) ? {
        width: "100%", maxWidth: "100%", flexDirection: "column"
    } as CSSProperties : {};

    // Makes a style sheet that sets the width to 50% of the screen if not on a mobile device, otherwise sets the width to 100%
    var mobileStyle = (!isMobile) ? {
        width: "50%"
    } as CSSProperties : { width: "100%" } as CSSProperties;
    return (

        // Main container that contains everything in speed mode
        <Container model={loadModel} navigation={navigation} tabIndex={selectedTab} style={mobilestylingContainer}>
            <Tabs onChange={(index) => setSelectedTab(index)}>
                {/*Makes a div inside the container with the height of the screen minus 64 which is the height of the ButtonBar at the bottom of the screen*/}
                    <div style={{ height: (Dimensions.get("window").height-64)}}>
                        <div style={{ display: "flex" }}>
                            {!isMobile && (<Header title={"Negative"} hideBack style={posNegHeaderStyle(false)} />)}
                        <div style={mobileStyle}>
                            <Header
                            hideBack
                            title={Platform.OS === "web" ? "SPEED" : ""}
                            onPress={() => {
                              dispatch(reset());
                              navigation.goBack();
                            }}
                            tabIndex={selectedTab}
                            navigation={navigation}
                            filter
                            onPressFilter={() => navigation.navigate("Filter", {tabIndex:selectedTab})}
                            search
                            onPressSearch={() => {
                                dispatch(setSearchData(redux.states[selectedTab].terms,selectedTab));
                                navigation.navigate("Search", { mode: "terms", tabIndex: selectedTab });
                            }}
                            menu
                            time
                            />
                            {/* This div contains a text field which shows the time of how long you have been in speed mode */ }
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                              {redux.states[0].timerStatus && (
                                  <Text.Button>
                                      {formatTime(min) + ":" + formatTime(seconds)}
                                  </Text.Button>
                               )}
                            </div>
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
    function tabStyle(index: number) {
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

    /*
     * returns a list of all the different panels for each model/tab
     * and adds all the associated pictures for each model to their different views.
     */
    function panelGenerator() {
        var acc = [];

        for (var i = 0; i < redux.states.length; i++) {
            acc.push(
                <TabPanel key={"panel" + i} style={{ width: "100%" }} index={i}>
                    
                        <div style={{ width: "100%", display: "flex" }}>
                            {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} >

                                <ScrollView style={{ height: "80vh", backgroundColor: colors.lightRed, borderRadius: 12 }} >
                                    {redux.states[i].images.length > 0 && (
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
                            <ScrollView style={{ height: "80vh" }}>
                                {redux.states[i].images.length > 0 && (
                                    <ImageRenderer
                                        navigation={navigation}
                                        data={redux.states[i].images}
                                        tabIndex={i}
                                    />
                                )}
                            </ScrollView>
                            </div>
                            {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} title={"Positives"}>
                                <ScrollView style={{ height: "80vh", backgroundColor: colors.lightGreen, borderRadius: 12 }}>
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

