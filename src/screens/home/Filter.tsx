import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import {
  Button,
  Header,
  IconButton,
  ModelOption,
} from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { RouteProp } from "@react-navigation/native";
import { ButtonBar } from "../../components/organisms";
import { setSearchData, setTempFilter } from "../../redux/actions";
import { reducer } from "../../redux/reducers";

type FilterProps = StackNavigationProp<HomeStackParamList, "Filter">;
type RouteProps = RouteProp<HomeStackParamList, "Filter">;

type Props = {
  navigation: FilterProps;
  route: RouteProps;
};

export default function Filter({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(setTempFilter(redux.selectedFilter));
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const renderActivities = () => {
    return redux.filter.activities.map((item, index) => {
      return (
        <IconButton
          key={index}
          onPress={() => {
            if (redux.tempFilter.activities.includes(index)) {
              var temp = redux.tempFilter.activities.filter(
                (item) => item !== index
              );

              dispatch(
                setTempFilter({ ...redux.tempFilter, activities: temp })
              );
            } else {
              dispatch(
                setTempFilter({
                  ...redux.tempFilter,
                  activities: [...redux.tempFilter.activities, index],
                })
              );
            }
          }}
          title={item.toUpperCase()}
          style={{ marginRight: 6 }}
          secondary={!redux.tempFilter.activities.includes(index)}
        />
      );
    });
  };

  const renderLocations = () => {
    return redux.filter.locations.map((item, index) => {
      if (redux.tempFilter.locations.includes(index)) {
        return (
          <IconButton
            key={index}
            onPress={() => {
              dispatch(
                setTempFilter({
                  ...redux.tempFilter,
                  locations: redux.tempFilter.locations.filter(
                    (elm) => elm !== index
                  ),
                })
              );
            }}
            type="delete"
            title={item.toUpperCase()}
            style={{ marginRight: 6 }}
          />
        );
      }
    });
  };

  return (
    <Container>
      <Header title="Filters" onPress={() => navigation.goBack()} />
      <Text.Button>Activities (Show only)</Text.Button>
      <View style={styles.filters}>{renderActivities()}</View>
      <Text.Button>Location (Show only)</Text.Button>
      <View style={styles.filters}>{renderLocations()}</View>

      <TouchableOpacity
        onPress={() => {
          dispatch(setSearchData(redux.filter.locations));
          navigation.navigate("Search");
        }}
      >
        <Text.ButtonSecondary>+ Add filter</Text.ButtonSecondary>
      </TouchableOpacity>
      <ButtonBar navigation={navigation as any} applyFilter />
    </Container>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    marginTop: 10,
  },
});
