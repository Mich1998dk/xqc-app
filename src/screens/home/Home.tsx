import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Header, Button, IconButton } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { colors } from "../../utils/theme";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({ loading: false });
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  const testConnection = async () => {
    fetch("http://bjth.itu.dk:5001/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const initExquisitor = async () => {
    fetch("http://bjth.itu.dk:5001/initExquisitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Container>
      <Header title="XQC" onPress={() => navigation.goBack()} menu />
      {/* <ScrollView style={{ flex: 1 }}>
        <Button onPress={() => testConnection()} title="Hent" />
        <Button onPress={() => initExquisitor()} title="Init" />
      </ScrollView> */}

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selected.includes(item)) {
                  const index = selected.indexOf(item);
                  var temp = [...selected];
                  temp.splice(index, 1);
                  setSelected(temp);
                } else {
                  var newArray = [...selected, item];
                  setSelected(newArray);
                }
              }}
              key={item}
              style={[
                styles.box,
                selected.includes(item) ? { backgroundColor: colors.gray } : {},
              ]}
            ></TouchableOpacity>
          );
        }}
      />
      <View style={styles.buttons}>
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => console.log("New random set")}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
        <IconButton
          title="TRAIN"
          onPress={() => console.log("Train")}
          type="sync"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "48%",
    backgroundColor: "#393939",
    height: 180,
    marginTop: 10,
    borderRadius: 12,
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
