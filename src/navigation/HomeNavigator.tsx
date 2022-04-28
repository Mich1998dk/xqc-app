import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
    ChooseMode, Filter, ProjectionMode, Info, LoadModel, ModelName, PosAndNeg, Projection, Search, SpeedMode, Welcome
} from "../screens/home/index";
import { HomeStackParamList } from "../utils/types";

const Stack = createStackNavigator<HomeStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="ChooseMode" component={ChooseMode}></Stack.Screen>
      <Stack.Screen name="ProjectionMode" component={ProjectionMode}></Stack.Screen>
      <Stack.Screen name="PosAndNeg" component={PosAndNeg}></Stack.Screen>
      <Stack.Screen name="LoadModal" component={LoadModel}></Stack.Screen>
      <Stack.Screen name="ModelName" component={ModelName}></Stack.Screen>
      <Stack.Screen name="SpeedMode" component={SpeedMode}></Stack.Screen>
      <Stack.Screen name="Projection" component={Projection}></Stack.Screen>
      <Stack.Screen name="Filter" component={Filter}></Stack.Screen>
      <Stack.Screen name="Search" component={Search}></Stack.Screen>
      <Stack.Screen name="Info" component={Info}></Stack.Screen>
    </Stack.Navigator>
  );
}
