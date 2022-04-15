import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "../utils/types";
import {
  Home,
  ChooseMode,
  Welcome,
  PosAndNeg,
  LoadModel,
  SpeedMode,
  ModelName,
  ProjectionMode,
  Projection,
  Filter,
  Search,
  Info,
  History,
} from "../screens/home/index";

const Stack = createStackNavigator<HomeStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="ChooseMode" component={ChooseMode}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="PosAndNeg" component={PosAndNeg}></Stack.Screen>
      <Stack.Screen name="LoadModal" component={LoadModel}></Stack.Screen>
      <Stack.Screen name="ModelName" component={ModelName}></Stack.Screen>
      <Stack.Screen name="SpeedMode" component={SpeedMode}></Stack.Screen>
      <Stack.Screen
        name="ProjectionMode"
        component={ProjectionMode}
      ></Stack.Screen>
      <Stack.Screen name="Projection" component={Projection}></Stack.Screen>
      <Stack.Screen name="Filter" component={Filter}></Stack.Screen>
      <Stack.Screen name="Search" component={Search}></Stack.Screen>
      <Stack.Screen name="Info" component={Info}></Stack.Screen>
      <Stack.Screen name="History" component={History}></Stack.Screen>
    </Stack.Navigator>
  );
}
