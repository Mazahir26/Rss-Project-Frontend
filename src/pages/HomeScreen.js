import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { IconButton } from "react-native-paper";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";

export default function Home({ saveUrl }) {
  const { state, userFeed } = useContext(Context);
  const auth = useContext(Auth);

  const [page, setPage] = useState(0);
  const [button, setbutton] = useState(false);

  if (state.UserFeed.length == 0) {
    return (
      <View style={styles.container}>
        <IconButton
          icon="refresh"
          color="#2365BB"
          size={30}
          style={{ backgroundColor: "white" }}
          onPress={() => {
            userFeed({ token: auth.state.token });
          }}
        />
      </View>
    );
  }
  Refreshbutton = () => {
    setTimeout(() => {
      if (button == true) {
        setbutton(false);
      }
    }, 2500);
    return (
      <Animatable.View
        style={{ position: "absolute", top: 20 }}
        animation="fadeInDown"
        duration={150}
        delay={0}
      >
        <IconButton
          icon="refresh"
          color="#2365BB"
          size={24}
          style={{ backgroundColor: "white" }}
          onPress={() => {
            setbutton(false);
            userFeed({ token: auth.state.token });
          }}
        />
      </Animatable.View>
    );
  };
  function issaved(url) {
    let r = false;
    state.SavedFeeds.map((item, index) => {
      if (item.url == url) {
        r = true;
        break;
      }
    });
      return r;
  }

  return (
    <View style={styles.container}>
      <PagerView
        onPageSelected={(e) => {
          if (e.nativeEvent.position < page) {
            if (button != true) setbutton(true);
          } else {
            setbutton(false);
          }
          setPage(e.nativeEvent.position);
        }}
        style={styles.viewPager}
        initialPage={0}
        orientation="vertical"
      >
        {state.UserFeed.map((item, index) => (
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
        <Refreshbutton />
      ) : (
        <Animatable.View
          style={{ position: "absolute", top: 20 }}
          animation="fadeOutUp"
          duration={150}
          delay={0}
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
