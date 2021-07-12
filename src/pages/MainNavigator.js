import React, { useContext, useState, useEffect } from "react";
import Home from "./HomeScreen";
import { View, Text } from "react-native";
import { Context } from "../Context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "../api/api_axios";
import * as rssParser from "react-native-rss-parser";

const Tab = createBottomTabNavigator();

function Test1() {
  return (
    <View>
      <Text>TEST</Text>
    </View>
  );
}

function getParsedFeed(Url) {
  return fetch(Url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      let data = [];
      const regex = /(<([^>]+)>)/gi;
      for (let i = 0; i < rss.items.length; i++) {
        const mainimageurl = rss.image.url;
        const author = rss.title;
        const title = rss.items[i].title;
        const description = rss.items[i].description
          // .substring(0, 50)
          .replace(regex, "");
        const content = rss.items[i].content
          ? rss.items[i].content.substring(0, 1500).replace(regex, "")
          : rss.items[i].description.replace(regex, "");
        const url = rss.items[i].id;
        const imageurl = rss.items[i].imageUrl ? rss.items[i].imageUrl : null;
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
function Date_sortFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA < dateB ? 1 : -1;
}
async function MakeUserfeed(Links) {
  let data = [];
  for (let i = 0; i < Links.length; i++) {
    const res = await getParsedFeed(Links[i]);
    data = data.concat(res);
  }
  // data.splice(0, 10);
  data.sort(Date_sortFunction);
  return data;
}

function getUserFeed(token) {
  if (!token) return null;
  return axios
    .get("/userfeed", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        console.log(err.response.data.error);
        return null;
      } else {
        console.log(err);
        return null;
      }
    });
}

export default function Main({ navigation }) {
  const { logout, state } = useContext(Context);
  const [Data, setData] = useState(null);
  const tempfeed = [
    "https://techwiser.com/feed/",
    "https://blog.logrocket.com/rss",
    "https://gadgets.ndtv.com/rss/feeds",
  ];
  useEffect(() => {
    // getUserFeed(state.token).then((res) => {
    //   if (res != null) {
    //     MakeUserfeed(tempfeed).then((res) => {
    //       setData(res);
    //     });
    //   }
    // });
    MakeUserfeed(tempfeed).then((res) => {
      setData(res);
    });
  }, []);

  function home() {
    return <Home data={Data} />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={home} />
      <Tab.Screen name="TEST" component={Test1} />
    </Tab.Navigator>
  );
}
