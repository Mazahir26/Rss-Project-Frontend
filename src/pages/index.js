import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
    accent: "#f1c40f",
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
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {state.token ? <Main /> : <Auth />}
      </NavigationContainer>
    </PaperProvider>
  );
}
