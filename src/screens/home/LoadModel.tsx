import React, {CSSProperties, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, Mode } from "../../utils/types";
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
import { deleteModelAsync, initExistingModel, learnModelAsync, randomSetAsync } from "../../redux/reducers";
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
import { customAlert, getNumberOfImageByPlatformAndMode } from "../../utils/helpers";
import AsyncStorage from "@react-native-community/async-storage";
import { CombineModels, LoadModel } from ".";
import { colors } from "../../utils/theme";
import { CustomPopUp } from "../../components/organisms/index"

type LoadModelProps = StackNavigationProp<HomeStackParamList, "LoadModal">;

type Props = {
  navigation: LoadModelProps;
};

let chosenModels: Model[] = [];
export default function ChooseMode({ navigation }: Props) {
  const [state, setState] = useState({ loading: true, Title: "", Mode: "", ModeColor: colors.accent});
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const [models, setModels] = useState<Model[]>([]);

  const [mergePopupVisible, setMergePopupVisible] = useState({ contentText:"",visible:false})
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

    const popupMergeTitle = "Combining models"
    var popupMergeContent = ""
    const cancelButton = <Button title="Cancel" key="cancel" onPress={() => cancelCombine()} style={buttonStyles.buttonStyle} secondary />
    const projectionButton = <Button title="Projection mode" key="projection mode" onPress={() => combine("projection")} style={buttonStyles.buttonStyle} />
    const speedButton = <Button title="Speed mode" key="speed mode" onPress={() => combine("speed")} style={buttonStyles.buttonStyle} />

    function cancelCombine() {
        setMergePopupVisible({ contentText: "", visible: false })
        chosenModels = [];

        setState({ ...state });
    }

    async function combine(combinedMode: Mode) {
        console.log(chosenModels)
        const Result = combineModelInStorage(chosenModels[0], chosenModels[1], combinedMode)
        await saveModelInAsyncStorage(Result);
        chosenModels = [];
        await getModels();
        await setMergePopupVisible({ contentText: "", visible: false })
    }

    function changeMode() {
        if (state.Mode == "Combine") {
            setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent})
        } else if (state.Mode == "Load") {
            setState({ ...state, Title: "Combine Models", Mode: "Combine", ModeColor: colors.accentDark })
        }
        chosenModels = []
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
                                popupMergeContent = "Do you want to combine: \"" +
                                                    chosenModels[0].name +
                                                    "\" ("+chosenModels[0].mode + ") and \"" +
                                                    chosenModels[1].name +
                                                    "\" (" + chosenModels[1].mode + ") \n Do you want to save it as Projection mode or Speed mode"

                                setMergePopupVisible({ contentText: popupMergeContent, visible:true })
                                //await setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent })
                                //chosenModels = [];
                                /*if (confirm("Do you want to combine: " + chosenModels[0].name + " and " + chosenModels[1].name)) {
                                    const Result = combineModelInStorage(chosenModels[0], chosenModels[1])
                                    await saveModelInAsyncStorage(Result);
                                    chosenModels = [];
                                    await getModels();
                                    //setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent, chosenModels: [] })
                                    //React.useCallback(() => setState({ ...state, Title: "Load Model", Mode: "Load", ModeColor: colors.accent }),[])
                                } else {
                                    chosenModels.pop()
                                }*/
                            }
                            

                           
                        }
                    } else if (state.Mode == "Load") {
                      dispatch(setLoading(true));
                      await dispatch(initExistingModel(item.lastSeen));
                      await dispatch(setNegative(item.negatives));
                      await dispatch(setPositive(item.positives));
                      await dispatch(setSeen(item.seen));
                      await dispatch(setSelectedFilter(item.filter));
                      if (item.lastSeen.length == getNumberOfImageByPlatformAndMode(item.mode)) {
                         await dispatch(setImages(item.lastSeen))
                      } else {
                        if (item.negatives.length == 0 && item.positives.length == 0) {
                            dispatch(randomSetAsync());
                        } else {
                            await dispatch(learnModelAsync());
                        }
                      }
                      dispatch(setLoading(false));
                      if (item.mode === "projection") {
                        dispatch(setMode("projection"));
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
            <CustomPopUp
                title={popupMergeTitle}
                contentText={mergePopupVisible.contentText}
                visible={mergePopupVisible.visible}
                onClose={() => cancelCombine()}
                buttons={[cancelButton, projectionButton, speedButton]}
            />
    </Container>
    );


}






const styles = StyleSheet.create({});


const buttonStyles = StyleSheet.create({
    buttonStyle: {
        width: "auto",
        paddingHorizontal: "15px",
        textAlign: "center"
    }
})
