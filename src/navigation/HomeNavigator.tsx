import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "../utils/types";
import { Home } from "../screens/home/index";

const Stack = createStackNavigator<HomeStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
}
