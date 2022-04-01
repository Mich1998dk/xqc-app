import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { FlatList } from "react-native-gesture-handler";

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
import { CustomPopUp } from "../../components/organisms/index";
import { Title } from "../../components/atoms/Text";

type LoadModelProps = StackNavigationProp<HomeStackParamList, "LoadModal">;

type Props = {
    navigation: LoadModelProps;
};

export default function ChooseMode({ navigation }: Props) {
    const [state, setState] = useState({ loading: true });
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const [models, setModels] = useState<Model[]>([]);
    let chosenModels: Model[] = [];
    const getModels = async () => {
        var models = await getModelsInAsyncStorage();

        if (models) setModels(models);
        else setModels([]);

        setState({ ...state, loading: false });
    };

    const deleteModel = (item: string) => {
        var filtered = models.filter(
            (elm) => elm.name.toLowerCase() !== item.toLowerCase()
        );
        deleteModelInAsyncStorage(item + "-xqc");
        setModels(filtered);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getModels();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            
            <Header title="Combine Models" onPress={() => navigation.goBack()} />
            {models.length === 0 && (
                <Text.Button style={{ alignSelf: "center", opacity: 0.4 }}>
                    No saved models yet :(
                </Text.Button>
            )}
            {models.length > 0 && (
                <FlatList
                    data={models}
                    style={{ paddingBottom: 80 }}
                    renderItem={({ item, index }) => {
                        return (
                            <ModelOption
                                key={index}
                                model={item}
                                onDelete={() => {
                                    deleteModel(item.name);
                                }}
                                onPress={() => {
                                    if (chosenModels.includes(item)) {
                                        const index = chosenModels.indexOf(item)
                                        chosenModels.splice(index, 1)
                                    } else {
                                        chosenModels.push(item)
                                        if (chosenModels.length == 2) {
                                        console.log("before choice")
                                            console.log(chosenModels)
                                                

                                            
                                            /*if (confirm("Do you want to combine: " + chosenModels[0].name + " and " + chosenModels[1].name)) {
                                                const Result = combineModelInStorage(chosenModels[0], chosenModels[1])
                                                saveModelInAsyncStorage(Result);
                                            } else {
                                                chosenModels.pop()
                                            }*/

                                        }
                                    console.log("after choice")
                                    console.log(chosenModels)
                                    }
                                }}
                            />
                        );
                    }}
                    keyExtractor={(key) => key.name}
                />
            )}
        </Container>
    );
}


const styles = StyleSheet.create({});
