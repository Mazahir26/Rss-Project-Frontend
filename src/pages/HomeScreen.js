import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";

export default function Home({ data }) {
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
  return (
    <View style={styles.container}>

      <PagerView
        style={styles.viewPager}
        initialPage={0}
        orientation="vertical"
      >
        {data.map((item, index) => (
          <Cardfeed
            key={index}
            title={item.title}
            content={item.content}
            imageurl={item.imageurl? item.imageurl : item.mainimageurl}
            author={item.author}
          />
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: (Constants.statusBarHeight || 15) + 5,
  },
  viewPager: {
    height: "100%",
    width: "100%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
