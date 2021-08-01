import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useTheme } from "react-native-paper";
import Loader from "../components/Loading";
import Empty from "../components/Empty";

export default function feed({ navigation, route, parseurl }) {
  const { colors } = useTheme();
  const [data, setData] = useState(null);
  useEffect(() => {
    parseurl(route.params.feed)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  // console.log(route.params);

  return (
    <View style={{ flex: 1 }}>
      {data == null ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={() => (
            <Empty
              heading="Can't Load the feed"
              subheading="Something is wrong."
            />
          )}
          ListHeaderComponent={() => (
            <View style={{ marginVertical: 25, alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: colors.textc,
                }}
              >
                {route.params.name}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => {
            let date = new Date(item.date).toDateString();
            return (
              <View style={{ marginHorizontal: 15 }}>
                <Card style={{ backgroundColor: colors.accent }}>
                  <Card.Cover
                    source={{ uri: item.imageurl }}
                    resizeMode="cover"
                  />
                  <Card.Title
                    titleStyle={{ color: colors.textc }}
                    title={item.title}
                  />
                  <Card.Content>
                    <Paragraph style={{ color: colors.textc }}>
                      {item.description}
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
                      style={{ fontWeight: "bold", color: colors.textc }}
                    >
                      {date}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
