import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Animated, View, FlatList } from "react-native";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { StatusBar } from "expo-status-bar";
import { Context } from "../Context/AuthContext";

export default function Home({ data, savedUrls, saveUrl, onRefresh }) {
  const { state } = useContext(Context);
  const { page, setpag } = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function issaved(url) {
    if (savedUrls.includes(url)) {
      return true;
    }
    return false;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PagerView
        onPageSelected={(e) => {
          console.log(e.nativeEvent.position);
        }}
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
      <View
        style={{ position: "absolute", borderWidth: 3, height: 30, width: 30 }}
      ></View>
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
