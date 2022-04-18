import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationParamList } from "../utils/types";
import HomeNavigator from "./HomeNavigator";

const Stack = createStackNavigator<NavigationParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ProjectionMode" component={HomeNavigator}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
