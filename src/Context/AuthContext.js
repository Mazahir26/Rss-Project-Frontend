import createDataContext from "./createDataContext";
import * as SecureStore from "expo-secure-store";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { token: action.payload, onBoarded: true };
    case "signout":
      return { token: null, onBoarded: true };
    case "OnBoarded":
      return { ...state, onBoarded: true };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  let token = await SecureStore.getItemAsync("token");
  console.log(token);
  if (token) {
    dispatch({ type: "signin", payload: token });
  }else {
    dispatch({ type: "signout" });
  }
};
const signup =
  (dispatch) =>
  async ({ token }) => {
    await SecureStore.setItemAsync("token", token);
    console.log(token);
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
export const { Provider, Context } = createDataContext(
  authReducer,
  { OnBoarded, logout, signup, tryLocalSignin },
  { token: "", onBoarded: null }
);
