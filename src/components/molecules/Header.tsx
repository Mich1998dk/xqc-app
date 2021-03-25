import React, { CSSProperties } from "react";
import { StyleSheet, View } from "react-native";
import { fonts, colors, sizes } from "../../utils/theme";
import { Text, Icon } from "../atoms/index";
import { useDispatch } from "react-redux";
import { setMenu, setSearch } from "../../redux/actions";

interface Props {
  title?: string;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  menu?: boolean;
  search?: boolean;
  time?: boolean;
}

export default function ModeOption({
  title,
  onPress,
  style,
  menu,
  time,
  search,
}: Props) {
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, style as any]}>
      <View style={{ zIndex: 2 }}>
        <Icon type="back" onPress={onPress!} />
      </View>
      <View style={styles.title}>
        <Text.Header>{title}</Text.Header>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          {search && (
            <Icon
              onPress={() => dispatch(setSearch(true))}
              type="search"
              marginRight
            />
          )}
        </View>
        <View>
          {menu && <Icon onPress={() => dispatch(setMenu(true))} type="menu" />}
        </View>
        {/* <View>
          {time && <Icon onPress={() => dispatch(se)} type="time" />}
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: "100%",
    alignSelf: "center",
    height: 50,
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
