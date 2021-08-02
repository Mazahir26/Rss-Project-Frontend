import createDataContext from "./createDataContext";
import * as SecureStore from "expo-secure-store";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return {
        token: action.payload.token,
        onBoarded: true,
        darktheme: action.payload.darktheme,
      };
    case "signout":
      return { ...state, token: null, onBoarded: true };
    case "logout":
      return { ...state, token: null };
    case "OnBoarded":
      return { ...state, onBoarded: true };
    case "toggledarktheme":
      return { ...state, darktheme: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  let token = await SecureStore.getItemAsync("token");
  if (token) {
    let darktheme = await SecureStore.getItemAsync("darktheme");
    if (darktheme) {
      dispatch({ type: "signin", payload: { token, darktheme } });
    } else {
      dispatch({ type: "signin", payload: { token, darktheme: "true" } });
    }
  } else {
    dispatch({ type: "logout" });
  }
};
const signup =
  (dispatch) =>
  async ({ token }) => {
    await SecureStore.setItemAsync("token", token);
    dispatch({ type: "signin", payload: { token, darktheme: "false" } });
  };
const logout =
  (dispatch) =>
  async ({ Token }) => {
    await SecureStore.deleteItemAsync("token", Token);
    dispatch({ type: "signout" });
  };
const OnBoard = (dispatch) => () => {
  dispatch({ type: "OnBoarded" });
};
const toggledarktheme =
  (dispatch) =>
  async ({ theme }) => {
    await SecureStore.setItemAsync("darktheme", theme);
    dispatch({ type: "toggledarktheme", payload: theme });
  };
export const { Provider, Context } = createDataContext(
  authReducer,
  { OnBoard, logout, signup, tryLocalSignin, toggledarktheme },
  { token: "", onBoarded: false, darktheme: "true" }
);
