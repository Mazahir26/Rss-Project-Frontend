import React, { useState, useEffect } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function feedcard({
  title,
  Url,
  isSubscribed,
  Subscribe,
  id,
  onPress,
}) {
  const [Subscribed, setSubscribed] = useState(isSubscribed);
  const [loading, setloading] = useState(false);

  const { colors } = useTheme();
  return (
    <View>
      <Card
        style={{ backgroundColor: colors.accent, margin: 10 }}
        elevation={4}
        onPress={onPress}
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
            disabled={loading}
            onPress={() => {
              setloading(true);
              if (Subscribed) {
                Subscribe(id, false);
                setloading(true);
                setloading(true)
                  .then((res) => {
                    setloading(false);
                    setSubscribed(false);
                  })
                  .catch((err) => console.log(err));
              } else {
                Subscribe(id, true)
                  .then((res) => {
                    setloading(false);
                    setSubscribed(true);
                  })
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
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onPress}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.textc}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
