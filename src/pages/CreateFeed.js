import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Context } from "../Context/MainDataContext";
import { Context as Auth } from "../Context/AuthContext";
import { TextInput, Button, Snackbar } from "react-native-paper";
import Loader from "../components/Loading";

export default function CreateFeed({ navigation }) {
  const { state, Add_feed, clearmess } = useContext(Context);
  const auth = useContext(Auth);

  const onDismissSnackBar = () => clearmess();
  const [Name, setName] = useState(null);
  const [Url, setUrl] = useState(null);
  const [Loading, setLoading] = useState(false);

  const clearall = () => {
    setName(null);
    setUrl(null);
    navigation.navigate("allfeed");
  };
  if (Loading) {
    return <Loader />;
  }

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
          onPress={() => {
            setLoading(true);
            Add_feed({
              token: auth.state.token,
              url: Url,
              name: Name,
            });
          }}
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
      {state.ErrorMessage ? (
        <Snackbar visible={true} onDismiss={onDismissSnackBar}>
          {state.ErrorMessage}
        </Snackbar>
      ) : null}
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
