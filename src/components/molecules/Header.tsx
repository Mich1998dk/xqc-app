import { StackNavigationProp } from "@react-navigation/stack";
import React, { CSSProperties } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setTimerStatus } from "../../redux/actions";
import { colors } from "../../utils/theme";
import { HomeStackParamList, State } from "../../utils/types";
import { Icon, Text } from "../atoms/index";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

interface Props {
  title?: string;
  navigation?: any;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPressFilter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPressSearch?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPressReset?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  menu?: boolean;
  search?: boolean;
  time?: boolean;
  filter?: boolean;
  history?: boolean;
  reset?: boolean;
  hideBack?: boolean;
  tabIndex?: number;
}

export default function ModeOption({
  title,
  onPress,
  style,
  menu,
  time,
  search,
  filter,
  history,
  onPressFilter,
  onPressSearch,
  onPressReset,
  navigation,
  reset,
  hideBack,
  tabIndex = 0,
}: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  return (
    <View style={[styles.container, style as any]}>
      <View style={{ zIndex: 2 }}>
        {!hideBack && (
          <View>
            <Icon type="back" onPress={onPress as any} />
          </View>
        )}
      </View>
          <View style={styles.title}>
              <Text.Header style={[{ fontSize: 16 }, style as any, { width: "auto", height: "auto", alignSelf: "center" }]}>{title}</Text.Header>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          {history && (
            <Icon
              onPress={() => navigation.navigate("History")}
              type="history"
              marginRight
            />
          )}
        </View>
        <View>
          {time && (
            <Icon
              onPress={() => dispatch(setTimerStatus(!redux.states[tabIndex].timerStatus,tabIndex))}
              type="time"
              marginRight
            />
          )}
        </View>
        <View>
          {filter && (
            <Icon onPress={onPressFilter as any} type="filter" marginRight />
          )}
        </View>
        <View>
          {reset && (
            <Icon onPress={onPressReset as any} type="reset" marginRight />
          )}
        </View>
        <View>
          {search && (
            <Icon
              onPress={onPressSearch} //() => dispatch(setSearch(true))
              type="search"
              marginRight
            />
          )}
              </View>
              <View style={{ paddingRight: 10 }}>
          {menu && <Icon onPress={() => dispatch(setMenu(true,tabIndex))} type="menu" />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: "100%",
    height: "5vh",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 12,
  },
  title: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
});
