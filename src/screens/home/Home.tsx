import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, State } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import {
  Header,
  Button,
  IconButton,
  ImageOverlay,
} from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  initModelAsync,
  negativeExamplePressed,
  positiveExamplePressed,
  learnModelAsync,
} from "../../redux/reducers";
import { colors } from "../../utils/theme";
import { formatDate, isUpperCase, formatToLocation } from "../../utils/helpers";
import { Menu } from "../../components/organisms/index";
import { Obj } from "../../utils/types";

import axios from "axios";

type HomeProps = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: HomeProps;
};

export default function Home({ navigation }: Props) {
  const [state, setState] = useState({
    loading: true,
    loadingTitle: "Initiating the model..",
    menu: false,
    mediaInfo: null,
  });
  const [seen, setSeen] = useState<Obj[]>([]);
  const [images, setImages] = useState<Obj[]>([]);
  const [positives, setPositives] = useState<Obj[]>([]);
  const [negatives, setNegatives] = useState<Obj[]>([]);
  const [selected, setSelected] = useState<Obj[]>([]);

  //const [appState, setAppState] = useContext(AppContext);

  // console.log("Positives");
  // console.log(positives);

  // console.log("Negatives");
  // console.log(negatives);

  const dispatch = useDispatch();
  const redux = useSelector((state: State) => state);

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

  const learn = async () => {
    setState({ ...state, loading: true });
    if (positives.length === 0 && negatives.length === 0) {
      Alert.alert(
        "Error",
        "You haven't selected any images to train the model, press 'NEW RANDOM SET' if you want new images presented."
      );
      return;
    }
    //Update seen array with the images we saw in the current iteration
    var temp = seen.concat(images);
    setSeen(temp);

    axios({
      method: "post",
      url: "http://bjth.itu.dk:5001/learn",
      data: JSON.stringify({
        pos: positives.map((item) => item.exqId),
        neg: negatives.map((item) => item.exqId),
        seen: seen.map((item) => item.exqId),
        excludedVids: [],
        queryByImage: -1,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res);
        var objects: Obj[] = [];
        for (let i = 0; i < res.data.img_locations.length; i++) {
          let loc = res.data.img_locations[i];
          //Maybe get the foldername from here
          let suggestion = res.data.sugg[i];
          var newObj: Obj = {
            exqId: suggestion,
            thumbnail: formatToLocation(loc),
          };
          objects.push(newObj);
        }
        setImages(objects);
        setState({ ...state, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false });
      });

    // fetch("http://bjth.itu.dk:5001/learn", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: body,
    // })
    //   .then((res) => {
    //     console.log(JSON.stringify(res));
    //   })
    //   .catch((err) => {
    //     console.error("Error:", err);
    //   });
  };

  const initModel = async () => {
    setState({ ...state, loading: true });
    setPositives([]);
    setNegatives([]);
    setImages([]);
    var arr = [];
    while (arr.length < 50) {
      var randomNumber = Math.floor(Math.random() * Math.floor(191524)) + 1;
      if (arr.indexOf(randomNumber) > -1) continue;
      arr[arr.length] = randomNumber;
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
        console.log(res);
        var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");

        var objects: Obj[] = [];

        for (let i = 0; i < res.img_locations.length; i++) {
          var rootPath = "../../../assets/BSCBilleder/images";
          var fileName = formatToLocation(res.img_locations[i]);
          var result = regex.exec(res.img_locations[i]);
          //@ts-ignore
          var folderName = result[0].replace("_", "");

          for (let i = 0; i < res.mediainfo[folderName].shots.length; i++) {
            var obj = res.mediainfo[folderName].shots[i];

            if (obj.thumbnail === fileName) {
              var newObj: Obj;
              //console.log("Fundet");
              //console.log(obj.thumbnail);
              //console.log(obj.exqId);
              newObj = {
                shotId: obj.shotId,
                exqId: obj.exqId,
                folderName: folderName,
                thumbnail: obj.thumbnail,
              };
              //console.log(newObj);
              objects.push(newObj);
            }
          }

          //console.log(fileName + capitalOrNot);

          // var filePath = `${rootPath}/${formatDate(
          //   folderName
          // )}/${fileName}${capitalOrNot}`;
          // paths.push(filePath);
        }
        setImages(objects);
        setState({ ...state, loading: false });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    //initModel();
    dispatch(initModelAsync());
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  const removeElmFromArr = (item: Obj, arr: Obj[]) => {
    const index = arr.indexOf(item);
    var temp = [...arr];
    temp.splice(index, 1);
    return temp;
  };

  return (
    <Container loading={redux.loading} loadingTitle={state.loadingTitle}>
      <Header
        title="XQC"
        onPress={() => navigation.goBack()}
        menu
        onMenuPressed={() => setState({ ...state, menu: true })}
      />
      {state.menu && (
        <Menu onClose={() => setState({ ...state, menu: false })} />
      )}

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

      {/* <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2018-05-22/B00005972_21I6X0_20180522_112602E.JPG")} />
  <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2015-03-16/b00002298_21i6bq_20150316_145858e.jpg")} />
  <Image style={{width: 200, height: 200}} source={require("../../../assets/BSCBilleder/images/2018-05-26/B00003681_21I6X0_20180526_094519E.JPG")} />
   */}
      {redux.images.length > 0 && (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={redux.images}
          numColumns={4}
          keyExtractor={(item) => item.exqId.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.box,
                  selected.includes(item)
                    ? { backgroundColor: colors.gray }
                    : {},
                ]}
              >
                {/* //@ts-ignore */}
                <Text.Button>{item.exqId}</Text.Button>
                <ImageOverlay
                  onPressNegative={() => {
                    dispatch(negativeExamplePressed(item));
                  }}
                  onPressPositive={() => {
                    dispatch(positiveExamplePressed(item));
                  }}
                  negativeSelected={redux.negatives.includes(item)}
                  positiveSelected={redux.positives.includes(item)}
                />
              </View>
            );
          }}
        />
      )}

      <View style={styles.buttons}>
        <IconButton
          title="+/-"
          onPress={() => {
            console.log(redux.seen);

            navigation.navigate("PosAndNeg");
          }}
          secondary
        />
        <IconButton
          title="NEW RANDOM SET"
          onPress={() => initModel()}
          type="random"
          style={{ marginLeft: 10, marginRight: 10 }}
          secondary
        />
        <IconButton
          title="TRAIN"
          onPress={() => dispatch(learnModelAsync())}
          type="sync"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "24%",
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
