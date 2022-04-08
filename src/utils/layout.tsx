import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const isSmallDevice = width < 375;
const isLargeDevice = width > 550;

console.log("dimensions");

console.log(width);
console.log(height);

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isLargeDevice: width > 550, //550
};

export function calculateColumnAmount(){
  if (width > 1100) return 4;
  if (width > 600) return 3;
  return 2;
}

export function calculateImageWidth() {
  if (width > 1100) return "24%";
  if (width > 600) return "32%";
  return "48%";
}

export function setSize(large: number, medium: number, small: number) {
  if (isLargeDevice) {
    return large;
  } else if (isSmallDevice) {
    return small;
  } else {
    return medium;
  }
}
