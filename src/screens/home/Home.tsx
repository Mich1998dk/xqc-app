import React, { CSSProperties, useEffect } from "react";
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
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import { Header, ImageOverlay } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  initModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  reset,
} from "../../redux/reducers";
import { ButtonBar, ImageRenderer } from "../../components/organisms/index";
import { setSearchData, setSeen, setSelectedFilter } from "../../redux/actions";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { Text } from "../../components/atoms";
import { isMobile } from "react-device-detect"
import { colors } from "../../utils/theme";

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

  useEffect(() => {
    if (loadModel === undefined) {
      dispatch(initModelAsync());
    }
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);
    var mobilestylingContainer = (!isMobile) ? {
        width: "100%", maxWidth: "100%", flexDirection: "row", justifyContent: "center"
    } as CSSProperties : {};

    var mobileStyle = (!isMobile) ? {
        width: "50%"
    } as CSSProperties : {};
    return (
        <Container model={loadModel} navigation={navigation} style={mobilestylingContainer}>

            {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%"}} >

                <Header title={"Negative"} hideBack style={{ backgroundColor: colors.red }} />
                <ScrollView style={{ height: "90vh", backgroundColor: colors.lightRed }} >
                    {redux.images.length > 0 && (
                        <ImageRenderer navigation={navigation} data={redux.negatives} style={{ width: 200}} posNeg={2} />
                    )}
                </ScrollView>
            </div>}

            <div style={mobileStyle}>
      <Header
        title={Platform.OS === "web" ? "PROJECTION" : ""}
        onPress={() => {
          dispatch(reset());
          navigation.goBack();
        }}
        hideBack
        menu
        filter
        onPressFilter={() => navigation.navigate("Filter")}
        search
        onPressSearch={() => {
          dispatch(setSearchData(redux.terms));
          navigation.navigate("Search", { mode: "terms" });
        }}
          />
          <Tabs>
              <TabList>
                  <Tab> first</Tab>
                  <Tab> second</Tab>
              </TabList>
              <TabPanels>
                  <TabPanel>
                      <ScrollView style={{ height: "90vh" }}>
                          {redux.images.length > 0 && (
                              <ImageRenderer navigation={navigation} data={redux.images} />
                          )}
                      </ScrollView>
                  </TabPanel>
                  <TabPanel></TabPanel>
              </TabPanels>
          </Tabs>

              {redux.images.length === 0 && !redux.loading && (
                <Text.Regular style={{ alignSelf: "center" }}>
                  No results - maybe your filter is too strict
                </Text.Regular>
              )}
            </div>

            {!isMobile && <div style={{ color: "white", fontSize: 10, width: "25%" }} title={"Positives"}>
                <Header title={"Positive"} hideBack style={{ backgroundColor: colors.green }} />
                <ScrollView style={{ height: "90vh", backgroundColor: colors.lightGreen }}>
                    {redux.images.length > 0 && (
                        <ImageRenderer navigation={navigation} data={redux.positives} style={{ width: 200 }} posNeg={2} />
                    )}
                </ScrollView>
            </div>}

            <ButtonBar navigation={navigation} posAndNeg randomSet train />
    </Container>
  );
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
