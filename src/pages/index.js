import React, { useEffect, useContext } from "react";
import { NavigationContainer, DefaultTheme as LightTheme , DarkTheme } from "@react-navigation/native";
import { DefaultTheme } from "react-native-paper";
import Auth from "./AuthNavigator";
import Main from "./MainNavigator";

import { Context } from "../Context/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import { View, Text } from "react-native";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
    primary: "#2365BB",
    accent: "#F7F7F7",
    textc: "black",
    bg: "#eee"
  },
};
const Darktheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2365BB",
    accent: "#141414",
    textc: "#ccc",
    bg: "#222"
  },
};

export default function Index() {
  const { state, tryLocalSignin } = useContext(Context);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.token == "") {
    return <View></View>;
  }
  return (
    <PaperProvider theme={Darktheme}>
      <NavigationContainer theme={DarkTheme}>
        {state.token ? <Main /> : <Auth />}
      </NavigationContainer>
    </PaperProvider>
  );
}
