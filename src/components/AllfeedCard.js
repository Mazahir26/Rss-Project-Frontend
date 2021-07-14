import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export default function feedcard({ title, Url }) {
  const { colors } = useTheme();
  return (
    <Card style={{ backgroundColor: colors.accent, margin: 10 }} elevation={4}>
      <View style={{ margin: 5, marginHorizontal: 10 }}>
        <Title style={{ color: colors.textc }}>{title}</Title>
        <Paragraph style={{ color: colors.textc }}>{Url}</Paragraph>
      </View>
    </Card>
  );
}
