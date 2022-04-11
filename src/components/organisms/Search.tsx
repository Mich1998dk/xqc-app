import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { fonts, colors, sizes } from "../../utils/theme";
import i18n from "i18n-js";
import * as Text from "../atoms/Text";
import { ModeOption } from "../molecules/index";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/actions";
import * as l from "../../utils/layout";
import { State } from "../../utils/types";
import { searchAsync } from "../../redux/reducers";

interface Props {}

const webStyles = {
  outlineWidth: 0,
};

export default function Menu({}: Props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ search: "" });
  const terms = useSelector((state: State) => state.states[0].terms);

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <Animatable.View animation="zoomIn" duration={240}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 10,
          }}
        >
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
          <TouchableOpacity
            onPress={() => dispatch(setSearch(false))}
            style={{
              alignSelf: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close-circle-sharp"
              size={36}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={
            state.search.length >= 2
              ? terms
                  .filter((item) => item.includes(state.search.toLowerCase()))
                  .slice(0, 50)
              : []
          }
          style={{ height: 300 }}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                underlayColor={colors.box}
                style={styles.result}
                onPress={() => {
                  dispatch(searchAsync(item));
                  dispatch(setSearch(false));
                }}
              >
                <Text.Button style={{ fontSize: sizes.base16 }}>
                  {item}
                </Text.Button>
              </TouchableHighlight>
            );
          }}
        />
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    backgroundColor: colors.loader_bg,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.box,
    borderRadius: sizes.base16,
    alignItems: "center",
    paddingLeft: 20,
  },
  input: {
    padding: 20,
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.med,
    width: Platform.OS === "web" ? 400 : l.default.window.width - 120,
  },
  result: {
    width: Platform.OS === "web" ? 438 : 380,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 16,
    paddingLeft: 20,
    borderRadius: 100,
  },
});
