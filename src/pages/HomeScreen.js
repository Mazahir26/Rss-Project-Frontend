import React, { useState, useContext, useRef } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { IconButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Context } from "../Context/AuthContext";

export default function Home({ data, savedUrls, saveUrl, onRefresh }) {
  const { state } = useContext(Context);
  const [page, setPage] = useState(0);
  const [button, setbutton] = useState(false);

  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <IconButton
          icon="refresh"
          color="#2365BB"
          size={30}
          style={{ backgroundColor: "white" }}
          onPress={() => {
            onRefresh();
          }}
        />
      </View>
    );
  }

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
          if (e.nativeEvent.position < page) {
            setbutton(true);
            setTimeout(() => (button ? setbutton(false) : null), 2500);
          } else {
            setbutton(false);
          }
          setPage(e.nativeEvent.position);
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
      {button ? (
        <Animatable.View
          style={{ position: "absolute", top: 20 }}
          animation="fadeInDown"
          duration={300}
        >
          <IconButton
            icon="refresh"
            color="#2365BB"
            size={24}
            style={{ backgroundColor: "white" }}
            onPress={() => {
              setbutton(false);
              onRefresh();
            }}
          />
        </Animatable.View>
      ) : (
        <Animatable.View
          style={{ position: "absolute", top: 20 }}
          animation="fadeOutUp"
          duration={300}
        >
          <IconButton
            elevation={4}
            disabled={true}
            icon="refresh"
            color="#2365BB"
            size={24}
            style={{ backgroundColor: "white" }}
          />
        </Animatable.View>
      )}
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
