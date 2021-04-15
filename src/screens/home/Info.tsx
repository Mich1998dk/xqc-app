import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Icon, Text } from "../../components/atoms/index";
import { Header } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";

type InfoProps = StackNavigationProp<HomeStackParamList, "Info">;

type Props = {
  navigation: InfoProps;
};

export default function Info({ navigation }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header title="Choose mode" onPress={() => navigation.goBack()} />
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={styles.container}>
          <Icon type="filter" />
          <Text.Header style={{ marginVertical: 10 }}>Filter</Text.Header>
          <Text.Regular>
            The filter functionality allows the user to filter out all
            non-relevant images by selecting the desired activities, locations
            and timestamps. (Be aware - some images are not labelled fully,
            which may result in “unknown”-labelled images to be filtered out).
          </Text.Regular>
        </View>
        <View style={styles.container}>
          <Icon type="search" />
          <Text.Header style={{ marginVertical: 10 }}>Search</Text.Header>
          <Text.Regular>
            The search functionality allows the user to search the media
            collection through already defined keywords, thereby browsing the
            collection in a more focused way.
          </Text.Regular>
        </View>
        <View style={styles.container}>
          <Icon type="menu" />
          <Text.Header style={{ marginVertical: 10 }}>Timer</Text.Header>
          <Text.Regular>
            The time button is only available in speed mode and allows the user
            to hide or save the timer. The timer is a tool that helps the user
            to not lose track and realize if he/she is spending too much time on
            trivial browsing.
          </Text.Regular>
        </View>
        <View style={styles.container}>
          <Icon type="menu" />
          <Text.Header style={{ marginVertical: 10 }}>Menu</Text.Header>
          <Text.Regular>
            The menu button allows the user to reset the current model or save
            it in case it is needed for later purposes.
          </Text.Regular>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === "web" ? "50%" : "100%",
    marginVertical: 20,
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
  },
});
