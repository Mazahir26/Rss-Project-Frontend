import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loading() {
  return (
    <View style={styles.loadingcontainer}>
      <ActivityIndicator size={45} animating={true} color="#2365BB" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
