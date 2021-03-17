import { Platform, Alert } from "react-native";
import { MediaInfo, Mode, Obj } from "../utils/types";
import { useSelector } from "react-redux";
import { State } from "./types";
import { store } from "../redux/store";

export function formatDate(str: string) {
  var y = str.substr(0, 4),
    m = str.substr(4, 2),
    d = str.substr(6, 2);
  return `${y}-${m}-${d}`;
}

export function isUpperCase(str: string) {
  return /[A-Z]/.test(str);
}

export function formatToLocation(fileName: string) {
  const res = isUpperCase(fileName) ? fileName + ".JPG" : fileName + ".jpg";
  return res;
}

export function initArray(mode: Mode) {
  var arr = [];

  while (arr.length < getNumberOfImageByPlatformAndMode(mode)) {
    var randomNumber = Math.floor(Math.random() * Math.floor(191524)) + 1;
    if (arr.indexOf(randomNumber) > -1) continue;
    arr[arr.length] = randomNumber;
  }
  return arr;
}

export function getNumberOfImageByPlatformAndMode(mode: Mode) {
  const isWeb = Platform.OS === "web";
  if (mode === "speed") {
    if (isWeb) return 16;
    else return 6;
  }
  return 50;
}

export function formatFolderName(folderName: any) {
  return (
    folderName.substring(0, 4) +
    "-" +
    folderName.substring(4, 6) +
    "-" +
    folderName.substring(6, 8)
  );
}

export function formatBackendDataToImageObjects(res: any) {
  var objects: Obj[] = [];
  for (let i = 0; i < res.data.img_locations.length; i++) {
    let loc = res.data.img_locations[i];
    let suggestion = res.data.sugg[i];
    var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");
    var regexResult = regex.exec(loc);
    //@ts-ignore
    var folderName = regexResult[0].replace("_", "");

    var newObj: Obj = {
      exqId: suggestion,
      thumbnail: formatToLocation(loc),
      folderName: "",
      shotId: -1,
      imageURI: `http://bjth.itu.dk:5002/${formatFolderName(
        folderName
      )}/${formatToLocation(loc)}`,
    };
    objects.push(newObj);
  }
  return objects;
}

export function formatObjectsFromMediaInfo(
  mediaInfo: any,
  Imglocations: string[]
) {
  var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");
  var imageObjects: Obj[] = [];

  for (let i = 0; i < Imglocations.length; i++) {
    var fileName = formatToLocation(Imglocations[i]);
    var result = regex.exec(Imglocations[i]);
    //@ts-ignore
    var folderName = result[0].replace("_", "");

    for (let i = 0; i < mediaInfo[folderName].shots.length; i++) {
      var obj = mediaInfo[folderName].shots[i];

      if (obj.thumbnail === fileName) {
        var newObj: Obj;

        newObj = {
          shotId: obj.shotId,
          exqId: obj.exqId,
          folderName: folderName,
          thumbnail: obj.thumbnail,
          imageURI: `http://bjth.itu.dk:5002/${formatFolderName(folderName)}/${
            obj.thumbnail
          }`,
        };

        imageObjects.push(newObj);
      }
    }
  }
  return imageObjects;
}

export const customAlert = (message: string, error?: boolean) => {
  Platform.OS === "web"
    ? alert(message)
    : Alert.alert(error ? "Error" : "Success", message);
};
