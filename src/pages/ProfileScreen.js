import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Share,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";
import { Context } from "../Context/AuthContext";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { Context as Main } from "../Context/MainDataContext";

const Stack = createNativeStackNavigator();

export default function profile() {
  const { state, toggledarktheme, logout } = useContext(Context);
  const MainC = useContext(Main);

  const [loading, setloading] = useState(true);
  const [ppexpand, setppexpand] = useState(false);
  const [abexpand, setabexpand] = useState(false);

  const { colors } = useTheme();
  useEffect(() => {
    setloading(false);
  }, []);
  function profile({ navigation }) {
    if (loading) {
      return (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator size={45} animating={true} color="#2365BB" />
        </View>
      );
    }
    function navi() {
      navigation.navigate("Saved");
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.heading, { color: colors.textc }]}>
          My Profile
        </Text>
        <Card
          elevation={6}
          onPress={() => {
            if (loading == true) return;
            setloading(true);
            if (state.darktheme == "false") {
              toggledarktheme({ theme: "true" });
            } else toggledarktheme({ theme: "false" });
          }}
          style={{
            backgroundColor: colors.accent,
            marginBottom: 20,
            marginHorizontal: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
              alignItems: "center",
            }}
          >
            <View>
              <Title style={{ color: colors.textc }}>Theme</Title>
              <Paragraph style={{ color: colors.textc }}>
                Change the look and feel
              </Paragraph>
            </View>
            <Feather
              name={state.darktheme == "true" ? "sun" : "moon"}
              size={27}
              color={colors.textc}
            />
          </View>
        </Card>
        <Card
          elevation={6}
          style={{
            backgroundColor: colors.accent,
            marginBottom: 20,
            marginHorizontal: 8,
          }}
          onPress={navi}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
              alignItems: "center",
            }}
          >
            <View>
              <Title style={{ color: colors.textc }}>Saved</Title>
              <Paragraph style={{ color: colors.textc }}>
                Tap to check them out
              </Paragraph>
            </View>
            <Feather name="chevron-right" size={27} color={colors.textc} />
          </View>
        </Card>
        <Card
          elevation={6}
          style={{
            backgroundColor: colors.accent,
            marginBottom: 20,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setabexpand(!abexpand);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
              alignItems: "center",
            }}
          >
            <View>
              <Title style={{ color: colors.textc }}>About Us</Title>
              {!abexpand ? (
                <Paragraph style={{ color: colors.textc }}>
                  Tap to expand
                </Paragraph>
              ) : null}
            </View>
            <Feather
              onPress={() => {
                setabexpand(!abexpand);
              }}
              name={abexpand ? "chevron-up" : "users"}
              size={27}
              color={colors.textc}
            />
          </View>
          {abexpand ? (
            <View
              style={{
                margin: 15,
                alignItems: "center",
              }}
            >
              <Paragraph style={{ color: colors.textc }}>
                Helljcdbsvshvjbsdjvdvsdvn sd vjhsdvsdvhsd v dsv sd vsdhvhdbs
              </Paragraph>
            </View>
          ) : null}
        </Card>
        <Card
          elevation={6}
          style={{
            backgroundColor: colors.accent,
            marginBottom: 20,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setppexpand(!ppexpand);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
              alignItems: "center",
            }}
          >
            <View>
              <Title style={{ color: colors.textc }}>Privacy policy</Title>
              {!ppexpand ? (
                <Paragraph style={{ color: colors.textc }}>
                  Tap to expand
                </Paragraph>
              ) : null}
            </View>
            <Feather
              onPress={() => {
                setppexpand(!ppexpand);
              }}
              name={ppexpand ? "chevron-up" : "file-text"}
              size={27}
              color={colors.textc}
            />
          </View>
          {ppexpand ? (
            <View
              style={{
                margin: 15,
                alignItems: "center",
              }}
            >
              <Paragraph style={{ color: colors.textc }}>
                We don't know what to say here, but it looks cool.{"\n"}
                Anyways about your data, we are broke and can't afford to store
                your data unless its necessary. so yeah we respect your privacy
                :)
              </Paragraph>
            </View>
          ) : null}
        </Card>
        <Card
          elevation={6}
          style={{
            backgroundColor: colors.accent,
            marginBottom: 20,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setloading(true);
            logout(state.token);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
              alignItems: "center",
            }}
          >
            <Title style={{ color: colors.textc }}>Logout</Title>
            <Feather name="power" size={27} color={"tomato"} />
          </View>
        </Card>
      </ScrollView>
    );
  }
  function Saved({ navigation }) {
    const [Refreshing, setRefreshing] = useState(false);
    useEffect(() => {
      setRefreshing(false);
    }, []);
    const onShare = async (url) => {
      try {
        const result = await Share.share({
          message: url,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Savedloading;
        console.log(error.message);
      }
    };
    if (MainC.state.SavedFeeds == null) {
      return (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator size={45} animating={true} color="#2365BB" />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          onRefresh={() => {
            MainC.savedFeeds({ token: state.token });
            setRefreshing(true);
          }}
          refreshing={Refreshing}
          ListHeaderComponent={() => (
            <Text
              style={{
                color: colors.textc,
                textAlign: "center",
                fontSize: 35,
                marginVertical: 15,
              }}
            >
              Saved Feeds
            </Text>
          )}
          data={MainC.state.SavedFeeds}
          keyExtractor={(item) => item.url}
          renderItem={({ item, index }) => {
            return (
              <Card
                elevation={6}
                style={{
                  backgroundColor: colors.accent,
                  marginBottom: 10,
                  marginHorizontal: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Title
                    numberOfLines={1}
                    style={{ fontSize: 18, color: colors.textc }}
                  >
                    {item.url.length > 25
                      ? item.url.substring(0, 25) + "..."
                      : item.url}
                  </Title>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Feather
                      onPress={() => (Refreshing ? {} : onShare(item.url))}
                      name="share-2"
                      size={22}
                      style={{ marginHorizontal: 6 }}
                      color={colors.textc}
                    />
                    <Feather
                      onPress={() => {
                        if (Refreshing) return;
                        MainC.delete_URL({ token: state.token, id: item.id });
                        setRefreshing(true);
                        MainC.savedFeeds({ token: state.token });
                      }}
                      name="delete"
                      size={24}
                      style={{ marginHorizontal: 6 }}
                      color={colors.textc}
                    />
                  </View>
                </View>
              </Card>
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
        name="profile"
        component={profile}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="Saved"
        component={Saved}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Constants.statusBarHeight || 15) + 5,
  },
  heading: {
    fontSize: 35,
    marginLeft: 20,
    marginBottom: 55,
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
