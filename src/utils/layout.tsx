import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const isSmallDevice = width < 375;
const isLargeDevice = width > 375; //550

console.log(width);

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isLargeDevice: width > 375, //550
};

export function setSize(large: number, medium: number, small: number) {
  if (isLargeDevice) {
    return large;
  } else if (isSmallDevice) {
    return small;
  } else {
    return medium;
  }
}
