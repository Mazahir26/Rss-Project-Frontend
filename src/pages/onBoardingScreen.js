import React, { useContext, useState, useRef } from "react";
import PagerView from "react-native-pager-view";
import {
  TouchableOpacity,
  View,
  Text,
  UIManager,
  Image,
  Dimensions,
  LayoutAnimation,
  Platform,
} from "react-native";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Context } from "../Context/AuthContext";
import { Card } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Pages({ heading, content, index }) {
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
      }}
    >
      <Card style={{ height: windowHeight }}>
        <Image
          style={{
            height: windowHeight - windowHeight * 0.4,
            width: "100%",
            margin: 5,
          }}
          source={
            index == 1
              ? require(`../assets/onb_0.png`)
              : index == 2
              ? require(`../assets/onb_1.png`)
              : index == 3
              ? require(`../assets/onb_2.png`)
              : require(`../assets/onb_3.png`)
          }
          resizeMode="center"
        />
        <Card
          elevation={0}
          theme={{ roundness: 0 }}
          style={{
            height: windowHeight - windowHeight * 0.15,
            marginHorizontal: 10,
          }}
        >
          <Card.Content>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginVertical: 10,
                textAlign: "center",
                fontFamily: "Inter_600SemiBold",
              }}
            >
              {heading}
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                fontFamily: "Inter_400Regular",
              }}
            >
              {content}
            </Text>
          </Card.Content>
        </Card>
      </Card>
    </View>
  );
}

export default function onBoard() {
  const { state, OnBoard } = useContext(Context);
  const [page, setPage] = useState(0);
  const swiper = useRef(null);

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <View></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={swiper}
        initialPage={0}
        style={{ height: "90%", width: "100%" }}
        orientation="horizontal"
        onPageSelected={(e) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setPage(e.nativeEvent.position);
        }}
      >
        <Pages
          heading="F-Reads"
          content="Stay up to date with Freads, Get article and news from all your favorite websites."
          index={1}
        />
        <Pages
          heading="One account, Many devices"
          content="Synced feeds on all your devices anywhere in the world, and there is no limit on number of devices as well. "
          index={2}
        />
        <Pages
          heading="How much does it cost?"
          content="Nothing! its free, open source, and add-free. No hiddden charge or subscription. its free forever "
          index={3}
        />
        <Pages
          heading="So, What are you waiting for?"
          content="Yeah, there are lot more features and everything is free, So worth a shot!"
          index={4}
        />
      </PagerView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {page > 0 ? (
          <Animatable.View animation="fadeInUp">
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderColor: "#2365BB",
                borderRadius: 8,
                borderWidth: 1.5,
                alignItems: "center",
              }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setPage(page - 1);
                swiper.current.setPage(page - 1);
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="black"
              />
              <Text
                style={{
                  marginRight: 10,
                  marginVertical: 6,
                  fontSize: 16,
                  color: "black",
                  fontFamily: "Inter_400Regular",
                }}
              >
                BACK
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : null}

        {page > 0 && page != 3 ? (
          <Animatable.View animation="fadeInUp">
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                swiper.current.setPage(3);
                setPage(3);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontFamily: "Inter_400Regular",
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
        {page == 3 ? null : (
          <Animatable.View animation="fadeInUp">
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setPage(page + 1);
                swiper.current.setPage(page + 1);
              }}
            >
              <Text
                style={{
                  marginVertical: 8,
                  fontSize: 16,
                  color: "black",
                  fontFamily: "Inter_400Regular",
                }}
              >
                NEXT
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
        {page == 3 ? (
          <Animatable.View animation="fadeInUp">
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderColor: "#2365BB",
                borderRadius: 8,
                borderWidth: 1.5,
                alignItems: "center",
              }}
              onPress={() => {
                OnBoard();
              }}
            >
              <Text
                style={{
                  marginHorizontal: 15,
                  marginVertical: 6,
                  fontSize: 16,
                  color: "black",
                  fontFamily: "Inter_400Regular",
                }}
              >
                SIGNUP
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
      </View>
    </View>
  );
}
