import React, { useEffect, useContext, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme as LightTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Linking } from "react-native";
import url from "../api/config";
import { DefaultTheme } from "react-native-paper";
import Constants from "expo-constants";
import Auth from "./AuthNavigator";
import Main from "./MainNavigator";
import { Context } from "../Context/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import Loader from "../components/Loading";
import Empty from "../components/Empty";
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
    bg: "#eee",
    notification: "#2365BB",
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
    bg: "#222",
    onSurface: "#222",
    notification: "#2365BB",
  },
};

export default function Index() {
  const { state, tryLocalSignin } = useContext(Context);
  const [isVersion, setisVersion] = useState(null);
  useEffect(() => {
    tryLocalSignin();
    checkVer();
  }, []);
  async function checkVer() {
    const data = await fetch(url.Version_URL)
      .then((response) => response.text())
      .then((responseData) => {
        return JSON.parse(responseData.toString());
      })
      .catch((err) => setisVersion(false));
    if (data.ver == Constants.manifest.version) setisVersion(true);
    else setisVersion(false);
  }
  if (state.token == "" || isVersion == null) {
    return <Loader />;
  }
  if (isVersion == false) {
    return (
      <Empty
        heading="App version is outdated"
        subheading="Please update the app"
        button="Update"
        or={false}
        onPress={() =>
          Linking.openURL("https://github.com/Mazahir26/Rss-Project-Frontend")
        }
      />
    );
  }
  return (
    <PaperProvider theme={state.darktheme == "true" ? Darktheme : theme}>
      <NavigationContainer
        theme={state.darktheme == "true" ? DarkTheme : LightTheme}
      >
        {state.token ? <Main /> : <Auth />}
      </NavigationContainer>
    </PaperProvider>
  );
}
