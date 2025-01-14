import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../components/atoms";
import { Header, IconButton } from "../../components/molecules/index";
import { Container } from "../../containers/index";
import { learnWithProjectedImageAsync } from "../../redux/reducers";
import { calculateColumnAmount, calculateImageWidth } from "../../utils/layout";
import { colors } from "../../utils/theme";
import { HomeStackParamList, State } from "../../utils/types";


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
  const {tabIndex } = route.params
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header
        title="PROJECTION"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.imgInfo}>
        <Image
          style={{
            alignSelf: "center",
            width: Platform.OS === "web" ? 350 : 250,
            height: Platform.OS === "web" ? 300 : 200,
            resizeMode: "stretch",
            borderRadius: 12,
          }}
          source={{
            uri: redux.states[tabIndex].imageForProjection?.imageURI,
          }}
        />
        <View style={styles.rightInfo}>
          {redux.states[tabIndex].imageInfo?.name && (
            <Text.Button>Name: {redux.states[tabIndex].imageInfo?.name}</Text.Button>
          )}
          {redux.states[tabIndex].imageInfo?.day !== "unknown" && (
            <Text.Button>Location: {redux.states[tabIndex].imageInfo?.day}</Text.Button>
          )}
          {redux.states[tabIndex].imageInfo?.hour && (
            <Text.Button>Hour: {redux.states[tabIndex].imageInfo?.hour}</Text.Button>
          )}
          {redux.states[tabIndex].imageInfo?.year && (
            <Text.Button>Year: {redux.states[tabIndex].imageInfo?.year}</Text.Button>
          )}
          {redux.states[tabIndex].imageInfo?.location !== "unknown" && (
            <Text.Button>Location: {redux.states[tabIndex].imageInfo?.location}</Text.Button>
          )}
          {redux.states[tabIndex].imageInfo?.activity !== "unknown" && (
            <Text.Button>Activity: {redux.states[tabIndex].imageInfo?.activity}</Text.Button>
          )}
        </View>
      </View>

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
            ? redux.states[tabIndex].negativeProjection
            : redux.states[tabIndex].positiveProjection
        }
        style={{ paddingBottom: 80 }}
        numColumns={calculateColumnAmount()}
        keyExtractor={(item) => item.exqId.toString()}
        renderItem={({ item }) => {
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
            dispatch(learnWithProjectedImageAsync(selected,tabIndex));
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: calculateImageWidth(),
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
  imgInfo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  rightInfo: {
    marginLeft: 20,
    flexDirection: "column",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 12,
  },
});
