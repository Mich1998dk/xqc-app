import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  learnModelAsync,
  learnWithProjectedImageAsync,
  applyFiltersAsync,
  randomSetAsync,
  resetModelAsync,
  resetFiltersAsync,
} from "../../redux/reducers";
import { State } from "../../utils/types";
import { IconButton } from "../molecules";
import { colors } from "../../utils/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";

type HomeProps = StackNavigationProp<HomeStackParamList>;

interface Props {
  navigation: HomeProps;
  posAndNeg?: boolean;
  randomSet?: boolean;
  train?: boolean;
  update?: boolean;
  confirm?: boolean;
  applyFilter?: boolean;
  history?: boolean;
  tabIndex?:number;
}

export default function ButtonBar({
  navigation,
  posAndNeg,
  randomSet,
  train,
  update,
  history,
  applyFilter,
  tabIndex = 0,
}: Props) {
  const dispatch = useDispatch();
  const [lastUsed, setLastUsed] = useState<"random" | "update">();

  const redux = useSelector((state: State) => state);
  return (
    <View style={styles.buttons}>
      {posAndNeg && (
        <IconButton
          title="Labeled/Seen images"
          onPress={() => {
              navigation.navigate("PosAndNeg", { tabIndex: tabIndex});
          }}
          secondary
        />
      )}
      {randomSet && (
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => {
            setLastUsed("random");
            dispatch(randomSetAsync(tabIndex));
          }}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary={lastUsed !== "random"}
        />
      )}
      {train && (
        <IconButton
          title="TRAIN"
          onPress={() => {
            setLastUsed("update");
            dispatch(learnModelAsync(tabIndex));
          }}
          type="sync"
          secondary={lastUsed !== "update"}
        />
      )}

      {applyFilter && (
        <>
          <IconButton
            title="RESET FILTERS"
            onPress={() => {
              dispatch(resetFiltersAsync(tabIndex));
            }}
            style={{ marginRight: 10 }}
            secondary
          />
          <IconButton
            title="APPLY FILTERS"
            onPress={async () => {
              dispatch(applyFiltersAsync(tabIndex));
              navigation.goBack();
            }}
          />
        </>
      )}

      {update && (
        <IconButton
          title="UPDATE ALL"
          //type="update"
          secondary={lastUsed !== "update"}
          onPress={() => {
            setLastUsed("update");
            dispatch(learnModelAsync(tabIndex));
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    buttons: {
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
