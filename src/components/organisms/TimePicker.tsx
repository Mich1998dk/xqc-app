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
import { IconButton, ModeOption } from "../molecules/index";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setTempFilter, setTimePicker } from "../../redux/actions";
import * as l from "../../utils/layout";
import { State } from "../../utils/types";

interface Props {
  type: "start" | "end";
}

const webStyles = {
  outlineWidth: 0,
};

export default function TimePicker({ type }: Props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ isAm: true });
  const redux = useSelector((state: State) => state);

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const render = () => {
    return DATA.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.time}
          onPress={() => {
            handleChange(item);
          }}
        >
          <Text.Button>{item.toString()}</Text.Button>
        </TouchableOpacity>
      );
    });
  };

  const handleChange = (i: number) => {
    //Make to proper time from am and pm
    var time = i;
    if (!state.isAm) {
      time += 12;
    }

    //Save either start or end with dispatch
    if (type === "start") {
      dispatch(
        setTempFilter({
          ...redux.tempFilter,
          time: { ...redux.tempFilter.time, start: time },
        })
      );
    }
    if (type === "end") {
      dispatch(
        setTempFilter({
          ...redux.tempFilter,
          time: { ...redux.tempFilter.time, end: time },
        })
      );
    }
    dispatch(setTimePicker(false));
  };

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={240}>
      <Animatable.View animation="zoomIn" duration={240}>
        <View style={styles.inner}>
          <View style={styles.top}>
            <IconButton
              title="AM"
              secondary={!state.isAm}
              style={{ marginRight: 10, width: 60 }}
              onPress={() => setState({ ...state, isAm: true })}
            />
            <IconButton
              title="PM"
              style={{ width: 60 }}
              secondary={state.isAm}
              onPress={() => setState({ ...state, isAm: false })}
            />
          </View>
          <View style={styles.bottom}>{render()}</View>
          <View
            style={{
              marginTop: 40,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              onPress={() => {
                handleChange(0);
                dispatch(setTimePicker(false));
              }}
              title={"Reset"}
              style={{ width: 100, marginRight: 10 }}
            />
            <IconButton
              onPress={() => {
                dispatch(setTimePicker(false));
              }}
              title={"Close"}
              style={{ width: 100 }}
            />
          </View>
        </View>
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
  inner: {},
  top: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  bottom: {
    flexDirection: "row",
    alignSelf: "center",
    width: "50%",
    flexWrap: "wrap",
    alignItems: "center",
  },
  time: {
    width: 50,
    height: 50,
    backgroundColor: colors.box,
    borderRadius: 10,
    color: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
