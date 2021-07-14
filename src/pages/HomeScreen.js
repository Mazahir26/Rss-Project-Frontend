import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { StatusBar } from "expo-status-bar";
import { Context } from "../Context/AuthContext";


export default function Home({ data, savedUrls, saveUrl }) {
  const { state } = useContext(Context);

  function issaved(url){
    if(savedUrls.includes(url)){
      return true
    }
    return false
  }
  if (data == null || savedUrls == null) {
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
      <StatusBar style="light" />
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        orientation="vertical"
      >
        {data.map((item, index) => (
          <Cardfeed
            url={item.url}
            key={index}
            title={item.title}
            content={item.content}
            imageurl={item.imageurl}
            author={item.author}
            isSaved={issaved(item.url)}
            Saveurl={saveUrl}
          />
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
