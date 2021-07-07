import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

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
    <View style={styles.container}>
      <PagerView initialPage={0} style={{ width: "100%", height: "100%" }}>
        <Component data={{ title: "okii" }} index={1} key="1" />
        <Component data={{ title: "okii" }} index={2} key="2" />
        <Component data={{ title: "okii" }} index={3} key="3" />
        <Component data={{ title: "okii" }} index={4} key="4" />
      </PagerView>
      <StatusBar style="auto" />
    </View>
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
