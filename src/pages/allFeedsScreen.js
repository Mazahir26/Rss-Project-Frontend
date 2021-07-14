import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LottieView from "lottie-react-native";




export default function allFeed({ data }) {
  
    if (data == null) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../assets/loading.json")}
            autoPlay
            loop
          ></LottieView>
        </View>
      );
    }
}
  