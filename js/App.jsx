import React, { useState, useEffect, createContext } from "react";
import i18n from "i18n-js";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import Navigation from "./src/navigation/Navigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
const initialState = {
    positives: [],
    negatives: [],
};
export const AppContext = createContext([initialState]);
export default function App() {
    const [appReady, setAppReady] = useState(false);
    const [appState, setAppState] = useState(initialState);
    i18n.fallbacks = true;
    //TODO: Tilføj resten med localisation og i18n.js
    const prepareResources = async () => {
        try {
            await Font.loadAsync({
                "MARKPRO-MED": require("./src/assets/fonts/MARKPRO-MEDIUM.otf"),
                "MARKPRO-BOLD": require("./src/assets/fonts/MARKPRO-BOLD.otf"),
            });
        }
        catch (e) {
            console.warn(e);
        }
        finally {
            setAppReady(true);
        }
    };
    useEffect(() => {
        prepareResources();
    }, []);
    if (!appReady) {
        return <AppLoading autoHideSplash/>;
    }
    return (<SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="dark"/>
        <Navigation />
      </Provider>
    </SafeAreaProvider>);
}
