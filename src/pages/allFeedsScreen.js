import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Cardfeed from "../components/AllfeedCard";
import Constants from "expo-constants";
import { Searchbar } from "react-native-paper";
import SingleFeed from "./SingleFeedPage";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";

const Stack = createNativeStackNavigator();

export default function allFeed({ parseurl }) {
  const { colors } = useTheme();
  const { state, SubscribeFeed, UnSubscribeFeed, allFeeds } =
    useContext(Context);
  const auth = useContext(Auth);

  function feed({ navigation, route }) {
    return (
      <SingleFeed navigation={navigation} route={route} parseurl={parseurl} />
    );
  }
  function sub(url) {
    for (let i = 0; i < state.UserLinks.length; i++) {
      if (state.UserLinks[i].feed == url) {
        return true;
      }
    }
    return false;
  }

  function allfeed({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [Feeds, setFeeds] = useState(state.AllFeeds);
    const [Refreshing, setRefreshing] = useState(false);
    useEffect(() => {
      setRefreshing(false);
    }, []);
    const onChangeSearch = (query) => setSearchQuery(query);
    function cSubscribe(id, t) {
      if (t) {
        SubscribeFeed({ token: auth.state.token, id: id });
      } else {
        UnSubscribeFeed({ token: auth.state.token, id: id });
      }
    }
    useEffect(() => {
      if (!Feeds) return;
      let temdata = [];
      state.AllFeeds.map((item, index) => {
        let t = item.feed.toLowerCase();
        let l = item.name.toLowerCase();
        if (t.includes(searchQuery.toLowerCase()) > 0) {
          temdata.push(item);
        } else if (l.includes(searchQuery.toLowerCase()) > 0) {
          temdata.push(item);
        }
      });
      setFeeds(temdata);
    }, [searchQuery]);
    return (
      <View style={styles.container}>
        <Searchbar
          placeholderTextColor={colors.textc}
          inputStyle={{ color: colors.textc }}
          iconColor={colors.textc}
          style={{ marginHorizontal: 10, backgroundColor: colors.accent }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <FlatList
          onRefresh={() => {
            allFeeds();
            setRefreshing(true);
          }}
          refreshing={Refreshing}
          keyExtractor={(item, index) => `${index}`}
          data={Feeds}
          renderItem={({ item, index }) => {
            return (
              <Cardfeed
                title={item.name}
                Url={item.feed}
                isSubscribed={sub(item.feed)}
                Subscribe={cSubscribe}
                id={item.id}
                onPress={() => navigation.navigate("feed", item)}
              />
            );
          }}
        />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="allfeed"
        component={allfeed}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.name ? route.params.name : "Feed",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        })}
        name="feed"
        component={feed}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Constants.statusBarHeight || 15) + 5,
  },
});
