import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "../../components/atoms/index";
import { Header, ModelOption } from "../../components/molecules/index";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../containers/index";
import { getModelsInAsyncStorage, deleteModelInAsyncStorage, } from "../../utils/storage";
import { initExistingModel } from "../../redux/reducers";
import { FlatList } from "react-native-gesture-handler";
import { setImages, setLoading, setMode, setNegative, setPositive, setSeen, setSelectedFilter, } from "../../redux/actions";
export default function ChooseMode({ navigation }) {
    const [state, setState] = useState({ loading: true });
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const [models, setModels] = useState([]);
    const getModels = async () => {
        var models = await getModelsInAsyncStorage();
        if (models)
            setModels(models);
        else
            setModels([]);
        setState({ ...state, loading: false });
    };
    const deleteModel = (item) => {
        var filtered = models.filter((elm) => elm.name.toLowerCase() !== item.toLowerCase());
        deleteModelInAsyncStorage(item + "-xqc");
        setModels(filtered);
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getModels();
        });
        return unsubscribe;
    }, [navigation]);
    return (<Container>
      <Header title="Load model" onPress={() => navigation.goBack()}/>
      {models.length === 0 && (<Text.Button style={{ alignSelf: "center", opacity: 0.4 }}>
          No saved models yet :(
        </Text.Button>)}
      {models.length > 0 && (<FlatList data={models} style={{ paddingBottom: 80 }} renderItem={({ item, index }) => {
                return (<ModelOption key={index} model={item} onDelete={() => {
                        deleteModel(item.name);
                    }} onPress={async () => {
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
                    }}/>);
            }} keyExtractor={(key) => key.name}/>)}
    </Container>);
}
const styles = StyleSheet.create({});
