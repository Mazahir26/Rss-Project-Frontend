import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
export default function card({ title, content, imageurl, author }) {
  const { colors } = useTheme();
  return (
    <Card style={{ backgroundColor: colors.bg }} theme={{ roundness: 0 }}>
      <Card.Content>
        <Card style={{ backgroundColor: colors.accent }} elevation={4}>
          <Card.Cover source={{ uri: imageurl }} resizeMode="cover" />
          <Card.Content style={{ height: 370 }}>
            <Title style={{ color: colors.textc }}>{title}</Title>
            <Paragraph style={{ color: colors.textc }} numberOfLines={13}>
              {content}
            </Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Paragraph style={{ fontWeight: "bold", color: colors.textc }}>
              {author}
            </Paragraph>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={() => console.log("OKK")}
              >
                <MaterialIcons name="save-alt" size={24} color={colors.textc} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={() => console.log("OKK")}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color={colors.textc}
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  );
}

// {/* <Card elevation={4} style={{marginTop: 10}}>
//   <Card.Content style={{flexDirection: "row", justifyContent: "space-between"}}>
//     <Paragraph style={{fontWeight: "bold"}}>{author}</Paragraph>
//     <MaterialCommunityIcons name="share-variant" size={24} color="black" />
//   </Card.Content>
// </Card> */}
