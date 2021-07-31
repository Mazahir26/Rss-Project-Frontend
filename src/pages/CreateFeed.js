import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";
import { useTheme, TextInput, Button } from "react-native-paper";

export default function CreateFeed({ navigation }) {
  const { colors } = useTheme();
  const { state } = useContext(Context);
  const auth = useContext(Auth);

  const [Name, setName] = useState(null);
  const [Url, setUrl] = useState(null);

  const clearall = () => {
    setName(null);
    setUrl(null);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          theme={{ roundness: 5 }}
          label="Name"
          value={Name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          theme={{ roundness: 5 }}
          value={Url}
          onChangeText={(text) => setUrl(text)}
          placeholder="Url"
          label="Feed"
        />
      </View>
      <View
        style={{
          marginHorizontal: "30%",
          marginVertical: 10,
        }}
      >
        <Button
          mode="contained"
          style={{ margin: 10 }}
          onPress={() => console.log("Pressed")}
        >
          Save
        </Button>
        <Button
          mode="outlined"
          style={{ margin: 10 }}
          onPress={() => clearall()}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputLable: {
    fontSize: 20,
  },
});
