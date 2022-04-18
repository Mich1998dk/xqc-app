import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
    StyleSheet, TouchableOpacity, View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../components/atoms/index";
import {
    Header,
    IconButton
} from "../../components/molecules/index";
import { ButtonBar } from "../../components/organisms";
import { TimePicker } from "../../components/organisms/index";
import { Container } from "../../containers/index";
import {
    setSearchData,
    setTempFilter,
    setTimePicker
} from "../../redux/actions";
import { formatTimeToPeriod } from "../../utils/helpers";
import { colors, fonts } from "../../utils/theme";
import { HomeStackParamList, State } from "../../utils/types";

type FilterProps = StackNavigationProp<HomeStackParamList, "Filter">;
type RouteProps = RouteProp<HomeStackParamList, "Filter">;

type Props = {
  navigation: FilterProps;
  route: RouteProps;
};

export default function Filter({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [type, setType] = useState<"start" | "end">("start");
  const {tabIndex } = route.params
  useEffect(() => {
    dispatch(setTempFilter(redux.states[tabIndex].selectedFilter,tabIndex));
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const renderActivities = () => {
    return redux.states[tabIndex].filter.activities.map((item, index) => {
      return (
        <IconButton
          key={index}
          onPress={() => {
            if (redux.states[tabIndex].tempFilter.activities.includes(index)) {
              var temp = redux.states[tabIndex].tempFilter.activities.filter(
                (item) => item !== index
              );
              dispatch(
                setTempFilter({ ...redux.states[tabIndex].tempFilter, activities: temp },tabIndex)
              );
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[tabIndex].tempFilter,
                  activities: [...redux.states[tabIndex].tempFilter.activities, index],
                }, tabIndex)
              );
            }
          }}
          title={item.toUpperCase()}
          style={{ marginRight: 6, marginBottom: 8 }}
          secondary={!redux.states[tabIndex].tempFilter.activities.includes(index)}
        />
      );
    });
  };

  const renderLocations = () => {
    return redux.states[tabIndex].filter.locations.map((item, index) => {
      if (redux.states[tabIndex].tempFilter.locations.includes(index)) {
        return (
          <IconButton
            key={index}
            onPress={() => {
              dispatch(
                setTempFilter({
                  ...redux.states[tabIndex].tempFilter,
                  locations: redux.states[tabIndex].tempFilter.locations.filter(
                    (elm) => elm !== index
                  ),
                }, tabIndex)
              );
            }}
            type="delete"
            title={item.toUpperCase()}
            style={{ marginRight: 6, marginBottom: 6 }}
          />
        );
      }
    });
  };

  const YEARS = [
    { year: "2015", value: 0 },
    { year: "2016", value: 1 },
    { year: "2018", value: 3 },
  ];

  const renderYears = () => {
    return YEARS.map((item, index) => {
      return (
        <IconButton
          key={index}
          onPress={() => {
            if (redux.states[tabIndex].tempFilter.years.includes(item.value)) {
              var temp = redux.states[tabIndex].tempFilter.years.filter(
                (elm) => elm !== item.value
              );
              dispatch(setTempFilter({ ...redux.states[tabIndex].tempFilter, years: temp },tabIndex));
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[tabIndex].tempFilter,
                  years: [...redux.states[tabIndex].tempFilter.years, item.value],
                }, tabIndex)
              );
            }
          }}
          secondary={!redux.states[tabIndex].tempFilter.years.includes(item.value)}
          title={item.year.toUpperCase()}
          style={{ marginRight: 6, marginBottom: 8 }}
        />
      );
    });
  };

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const renderDays = () => {
    return DAYS.map((item, index) => {
      return (
        <IconButton
          key={index}
          onPress={() => {
            if (redux.states[tabIndex].tempFilter.days.includes(index)) {
              var temp = redux.states[tabIndex].tempFilter.days.filter((elm) => elm !== index);
              dispatch(setTempFilter({ ...redux.states[tabIndex].tempFilter, days: temp },tabIndex));
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[tabIndex].tempFilter,
                  days: [...redux.states[tabIndex].tempFilter.days, index],
                }, tabIndex)
              );
            }
          }}
          secondary={!redux.states[tabIndex].tempFilter.days.includes(index)}
          title={item.toUpperCase()}
          style={{ marginRight: 6, marginBottom: 8 }}
        />
      );
    });
  };

  return (
    <Container>
      <Header title="Filters" onPress={() => navigation.goBack()} />
      <Text.Button>Activities</Text.Button>
      <View style={styles.filters}>{renderActivities()}</View>
      <Text.Button>Years</Text.Button>
      <View style={styles.filters}>{renderYears()}</View>
      <Text.Button>Days</Text.Button>
      <View style={styles.filters}>{renderDays()}</View>

      <Text.Button>Time of day (interval)</Text.Button>
      <View style={styles.timeContainer}>
        <Text.Regular>Between</Text.Regular>
        <TouchableOpacity
          style={styles.time}
          onPress={() => {
            setType("start");
            dispatch(setTimePicker(true,tabIndex));
          }}
        >
          <Text.Button>
            {formatTimeToPeriod(redux.states[tabIndex].tempFilter.time.start)}
          </Text.Button>
        </TouchableOpacity>
        <Text.Regular>and</Text.Regular>
        <TouchableOpacity
          style={styles.time}
          onPress={() => {
            setType("end");
            dispatch(setTimePicker(true,tabIndex));
          }}
        >
          <Text.Button>
            {formatTimeToPeriod(redux.states[tabIndex].tempFilter.time.end)}
          </Text.Button>
        </TouchableOpacity>
      </View>

      {redux.states[tabIndex].timePicker && <TimePicker type={type} />}

      <Text.Button>Location</Text.Button>
      <View style={styles.filters}>{renderLocations()}</View>

      <TouchableOpacity
        onPress={() => {
          dispatch(setSearchData(redux.states[tabIndex].filter.locations,tabIndex));
          navigation.navigate("Search", { mode: "locations",tabIndex:tabIndex });
        }}
      >
        <Text.ButtonSecondary>+ Add filter</Text.ButtonSecondary>
      </TouchableOpacity>
          <ButtonBar navigation={navigation as any} tabIndex={tabIndex } applyFilter />
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
  timeContainer: {
    flexDirection: "row",
    marginVertical: 14,
    marginBottom: 30,
    fontFamily: fonts.med,
    alignItems: "center",
  },
  time: {
    width: 70,
    height: 50,
    backgroundColor: colors.box,
    borderRadius: 10,
    color: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
