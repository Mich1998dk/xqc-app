import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "../utils/types";
import { Home, ChooseMode, Welcome, PosAndNeg } from "../screens/home/index";

const Stack = createStackNavigator<HomeStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="ChooseMode">
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="ChooseMode" component={ChooseMode}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="PosAndNeg" component={PosAndNeg}></Stack.Screen>
    </Stack.Navigator>
  );
}
