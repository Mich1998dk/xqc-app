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
import { setSeen, setTempFilter } from "../../redux/actions";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts, sizes } from "../../utils/theme";

type SearchProps = StackNavigationProp<HomeStackParamList, "Search">;
type RouteProps = RouteProp<HomeStackParamList, "Search">;

type Props = {
  navigation: SearchProps;
  route: RouteProps;
};

export default function Search({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [state, setState] = useState({ search: "" });
  const { mode } = route.params;

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
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ width: "92%", alignSelf: "center" }}>
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
        {(redux.searchResults.length === 0 || state.search.length > 0) && (
          <FlatList
            data={redux.searchData
              .filter((item) => item.includes(state.search.toLowerCase()))
              .slice(0, 50)}
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
                      setState({ ...state, search: "" });
                    }

                    if (mode === "locations") {
                      dispatch(
                        setTempFilter({
                          ...redux.tempFilter,
                          locations: [...redux.tempFilter.locations, index],
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
        {redux.searchResults.length > 0 && state.search.length === 0 && (
          <ImageRenderer data={redux.searchResults} />
        )}
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

    marginBottom: 30,
  },
  input: {
    padding: 20,
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
