import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  learnModelAsync,
  learnWithProjectedImageAsync,
  applyFiltersAsync,
  randomSetAsync,
  resetModelAsync,
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
}

export default function ButtonBar({
  navigation,
  posAndNeg,
  randomSet,
  train,
  update,
  confirm,
  applyFilter,
}: Props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.buttons}>
      {posAndNeg && (
        <IconButton
          title="+/-"
          onPress={() => {
            navigation.navigate("PosAndNeg");
          }}
          secondary
        />
      )}
      {randomSet && (
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => dispatch(randomSetAsync())}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
      )}
      {train && (
        <IconButton
          title="TRAIN"
          onPress={() => dispatch(learnModelAsync())}
          type="sync"
        />
      )}

      {applyFilter && (
        <>
          <IconButton
            title="RESET FILTERS"
            onPress={() => {
              dispatch(resetModelAsync());
            }}
            style={{ marginRight: 10 }}
            secondary
          />
          <IconButton
            title="APPLY FILTERS"
            onPress={() => {
              dispatch(applyFiltersAsync());
            }}
          />
        </>
      )}

      {update && (
        <IconButton
          title="UPDATE ALL"
          type="update"
          onPress={() => dispatch(learnModelAsync())}
        />
      )}
    </View>
  );
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
