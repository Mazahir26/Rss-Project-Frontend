import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import Cardfeed from "../components/AllfeedCard";
import Constants from "expo-constants";
import { Searchbar } from "react-native-paper";

export default function allFeed({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  if (data == null) {
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
      <Searchbar
        style={{ marginHorizontal: 10 }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        keyExtractor={({ item, index }) => `${index}`}
        data={data}
        renderItem={({ item, index }) => {
          return <Cardfeed title={item.name} Url={item.feed} />;
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
