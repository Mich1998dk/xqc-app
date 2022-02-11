import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigator from "./HomeNavigator";
const Stack = createStackNavigator();
export default function Navigation() {
    return (<NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeNavigator}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>);
}
