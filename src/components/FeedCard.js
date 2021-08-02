import React, { useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Share, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function card({
  title,
  content,
  imageurl,
  author,
  isSaved,
  Saveurl,
  url,
}) {
  const { colors } = useTheme();
  const [Saved, setSaved] = useState(isSaved);

  const onShare = async () => {
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
    <Card
      style={{
        backgroundColor: colors.bg,
      }}
      theme={{ roundness: 0 }}
    >
      <Card.Content>
        <Card
          style={{
            backgroundColor: colors.accent,
            height: windowHeight - (windowHeight * 0.125),
          }}
          elevation={4}
        >
          <Card.Cover source={{ uri: imageurl }} resizeMode="cover" />
          <Card.Content style={{ height: windowHeight/1.92 }}>
            <Title style={{ color: colors.textc }}>{title}</Title>
            <Paragraph style={{ color: colors.textc }} numberOfLines={12}>
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
            <Paragraph
              numberOfLines={1}
              style={{ fontWeight: "bold", color: colors.textc }}
            >
              {author.substring(0, 25) + (author.length > 25 ? "..." : "")}
            </Paragraph>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 7, margin: 5 }}
                onPress={() => {
                  // Saveurl(url).then((res) => {
                  //   setSaved(true);
                  // });
                  Saveurl(url, Saved);
                  setSaved(!Saved);
                }}
              >
                <MaterialIcons
                  name={Saved ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={Saved ? colors.primary : colors.textc}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 7, margin: 5 }}
                onPress={onShare}
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
