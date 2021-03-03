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
