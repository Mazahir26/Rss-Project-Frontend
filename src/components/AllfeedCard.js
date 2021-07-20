import React, { useState, useEffect } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";

export default function feedcard({ title, Url, isSubscribed, Subscribe, id }) {
  const [Subscribed, setSubscribed] = useState(isSubscribed);
  const { colors } = useTheme();
  return (
    <Animatable.View animation="fadeInDown" duration={300}>
      <Card
        style={{ backgroundColor: colors.accent, margin: 10 }}
        elevation={4}
      >
        <View style={{ margin: 5, marginHorizontal: 10, flexDirection: "row" }}>
          <View style={{ flex: 0.9, marginRight: 12 }}>
            <Title style={{ color: colors.textc }}>{title}</Title>
            <Paragraph numberOfLines={1} style={{ color: colors.textc }}>
              {Url}
            </Paragraph>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (Subscribed) {
                Subscribe(id, false)
                  .then((res) => setSubscribed(false))
                  .catch((err) => console.log(err));
              } else {
                Subscribe(id, true)
                  .then((res) => setSubscribed(true))
                  .catch((err) => console.log(err));
              }
            }}
          >
            <MaterialIcons
              name={Subscribed ? "remove" : "add"}
              size={24}
              color={colors.textc}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </Animatable.View>
  );
}
