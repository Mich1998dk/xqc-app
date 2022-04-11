import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImagePropTypes,
} from "react-native";
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
import { formatTimeToPeriod } from "../../utils/helpers";
import {
  setSearchData,
  setTempFilter,
  setTimePicker,
} from "../../redux/actions";
import { reducer } from "../../redux/reducers";
import { TimePicker } from "../../components/organisms/index";
import { colors, fonts } from "../../utils/theme";

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

  useEffect(() => {
    dispatch(setTempFilter(redux.states[0].selectedFilter));
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const renderActivities = () => {
    return redux.states[0].filter.activities.map((item, index) => {
      return (
        <IconButton
          key={index}
          onPress={() => {
            if (redux.states[0].tempFilter.activities.includes(index)) {
              var temp = redux.states[0].tempFilter.activities.filter(
                (item) => item !== index
              );
              dispatch(
                setTempFilter({ ...redux.states[0].tempFilter, activities: temp })
              );
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[0].tempFilter,
                  activities: [...redux.states[0].tempFilter.activities, index],
                })
              );
            }
          }}
          title={item.toUpperCase()}
          style={{ marginRight: 6, marginBottom: 8 }}
          secondary={!redux.states[0].tempFilter.activities.includes(index)}
        />
      );
    });
  };

  const renderLocations = () => {
    return redux.states[0].filter.locations.map((item, index) => {
      if (redux.states[0].tempFilter.locations.includes(index)) {
        return (
          <IconButton
            key={index}
            onPress={() => {
              dispatch(
                setTempFilter({
                  ...redux.states[0].tempFilter,
                  locations: redux.states[0].tempFilter.locations.filter(
                    (elm) => elm !== index
                  ),
                })
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
            if (redux.states[0].tempFilter.years.includes(item.value)) {
              var temp = redux.states[0].tempFilter.years.filter(
                (elm) => elm !== item.value
              );
              dispatch(setTempFilter({ ...redux.states[0].tempFilter, years: temp }));
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[0].tempFilter,
                  years: [...redux.states[0].tempFilter.years, item.value],
                })
              );
            }
          }}
          secondary={!redux.states[0].tempFilter.years.includes(item.value)}
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
            if (redux.states[0].tempFilter.days.includes(index)) {
              var temp = redux.states[0].tempFilter.days.filter((elm) => elm !== index);
              dispatch(setTempFilter({ ...redux.states[0].tempFilter, days: temp }));
            } else {
              dispatch(
                setTempFilter({
                  ...redux.states[0].tempFilter,
                  days: [...redux.states[0].tempFilter.days, index],
                })
              );
            }
          }}
          secondary={!redux.states[0].tempFilter.days.includes(index)}
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
            dispatch(setTimePicker(true));
          }}
        >
          <Text.Button>
            {formatTimeToPeriod(redux.states[0].tempFilter.time.start)}
          </Text.Button>
        </TouchableOpacity>
        <Text.Regular>and</Text.Regular>
        <TouchableOpacity
          style={styles.time}
          onPress={() => {
            setType("end");
            dispatch(setTimePicker(true));
          }}
        >
          <Text.Button>
            {formatTimeToPeriod(redux.states[0].tempFilter.time.end)}
          </Text.Button>
        </TouchableOpacity>
      </View>

      {redux.states[0].timePicker && <TimePicker type={type} />}

      <Text.Button>Location</Text.Button>
      <View style={styles.filters}>{renderLocations()}</View>

      <TouchableOpacity
        onPress={() => {
          dispatch(setSearchData(redux.states[0].filter.locations));
          navigation.navigate("Search", { mode: "locations" });
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
