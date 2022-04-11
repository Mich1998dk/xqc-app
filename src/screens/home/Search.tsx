import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Platform,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { RouteProp } from "@react-navigation/native";
import { Header, ImageOverlay } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { Text } from "../../components/atoms/index";
import * as l from "../../utils/layout";
import {
  initModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  searchAsync,
} from "../../redux/reducers";
import { ButtonBar, ImageRenderer } from "../../components/organisms/index";
import { setSearchResults, setSeen, setTempFilter } from "../../redux/actions";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts, sizes } from "../../utils/theme";
import { ScrollView } from "react-native-gesture-handler";

type SearchProps = StackNavigationProp<HomeStackParamList, "Search">;
type RouteProps = RouteProp<HomeStackParamList, "Search">;

type Props = {
  navigation: SearchProps;
  route: RouteProps;
};

export default function Search({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [state, setState] = useState({ search: "", currentlySearched: "" });
  const { mode } = route.params;
  var search = redux.states[0].searchData
    .filter((item) => item.includes(state.search.toLowerCase()))
    .slice(0, 50);

  const getIndexOfSelected = (str: string) => {
    for (let i = 0; redux.states[0].filter.locations.length > i; i++) {
      let loc = redux.states[0].filter.locations[i];
      if (loc === str) {
        return i;
      }
    }
    return 0;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const webStyles = {
    outlineWidth: 0,
  };

  return (
    <Container>
      <Header
        title="Search"
        reset={mode === "terms"}
        onPressReset={() => {
          dispatch(setSearchResults([]));
          setState({ ...state, currentlySearched: "", search: "" });
        }}
        onPress={() => {
          dispatch(setSearchResults([]));
          navigation.goBack();
        }}
      />
      <View style={{ width: "100%", alignSelf: "center" }}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={18} color={colors.white} />
          <TextInput
            placeholder="Search for a keyword"
            value={state.search}
            placeholderTextColor="#888"
            onChangeText={(e) => setState({ ...state, search: e })}
            style={[
              styles.input,
              Platform.OS === "web" ? webStyles : ({} as any),
            ]}
          />
        </View>
              {state.currentlySearched.length > 0 && (
          <View>
            {(() => {
                if (redux.states[0].searchResults.length === 0) {
                    return (
                        <Text.Button style={{ alignSelf: "center", marginBottom: 10 }}>
                            No results found using current filter.
                        </Text.Button>
                    );} return (<Text.Button style={{ alignSelf: "center", marginBottom: 10 }}>
                    Showing results for '{state.currentlySearched}'
                </Text.Button>
                );
            })()}
              
          </View>
        )}
        <ScrollView>
          {(redux.states[0].searchResults.length === 0 || state.search.length > 0) && (
            <FlatList
              data={search}
              style={{ height: 600 }}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableHighlight
                    underlayColor={colors.box}
                    style={styles.result}
                    onPress={() => {
                      if (mode === "terms") {
                        dispatch(searchAsync(item));
                        setState({
                          ...state,
                          search: "",
                          currentlySearched: item,
                        });
                      }

                      if (mode === "locations") {
                        console.log(redux.states[0].filter.locations);

                        dispatch(
                          setTempFilter({
                            ...redux.states[0].tempFilter,
                            locations: [
                              ...redux.states[0].tempFilter.locations,
                              getIndexOfSelected(item),
                            ],
                          })
                        );
                        navigation.goBack();
                      }
                    }}
                  >
                    <Text.Button style={{ fontSize: sizes.base16 }}>
                      {item}
                    </Text.Button>
                  </TouchableHighlight>
                );
              }}
            />
          )}
          {redux.states[0].searchResults.length > 0 && state.search.length === 0 && (
            <ImageRenderer data={redux.states[0].searchResults} navigation={navigation} />
          )}
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.box,
    borderRadius: sizes.base16,
    alignItems: "center",
    paddingLeft: 20,
    marginBottom: 15,
  },
  input: {
    padding: 20,
    paddingVertical: 16,
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.med,
    width: "100%",
  },
  result: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    padding: 16,
    paddingLeft: 20,
    borderRadius: 100,
  },
});
