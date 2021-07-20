import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Cardfeed from "../components/AllfeedCard";
import Constants from "expo-constants";
import { Searchbar } from "react-native-paper";

export default function allFeed({ data, userfeed, Subscribe }) {
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

  function sub(url) {
    for (let i = 0; i < userfeed.length; i++) {
      if (userfeed[i].feed == url) {
        return true;
      }
    }
    return false;
  }
  return (
    <View style={styles.container}>
      <Searchbar
        style={{ marginHorizontal: 10 }}
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
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Constants.statusBarHeight || 15) + 5,
  },
});
