import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Share,
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";
import { Context } from "../Context/AuthContext";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();

export default function profile({ savedUrls }) {
  const { state, toggledarktheme, logout } = useContext(Context);
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
              name={abexpand ? "chevron-down" : "users"}
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
              name={ppexpand ? "chevron-down" : "database"}
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
        console.log(error.message);
      }
    };
    return (
      <View>
        <FlatList
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
          data={savedUrls}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            return (
              <Card
                onPress={() => onShare(item)}
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
                  <Title numberOfLines={1} style={{ color: colors.textc }}>
                    {item.length > 25 ? item.substring(0, 25) + "..." : item}
                  </Title>
                  <Feather name="share" size={22} color={colors.textc} />
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
