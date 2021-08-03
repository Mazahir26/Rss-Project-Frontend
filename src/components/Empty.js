import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export default function empty({
  heading,
  subheading,
  button,
  onPress,
  or = true,
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, marginHorizontal: 15 }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
        }}
      >
        <LottieView source={require("../assets/Empty.json")} autoPlay loop />
      </View>
      <View style={{ flex: 0.5 }}>
        {heading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: colors.textc, fontSize: 30, textAlign: "center" }}
            >
              {heading.toUpperCase()}
            </Text>
            {subheading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <Text style={{ color: colors.textc, fontSize: 16 }}>
                  {subheading.toUpperCase()}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {or ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <Text style={{ color: colors.textc, fontSize: 16 }}>OR</Text>
          </View>
        ) : null}

        {button ? (
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#eee", fontSize: 18, margin: 10 }}>
                {button.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
