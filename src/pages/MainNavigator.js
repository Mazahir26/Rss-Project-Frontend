import React, { useContext, useState, useEffect } from "react";
import Home from "./HomeScreen";
import AllFeed from "./allFeedsScreen";
import Profile from "./ProfileScreen";
import { View, Text } from "react-native";
import { Context } from "../Context/AuthContext";
import { Context as DataContext } from "../Context/MainDataContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as rssParser from "react-native-rss-parser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

function getParsedFeed(Url) {
  return fetch(Url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      let length = 0;
      if (rss.items.length > 5) length = 5;
      else length = rss.items.length;
      let data = [];
      const regex = /(<([^>]+)>)/gi;
      const regex2 = /^\s*$(?:\r\n?|\n)/gm;
      for (let i = 0; i < length; i++) {
        const mainimageurl = rss.image.url;
        const author = rss.title;
        const title = rss.items[i].title;
        const description = rss.items[i].description
          // .substring(0, 50)
          .replace(regex, "");
        const catagory = rss.items[i].categories[0]
          ? rss.items[i].categories[0].name == "Uncategorized"
            ? rss.items[i].title.substring(0, 15)
            : rss.items[i].categories[0].name
          : "news";
        const content = rss.items[i].content
          ? rss.items[i].content
              .substring(0, 1500)
              .replace(regex, "")
              .replace(regex2, "")
          : rss.items[i].description.replace(regex, "").replace(regex2, "");
        const url = rss.items[i].id;
        const imageurl = rss.items[i].imageUrl
          ? rss.items[i].imageUrl
          : `https://source.unsplash.com/weekly?${catagory}`;
        const date = rss.items[i].published;
        data.push({
          title,
          description,
          content,
          url,
          imageurl,
          date,
          author,
          mainimageurl,
        });
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export default function Main({ navigation }) {
  const { state } = useContext(Context);
  const MainC = useContext(DataContext);
  const { colors } = useTheme();

  //makeuserfeed
  useEffect(() => {
    MainC.userFeed({ token: state.token });
    MainC.savedFeeds({ token: state.token });
    MainC.allFeeds();
  }, []);

  function allfeed() {
    return <AllFeed parseurl={getParsedFeed} />;
  }
  if (
    MainC.state.UserFeed == null ||
    MainC.state.AllFeeds == null ||
    MainC.state.SavedFeeds == null
  ) {
    return (
      <>
        <StatusBar hidden={true} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.accent,
          }}
        >
          <LottieView
            source={require("../assets/loading.json")}
            autoPlay
            loop
          ></LottieView>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style={state.darktheme == "true" ? "light" : "dark"} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ showLabel: false }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
          name="allfeed"
          component={allfeed}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
