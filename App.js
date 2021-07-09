import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./src/pages/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider,DefaultTheme } from "react-native-paper";
const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  mode: 
  "adaptive",
  colors: {
    ...DefaultTheme.colors,
    primary: '#2365BB',
    accent: '#f1c40f',
  },
};
function Component(data, index) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#555",
            margin: 10,
            borderRadius: 20,
          }}
        ></View>
        <Text style={{ flex: 1 }}>"heyyyy</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Auth />
        {/* <PagerView initialPage={0} style={{ width: "100%", height: "100%" }}>
        <Component data={{ title: "okii" }} index={1} key="1" />
        <Component data={{ title: "okii" }} index={2} key="2" />
        <Component data={{ title: "okii" }} index={3} key="3" />
        <Component data={{ title: "okii" }} index={4} key="4" />
      </PagerView> */}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
