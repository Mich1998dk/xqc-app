import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { learnModelAsync, applyFiltersAsync, randomSetAsync, resetFiltersAsync, } from "../../redux/reducers";
import { IconButton } from "../molecules";
import { colors } from "../../utils/theme";
export default function ButtonBar({ navigation, posAndNeg, randomSet, train, update, history, applyFilter, }) {
    const dispatch = useDispatch();
    const [lastUsed, setLastUsed] = useState();
    const redux = useSelector((state) => state);
    return (<View style={styles.buttons}>
      {posAndNeg && (<IconButton title="+/-" onPress={() => {
                navigation.navigate("PosAndNeg");
            }} secondary/>)}
      {randomSet && (<IconButton title="NEW RANDOM SET" onPress={() => {
                setLastUsed("random");
                dispatch(randomSetAsync());
            }} type="random" style={{ marginLeft: 10, marginRight: 10 }} secondary={lastUsed !== "random"}/>)}
      {train && (<IconButton title="TRAIN" onPress={() => {
                setLastUsed("update");
                dispatch(learnModelAsync());
            }} type="sync" secondary={lastUsed !== "update"}/>)}

      {applyFilter && (<>
          <IconButton title="RESET FILTERS" onPress={() => {
                dispatch(resetFiltersAsync());
            }} style={{ marginRight: 10 }} secondary/>
          <IconButton title="APPLY FILTERS" onPress={async () => {
                dispatch(applyFiltersAsync());
                navigation.goBack();
            }}/>
        </>)}

      {update && (<IconButton title="UPDATE ALL" 
        //type="update"
        secondary={lastUsed !== "update"} onPress={() => {
                setLastUsed("update");
                dispatch(learnModelAsync());
            }}/>)}
    </View>);
}
const styles = StyleSheet.create({
    buttons: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
});
