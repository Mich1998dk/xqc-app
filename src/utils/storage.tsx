import AsyncStorage from "@react-native-community/async-storage";
import { customAlert } from "./helpers";
import { Model } from "./types";

export const saveModelInAsyncStorage = (model: Model) => {
  AsyncStorage.setItem(model.name, JSON.stringify(model));
};

export const deleteModelInAsyncStorage = (name: string) => {
  try {
    AsyncStorage.removeItem(name);
  } catch (error) {
    customAlert(error);
  }
};

export const clearStorage = () => {
  AsyncStorage.clear();
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

export const checkName = async (name: string) => {
  const keys = await AsyncStorage.getAllKeys();
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === name) {
      return true;
    }
  }
  return false;
};
