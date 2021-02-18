import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { useSelector, useDispatch } from "react-redux";
import { Container, Header } from "../../containers/index";
import {} from "../../redux/reducers";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({ loading: false });
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Container>
      <>
        <Header title="XQC" />
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={data}
          numColumns={2}
          style={{ paddingHorizontal: "4%" }}
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
                  selected.includes(item) ? { backgroundColor: "#484848" } : {},
                ]}
              ></TouchableOpacity>
            );
          }}
        />
      </>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "48%",
    backgroundColor: "#888",
    height: 180,
    marginTop: 10,
  },
});
