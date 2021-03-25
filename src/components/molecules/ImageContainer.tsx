import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Obj } from "../../utils/types";
import { calculateImageWidth } from "../../utils/layout";

interface Props {
  imageObj: Obj;
}

export default function ImageOverlay({ imageObj }: Props) {
  return (
    <View style={styles.box}>
      {/* //@ts-ignore */}
      <Image
        style={{
          width: "100%",
          height: 200,
          resizeMode: "stretch",
          borderRadius: 12,
        }}
        source={{
          uri: imageObj.imageURI,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: calculateImageWidth(),
    backgroundColor: "#393939",
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
});
