import AsyncStorage from "@react-native-community/async-storage";
import { customAlert } from "./helpers";
export const saveModelInAsyncStorage = (model) => {
    AsyncStorage.setItem(model.name + "-xqc", JSON.stringify(model));
};
export const deleteModelInAsyncStorage = (name) => {
    try {
        AsyncStorage.removeItem(name);
    }
    catch (error) {
        customAlert("error", String(error));
    }
};
export const clearStorage = () => {
    AsyncStorage.clear();
};
export const getModelsInAsyncStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0)
        return [];
    var models = [];
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].includes("xqc")) {
            const model = await AsyncStorage.getItem(keys[i]);
            //@ts-ignore
            models.push(JSON.parse(model));
        }
    }
    if (models.length === 0)
        return [];
    return models;
};
export const checkName = async (name) => {
    const keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === name) {
            return true;
        }
    }
    return false;
};
