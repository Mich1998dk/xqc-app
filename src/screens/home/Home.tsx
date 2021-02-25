import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Header, Button, IconButton } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {} from "../../redux/reducers";
import { colors } from "../../utils/theme";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({ loading: true, images: [] });
  const [selected, setSelected] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const [path, setPath] = useState("")

  const testConnection = async () => {
    fetch("http://bjth.itu.dk:5001/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  function parse(str: string) {
    var y = str.substr(0, 4),
      m = str.substr(4, 2),
      d = str.substr(6, 2);
    return `${y}-${m}-${d}`;
  }

  function isUpperCase(str: string) {
    return /[A-Z]/.test(str);
  }

  const initModel = async () => {
    var arr = [];
    while (arr.length < 50) {
      var randomnumber = Math.floor(Math.random() * Math.floor(191524)) + 1;
      if (arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    fetch("http://bjth.itu.dk:5001/initModel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: arr }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");


        var paths = [];
        for (let i = 0; i < res.img_locations.length; i++) {
          var rootPath = "../../../assets/BSCBilleder/images";
          var fileName = res.img_locations[i];
          var result = regex.exec(res.img_locations[i]);
          //@ts-ignore
          var folderName = result[0].replace("_", "");
          var capitalOrNot = isUpperCase(fileName) ? ".JPG" : ".jpg";

          var filePath = `${rootPath}/${parse(
            folderName
          )}/${fileName}${capitalOrNot}`;
          paths.push(filePath);
          console.log(paths[i]);
          //import("/Users/emilknudsen/Desktop/BSCBilleder/images/2015-02-23/")
          // var temp = res.img_locations[i].split("_");
          // var folderName = temp[0];
          // var date = parse(folderName)
          // console.log(folderName)
          // console.log(date);
        }
        console.log("PATH")
        console.log(paths[0])
        setPath(paths[0])

        //setImages(paths)
        setState({...state, loading: false, images: paths as any})

        //Make new string which is the folder name
        // - Split on "_" and reformat the first position to "YYYY-MM-DD"
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  const data = ["../../../assets/BSCBilleder/images/2018-05-22/B00005972_21I6X0_20180522_112602E.JPG", "../../../assets/BSCBilleder/images/2015-03-16/b00002298_21i6bq_20150316_145858e.jpg", "../../../assets/BSCBilleder/images/2018-05-26/B00003681_21I6X0_20180526_094519E.JPG", "../../../assets/BSCBilleder/images/2018-05-06/B00008766_21I6X0_20180506_160205E.JPG", "../../../assets/BSCBilleder/images/2018-05-08/B00001150_21I6X0_20180508_190424E.JPG"];

  return (
    <Container>
      <Header title="XQC" onPress={() => navigation.goBack()} menu />
      {/* <ScrollView style={{ flex: 1 }}>
        <Button onPress={() => testConnection()} title="Hent" />
        <Button onPress={() => initExquisitor()} title="Init" />
      </ScrollView> */}

      {/*images.length > 0 && (
        <Image
          style={{ width: 200, height: 200 }}
          source={{url: images[0]} as any} 
        />
      )*/}
{/* {!state.loading && 
  <Image style={{width: 200, height: 200}} source={require(images[20])} />
} */}

  
  <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2018-05-22/B00005972_21I6X0_20180522_112602E.JPG")} />
  <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2015-03-16/b00002298_21i6bq_20150316_145858e.jpg")} />
  <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2018-05-26/B00003681_21I6X0_20180526_094519E.JPG")} />
  

  


      {/* <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selected.includes(item)) {
                  const index = selected.indexOf(item);
                  var temp = [...selected];
                  temp.splice(index, 1);
                  setSelected(temp);
                } else {
                  var newArray = [...selected, item];
                  setSelected(newArray);
                }
              }}
              key={item}
              style={[
                styles.box,
                selected.includes(item) ? { backgroundColor: colors.gray } : {},
              ]}
            ></TouchableOpacity>
          );
        }}
      /> */}
      <View style={styles.buttons}>
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => initModel()}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
        <IconButton
          title="TRAIN"
          onPress={() => console.log("Train")}
          type="sync"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "48%",
    backgroundColor: "#393939",
    height: 180,
    marginTop: 10,
    borderRadius: 12,
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
