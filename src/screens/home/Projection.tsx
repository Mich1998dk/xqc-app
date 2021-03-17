import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Image, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";

import { RouteProp } from "@react-navigation/native";
import { Header, IconButton } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { learnWithProjectedImageAsync } from "../../redux/reducers";
import { colors } from "../../utils/theme";

import { Obj, Model } from "../../utils/types";

type HomeProps = StackNavigationProp<HomeStackParamList, "Projection">;
type RouteProps = RouteProp<HomeStackParamList, "Projection">;

type Props = {
  navigation: HomeProps;
  route: RouteProps;
};

export default function ProjectionMode({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);
  const [selected, setSelected] = useState<"positive" | "negative">("positive");

  console.log(redux.positiveProjection);

  const { uri } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container loading={redux.loading} loadingTitle="Loading..">
      <Header
        title="Projection"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Image
        style={{
          alignSelf: "center",
          width: 350,
          height: 300,
          resizeMode: "stretch",
          borderRadius: 12,
        }}
        source={{
          uri: redux.imageForProjection?.imageURI,
        }}
      />

      <View style={styles.buttonContainer}>
        <IconButton
          title="NEGATIVE"
          onPress={() => setSelected("negative")}
          secondary={selected === "positive"}
          style={{ marginRight: 10 }}
        />
        <IconButton
          title="POSITIVE"
          onPress={() => setSelected("positive")}
          secondary={selected === "negative"}
        />
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={
          selected === "negative"
            ? redux.negativeProjection
            : redux.positiveProjection
        }
        numColumns={Platform.OS === "web" ? 4 : 2}
        keyExtractor={(item) => item.exqId.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.box}>
              {/* //@ts-ignore */}
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "stretch",
                  borderRadius: 12,
                }}
                source={{
                  uri: item.imageURI,
                }}
              />
            </View>
          );
        }}
      />

      <View style={styles.buttons}>
        <IconButton
          title="CONFIRM CHOICE"
          onPress={async () => {
            navigation.goBack();
            dispatch(learnWithProjectedImageAsync(selected));
          }}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: Platform.OS === "web" ? "24%" : "46%",
    backgroundColor: "#393939",
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
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

  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 12,
  },
});
