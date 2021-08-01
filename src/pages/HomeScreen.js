import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import Cardfeed from "../components/FeedCard";
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { IconButton, Snackbar } from "react-native-paper";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";

export default function Home() {
  const { state, userFeed, save_URL, delete_URL, clearmess } =
    useContext(Context);
  const auth = useContext(Auth);
  const [page, setPage] = useState(0);
  const [button, setbutton] = useState(false);
  const onDismissSnackBar = () => clearmess();

  useEffect(() => {
    if (button == true) {
      setTimeout(() => {
        if (button == true) {
          setbutton(false);
        }
      }, 2500);
    }
  }, [button]);
  if (state.UserFeed.length == 0) {
    return (
      <View style={styles.container}>
        <IconButton
          icon="refresh"
          color="#2365BB"
          size={30}
          style={{
            backgroundColor:
              auth.state.darktheme == "true" ? "#141414" : "white",
          }}
          onPress={() => {
            userFeed({ token: auth.state.token });
          }}
        />
      </View>
    );
  }
  Refreshbutton = () => {
    console.log("ok?");
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
        {state.ErrorMessage ? (
          <Snackbar visible={true} onDismiss={onDismissSnackBar}>
            {state.ErrorMessage}
          </Snackbar>
        ) : null}
      </Animatable.View>
    );
  };
  function issaved(url) {
    let r = false;
    state.SavedFeeds.map((item, index) => {
      if (item.url == url) {
        r = true;
      }
    });
    return r;
  }
  function SaveUrl(url, isSaved) {
    if (!isSaved) {
      save_URL({
        token: auth.state.token,
        url: url,
      });
    } else {
      state.SavedFeeds.map((item, index) => {
        if (item.url == url) {
          delete_URL({
            id: item.id,
            token: auth.state.token,
          });
          return;
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <PagerView
        onPageSelected={(e) => {
          if (e.nativeEvent.position < page) {
            if (button != true) {
              setbutton(true);
            }
          } else {
            if (button == true) setbutton(false);
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
            Saveurl={SaveUrl}
          />
        ))}
      </PagerView>
      {!button ? (
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
            style={{
              backgroundColor:
                auth.state.darktheme == "true" ? "#141414" : "white",
            }}
          />
        </Animatable.View>
      ) : (
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
            style={{
              backgroundColor:
                auth.state.darktheme == "true" ? "#141414" : "white",
            }}
            onPress={() => {
              setbutton(false);
              userFeed({ token: auth.state.token });
            }}
          />
        </Animatable.View>
      )}
      {state.ErrorMessage ? (
        <Snackbar visible={true} onDismiss={onDismissSnackBar}>
          {state.ErrorMessage}
        </Snackbar>
      ) : null}
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
