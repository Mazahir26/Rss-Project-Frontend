import createDataContext from "./createDataContext";
import {
  getUserFeed,
  MakeUserfeed,
  getAllFeed,
  getUserSavedfeed,
  saveUrl,
  deleteUrl,
} from "../components/HelperFun";

const DataReducer = (state, action) => {
  switch (action.type) {
    case "get_user_feed":
      console.log("Ok at 14")
      return {
        ...state,
        UserFeed: action.payload.data,
        UserLinks: action.payload.ufeed,
      };
    case "get_all_feed":
      console.log("Ok at 20")
      return {
        ...state,
        AllFeeds: action.payload,
      };
    case "get_saved_feed":
      console.log("Ok at 27")
      return {
        ...state,
        SavedFeeds: action.payload,
      };
    case "save_url":
      return {
        ...state,
        SavedFeeds: [...state.SavedFeeds, action.payload],
      };
    case "delete_url":
      const temp = state.SavedFeeds.map((item, index) => {
        if (item.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        SavedFeeds: temp,
      };
    case "setmessage":
      return {
        ...state,
        ErrorMessage: action.payload,
        UserFeed: [],
        UserLinks: [],
        AllFeeds: [],
        SavedFeeds: []
      };
    default:
      return state;
  }
};

const userFeed =
  (dispatch) =>
  async ({ token }) => {
    const ufeed = await getUserFeed(token);
    if (ufeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    }
    const data = await MakeUserfeed(ufeed);
    dispatch({ type: "get_user_feed", payload: { data, ufeed } });
  };

const allFeeds = (dispatch) => async () => {
  const ufeed = await getAllFeed();
  if (ufeed == null) {
    dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
    return;
  } else {
    dispatch({ type: "get_all_feed", payload: ufeed });
  }
};

const savedFeeds =
  (dispatch) =>
  async ({ token }) => {
    const ufeed = await getUserSavedfeed(token);
    if (ufeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    } else {
      dispatch({ type: "get_saved_feed", payload: ufeed });
    }
  };

const save_URL =
  (dispatch) =>
  async ({ token, url }) => {
    const ufeed = await saveUrl(url, token);
    if (ufeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    } else {
      dispatch({
        type: "save_url",
        payload: { id: ufeed.id, url: ufeed.url },
      });
    }
  };

const delete_URL =
  (dispatch) =>
  async ({ token, id }) => {
    const ufeed = await deleteUrl(id, token);
    if (ufeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    } else {
      dispatch({
        type: "delete_url",
        payload: ufeed.id,
      });
    }
  };

export const { Provider, Context } = createDataContext(
  DataReducer,
  { userFeed, allFeeds, savedFeeds, save_URL, delete_URL },
  {
    UserLinks: null,
    UserFeed: null,
    ErrorMessage: null,
    AllFeeds: null,
    SavedFeeds: null,
  }
);
