import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";
import { Context } from "../Context/AuthContext";
import { Card, Title, Paragraph } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();

export default function profile({ savedUrls }) {
  const { state, toggledarktheme, logout } = useContext(Context);
  const [loading, setloading] = useState(true);
  const { colors } = useTheme();
  useEffect(() => {
    setloading(false);
  }, []);
  function profile() {
    return (
      <View style={styles.container}>
        <Text style={[styles.heading, { color: colors.textc }]}>
          My Profile
        </Text>
        <Card
          onPress={() => {
            if (loading == true) return;
            setloading(true);
            if (state.darktheme == "false") {
              toggledarktheme({ theme: "true" });
            } else toggledarktheme({ theme: "false" });
          }}
          style={{ backgroundColor: colors.accent }}
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
            <Feather name="sun" size={24} color={colors.textc} />
          </View>
        </Card>
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Constants.statusBarHeight || 15) + 5,
    marginHorizontal: 10,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 35,
    marginLeft: 10,
    marginBottom: 55,
  },
});
