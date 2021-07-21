import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Cardfeed from "../components/AllfeedCard";
import Constants from "expo-constants";
import { Searchbar } from "react-native-paper";
import SingleFeed from "./SingleFeedPage";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();

export default function allFeed({ data, userfeed, Subscribe, parseurl }) {
  const { colors } = useTheme();
  function feed({ navigation, route }) {
    return (
      <SingleFeed navigation={navigation} route={route} parseurl={parseurl} />
    );
  }
  function sub(url) {
    for (let i = 0; i < userfeed.length; i++) {
      if (userfeed[i].feed == url) {
        return true;
      }
    }
    return false;
  }

  function allfeed({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [Feeds, setFeeds] = useState(data);
    const onChangeSearch = (query) => setSearchQuery(query);
    useEffect(() => {
      if (!Feeds) return;
      let temdata = [];
      data.map((item, index) => {
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
          keyExtractor={(item, index) => `${index}`}
          data={Feeds}
          renderItem={({ item, index }) => {
            return (
              <Cardfeed
                title={item.name}
                Url={item.feed}
                isSubscribed={sub(item.feed)}
                Subscribe={Subscribe}
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
