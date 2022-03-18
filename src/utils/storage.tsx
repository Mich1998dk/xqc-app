import AsyncStorage from "@react-native-community/async-storage";
import { customAlert } from "./helpers";
import { Model, SelectedFilter } from "./types";
export const saveModelInAsyncStorage = (model: Model) => {
  AsyncStorage.setItem(model.name + "-xqc", JSON.stringify(model));
};

export const deleteModelInAsyncStorage = (name: string) => {
  try {
    AsyncStorage.removeItem(name);
  } catch (error) {
    customAlert("error", error);
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
    if (keys[i].includes("xqc")) {
      const model = await AsyncStorage.getItem(keys[i]);

      //@ts-ignore
      models.push(JSON.parse(model));
    }
  }
  if (models.length === 0) return [];
  return models;
};

export const combineModelInStorage = (first: Model, second: Model) => {
   

    return {
        mode: first.mode,
        name: first.name + " and " + second.name + " Combined",
        negatives: CombineArrays(first.negatives, second.negatives),
        positives: CombineArrays(first.positives, second.positives),
        seen: CombineArrays(first.seen, second.seen),
        lastSeen: CombineArrays(first.lastSeen, second.lastSeen),
        created: new Date(),
        filter: CombineFilter(first.filter, second.filter),
    };

}

function CombineFilter(firstFilter: SelectedFilter, secondFilter: SelectedFilter): SelectedFilter {
    return {
        activities: CombineArrays(firstFilter.activities, secondFilter.activities),
        locations: CombineArrays(firstFilter.locations, secondFilter.locations),
        days: CombineArrays(firstFilter.days, secondFilter.days),
        years: CombineArrays(firstFilter.years, secondFilter.years),
        time: {
                start: Math.min(firstFilter.time.start, secondFilter.time.start),
                end: Math.max(firstFilter.time.end, secondFilter.time.end)
               }
    }
}

function CombineArrays <T>(firstArray: T[], secondArray: T[]): T[] {
    const combinedArray = firstArray.concat(secondArray);
    for (let i = 0; i < combinedArray.length; i++) {
        for (let j = i + 1; j < combinedArray.length; j++) {
            if (combinedArray[i] == combinedArray[j]) {
                combinedArray.splice(j, 1);
                j--;
            }
        }
    }
    return combinedArray;
}

export const checkName = async (name: string) => {
  const keys = await AsyncStorage.getAllKeys();
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === name + "-xqc") {
      return true;
    }
  }
  return false;
};
