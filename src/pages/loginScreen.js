import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function (props) {
  const [username, setusername] = useState(null);
  return (
    <View style={styles.container}>
      <TextInput
        label="User Name"
        value={username}
        onChangeText={(text) => setusername(text)}
      />
      <Button
        mode="contained"
        onPress={() => console.log("Pressed the button")}
      >Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
