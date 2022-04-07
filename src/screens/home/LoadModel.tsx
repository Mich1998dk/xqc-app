import React, {CSSProperties, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/types";
import { Text } from "../../components/atoms/index";
import { Model } from "../../utils/types";
import { Button, Header, ModelOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import {
  getModelsInAsyncStorage,
  clearStorage,
  deleteModelInAsyncStorage,
  combineModelInStorage,
  saveModelInAsyncStorage,
} from "../../utils/storage";
import { deleteModelAsync, initExistingModel } from "../../redux/reducers";
import { FlatList, State } from "react-native-gesture-handler";

import {
  setImages,
  setLoading,
  setMode,
  setNegative,
  setPositive,
  setSeen,
  setSelectedFilter,
} from "../../redux/actions";
import { customAlert } from "../../utils/helpers";
import AsyncStorage from "@react-native-community/async-storage";
import { CombineModels, LoadModel } from ".";
import { colors } from "../../utils/theme";
import { CustomPopUp } from "../../components/organisms/index"

type LoadModelProps = StackNavigationProp<HomeStackParamList, "LoadModal">;

type Props = {
  navigation: LoadModelProps;
};


export default function ChooseMode({ navigation }: Props) {

  let chosenModels: Model[] = [];
  const [state, setState] = useState({ loading: true, Title: "", Mode: "", ModeColor: colors.accent});
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const [models, setModels] = useState<Model[]>([]);

  const [popupVisible,setPopupVisible] = useState(false)
  const getModels = async () => {
    var models = await getModelsInAsyncStorage();

    if (models) setModels(models);
    else setModels([]);

      setState({...state, loading: false, Title: "Load Model", Mode: "Load", ModeColor: colors.accent });
  };

  const deleteModel = (item: string) => {
    var filtered = models.filter(
      (elm) => elm.name.toLowerCase() !== item.toLowerCase()
    );
    deleteModelInAsyncStorage(item + "-xqc");
    setModels(filtered);
  };

    function changeMode() {
        if (state.Mode == "Combine") {
            setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent})
        } else if (state.Mode == "Load"){
            setState({ ...state, Title: "Combine Models", Mode: "Combine", ModeColor: colors.red})
        }
    }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getModels();
    });
    return unsubscribe;
  }, [navigation]);

    return (
      <Container>
          
      <Header title={state.Title} onPress={() => navigation.goBack()} />
      {models.length === 0 && (
        <Text.Button style={{ alignSelf: "center", opacity: 0.4 }}>
          No saved models yet :(
        </Text.Button>
          )}
          <View style={{ width: "100%" , alignItems: "center" }}>
              <Button
                  title="Change Mode"
                  onPress={() => changeMode()}
                  style={{ margin: 10 }}
              />
          </View>
          {models.length > 0 && (
          <FlatList
          data={models}
          style={{ paddingBottom: 80 }}
          renderItem={({ item, index }) => {
            return (
              <ModelOption
                key={index}
                model={item}
                mode={state.Mode}
                style={{borderColor: state.ModeColor} as CSSProperties} 
                onDelete={() => {
                  deleteModel(item.name);
                    }}
                    CombineList={chosenModels}
                    onPressFunction={async() => {
                    if (state.Mode == "Combine") {
                        if (chosenModels.includes(item)) {
                            const index = chosenModels.indexOf(item)
                            chosenModels.splice(index, 1)
                        } else {
                            chosenModels.push(item)
                            if (chosenModels.length == 2) {
                                setPopupVisible(true)
                                //await setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent })
                                //chosenModels = [];
                                /*if (confirm("Do you want to combine: " + chosenModels[0].name + " and " + chosenModels[1].name)) {
                                    const Result = combineModelInStorage(chosenModels[0], chosenModels[1])
                                    await saveModelInAsyncStorage(Result);
                                    chosenModels = [];
                                    console.log("chosenmodels:")
                                    console.log(chosenModels)
                                    await getModels();
                                    //setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent, chosenModels: [] })
                                    //React.useCallback(() => setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent }),[])
                                } else {
                                    chosenModels.pop()
                                }*/
                                //setModalState(true)
                            }
                            

                           
                        }
                    } else if (state.Mode == "Load") {
                      dispatch(setLoading(true));
                      await dispatch(initExistingModel(item.lastSeen));
                      await dispatch(setImages(item.lastSeen));
                      await dispatch(setNegative(item.negatives));
                      await dispatch(setPositive(item.positives));
                      await dispatch(setSeen(item.seen));
                      await dispatch(setSelectedFilter(item.filter));
                      dispatch(setLoading(false));
                      if (item.mode === "standard") {
                        dispatch(setMode("standard"));
                        navigation.navigate("Home", { loadModel: item });
                      }
                      if (item.mode === "speed") {
                        dispatch(setMode("speed"));
                        navigation.navigate("SpeedMode", { loadModel: item });
                      }
                    }
                }}
              />
            );
          }}
                  keyExtractor={(key) => key.name}
                 
        />
            )}
            <CustomPopUp visible={popupVisible} onClose={setPopupVisible}/>
    </Container>
    );
    
}



const styles = StyleSheet.create({});
let combineMode = false;
