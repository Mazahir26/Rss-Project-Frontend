import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Cardfeed from "../components/AllfeedCard";
import Constants from "expo-constants";
import { Searchbar, FAB, Snackbar } from "react-native-paper";
import SingleFeed from "./SingleFeedPage";
import CreateFeed from "./CreateFeed";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";
import * as Animatable from "react-native-animatable";

const Stack = createNativeStackNavigator();

export default function allFeed({ parseurl }) {
  const { colors } = useTheme();
  const { state, SubscribeFeed, UnSubscribeFeed, allFeeds, clearmess } =
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
    const [fabexpanded, setfabexpanded] = useState(false);
    const onDismissSnackBar = () => clearmess();
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
          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateFeed")}
                style={{ margin: 15, alignItems: "center" }}
              >
                <Text style={{ fontSize: 25, color: colors.textc }}>+</Text>
              </TouchableOpacity>
            );
          }}
          onRefresh={() => {
            allFeeds();
            setRefreshing(true);
          }}
          refreshing={Refreshing}
          keyExtractor={(item, index) => `${index}`}
          data={Feeds}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View animation="fadeInLeftBig" delay={50 * index}>
                <Cardfeed
                  title={item.name}
                  Url={item.feed}
                  isSubscribed={sub(item.feed)}
                  Subscribe={cSubscribe}
                  id={item.id}
                  onPress={() => navigation.navigate("feed", item)}
                />
              </Animatable.View>
            );
          }}
        />
        <FAB
          style={styles.fab}
          label={fabexpanded ? "Add Feed" : null}
          icon="playlist-plus"
          onPress={() => navigation.navigate("CreateFeed")}
          onLongPress={() => setfabexpanded(!fabexpanded)}
          color={colors.primary}
        />
        {state.ErrorMessage ? (
          <Snackbar visible={true} onDismiss={onDismissSnackBar}>
            {state.ErrorMessage}
          </Snackbar>
        ) : null}
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
      <Stack.Screen
        options={{
          title: "Create Feed",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
        name="CreateFeed"
        component={CreateFeed}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Constants.statusBarHeight || 15) + 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
