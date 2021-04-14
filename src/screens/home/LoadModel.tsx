import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Model } from "../../utils/types";
import { Button, Header, ModelOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  getModelsInAsyncStorage,
  clearStorage,
  deleteModelInAsyncStorage,
} from "../../utils/storage";
import { deleteModelAsync } from "../../redux/reducers";
import { FlatList } from "react-native-gesture-handler";

import {
  setImages,
  setNegative,
  setPositive,
  setSeen,
} from "../../redux/actions";
import { customAlert } from "../../utils/helpers";
import AsyncStorage from "@react-native-community/async-storage";

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

    if (models) setModels(models);
    else setModels([]);

    setState({ ...state, loading: false });
  };

  const deleteModel = (item: string) => {
    var filtered = models.filter(
      (elm) => elm.name.toLowerCase() !== item.toLowerCase()
    );
    deleteModelInAsyncStorage(item);
    setModels(filtered);
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
      {models.length > 0 && (
        <FlatList
          data={models}
          style={{ paddingBottom: 80 }}
          renderItem={({ item, index }) => {
            return (
              <ModelOption
                key={index}
                model={item}
                onDelete={() => {
                  deleteModel(item.name);
                }}
                onPress={() => {
                  dispatch(setNegative(item.negatives));
                  dispatch(setPositive(item.positives));
                  dispatch(setSeen(item.seen));
                  dispatch(setImages(item.lastSeen));
                  if (item.mode === "standard") {
                    navigation.navigate("Home", { loadModel: item });
                  }
                  if (item.mode === "projection") {
                    navigation.navigate("ProjectionMode", { loadModel: item });
                  }
                  if (item.mode === "speed") {
                    navigation.navigate("SpeedMode", { loadModel: item });
                  }
                }}
              />
            );
          }}
          keyExtractor={(key) => key.name}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({});
