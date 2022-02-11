import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../utils/theme";
import { Text, Icon } from "../atoms/index";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setTimerStatus } from "../../redux/actions";
export default function ModeOption({ title, onPress, style, menu, time, search, filter, history, onPressFilter, onPressSearch, onPressReset, navigation, reset, hideBack, }) {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    return (<View style={[styles.container, style]}>
      <View style={{ zIndex: 2 }}>
        {!hideBack && (<View>
            <Icon type="back" onPress={onPress}/>
          </View>)}
      </View>
      <View style={styles.title}>
        <Text.Header style={{ fontSize: 16 }}>{title}</Text.Header>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          {history && (<Icon onPress={() => navigation.navigate("History")} type="history" marginRight/>)}
        </View>
        <View>
          {time && (<Icon onPress={() => dispatch(setTimerStatus(!redux.timerStatus))} type="time" marginRight/>)}
        </View>
        <View>
          {filter && (<Icon onPress={onPressFilter} type="filter" marginRight/>)}
        </View>
        <View>
          {reset && (<Icon onPress={onPressReset} type="reset" marginRight/>)}
        </View>
        <View>
          {search && (<Icon onPress={onPressSearch} //() => dispatch(setSearch(true))
         type="search" marginRight/>)}
        </View>
        <View>
          {menu && <Icon onPress={() => dispatch(setMenu(true))} type="menu"/>}
        </View>
      </View>
    </View>);
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
