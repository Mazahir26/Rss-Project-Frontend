import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function card({ title, content, imageurl, author }) {
  return (
    <Card>
      <Card.Content>
        <Card elevation={4}>
          <Card.Cover source={{ uri: imageurl }} resizeMode="contain" />
          <Card.Content style={{height: 360}}>
            <Title>{title}</Title>
            <Paragraph numberOfLines={14}>{content}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Paragraph style={{ fontWeight: "bold" }}>{author}</Paragraph>
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
                <MaterialIcons name="save-alt" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={() => console.log("OKK")}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
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
