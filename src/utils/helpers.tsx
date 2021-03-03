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
