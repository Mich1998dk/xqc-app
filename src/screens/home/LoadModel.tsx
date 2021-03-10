import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Model } from "../../utils/types";
import { Header, ModelOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { getModelsInAsyncStorage } from "../../utils/storage";
import {} from "../../redux/reducers";
import { FlatList } from "react-native-gesture-handler";

type LoadModelProps = StackNavigationProp<HomeStackParamList, "LoadModal">;

type Props = {
  navigation: LoadModelProps;
};

export default function ChooseMode({ navigation }: Props) {
  const [state, setState] = useState({ loading: true });
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const [models, setModels] = useState<Model[]>([]);

  const getModels = async () => {
    var models = await getModelsInAsyncStorage();
    setModels(models);
    setState({ ...state, loading: false });
    console.log(models);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getModels();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header title="Choose model" onPress={() => navigation.goBack()} />
      {models.length === 0 && (
        <Text.Button style={{ alignSelf: "center", opacity: 0.4 }}>
          No saved models yet :(
        </Text.Button>
      )}
      <FlatList
        data={models}
        renderItem={({ item, index }) => {
          return (
            <ModelOption
              key={index}
              model={item}
              onPress={() => console.log("hej")}
            />
          );
        }}
        keyExtractor={(key) => key.name}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
