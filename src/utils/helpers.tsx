import { Obj } from "../utils/types";

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

export function initArray() {
  var arr = [];
  while (arr.length < 50) {
    var randomNumber = Math.floor(Math.random() * Math.floor(191524)) + 1;
    if (arr.indexOf(randomNumber) > -1) continue;
    arr[arr.length] = randomNumber;
  }
  return arr;
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
    //Maybe get the foldername from here
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
