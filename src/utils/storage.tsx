import AsyncStorage from "@react-native-community/async-storage";
import { Model } from "./types";

export const saveModelInAsyncStorage = (model: Model) => {
  AsyncStorage.setItem(model.name, JSON.stringify(model));
};

export const deleteModelInAsyncStorage = (model: Model) => {
  AsyncStorage.removeItem(model.name);
};

export const getModelsInAsyncStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  if (keys.length === 0) return [];
  var models: Model[] = [];
  for (let i = 0; i < keys.length; i++) {
    const model = await AsyncStorage.getItem(keys[i]);
    //@ts-ignore
    models.push(JSON.parse(model));
  }
  return models;
};
