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
      return { token: null, onBoarded: true };
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
    dispatch({ type: "signout" });
  }
};
const signup =
  (dispatch) =>
  async ({ token }) => {
    await SecureStore.setItemAsync("token", token);
    dispatch({ type: "signin", payload: token });
  };
const logout =
  (dispatch) =>
  async ({ Token }) => {
    await SecureStore.deleteItemAsync("token", Token);
    dispatch({ type: "signout" });
  };
const OnBoarded = (dispatch) => () => {
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
  { OnBoarded, logout, signup, tryLocalSignin, toggledarktheme },
  { token: "", onBoarded: null, darktheme: "true" }
);
