import createDataContext from "./createDataContext";
import {
  getUserFeed,
  MakeUserfeed,
  getAllFeed,
  getUserSavedfeed,
  saveUrl,
  deleteUrl,
  Subscribe,
  UnSubscribe,
  AddFeed,
} from "../components/HelperFun";

const DataReducer = (state, action) => {
  switch (action.type) {
    case "get_user_feed":
      return {
        ...state,
        UserFeed: action.payload.data,
        UserLinks: action.payload.ufeed,
      };
    case "get_all_feed":
      return {
        ...state,
        AllFeeds: action.payload,
      };
    case "get_saved_feed":
      return {
        ...state,
        SavedFeeds: action.payload,
      };
    case "save_url":
      return {
        ...state,
        SavedFeeds: [...state.SavedFeeds, action.payload],
      };
    case "update_allfeeds":
      return {
        ...state,
        AllFeeds: [...state.AllFeeds, action.payload],
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
        SavedFeeds: [],
      };
    case "updateMessage":
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case "ClearMessage":
      return {
        ...state,
        ErrorMessage: null,
      };
    case "refresh_Feeds":
      return {
        ...state,
        UserLinks: action.payload.userlinks,
        AllFeeds: action.payload.allfeeds,
      };
    default:
      return state;
  }
};

const refresh_feeds =
  (dispatch) =>
  async ({ token }) => {
    const ufeed = await getUserFeed(token);
    if (ufeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    }
    const allfeeed = await getAllFeed();
    if (allfeeed == null) {
      dispatch({ type: "setmessage", payload: "Oops! Something went wrong." });
      return;
    } else {
      dispatch({
        type: "refresh_Feeds",
        payload: { userlinks: ufeed, allfeeds: allfeeed },
      });
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

const Add_feed =
  (dispatch) =>
  async ({ token, url, name }) => {
    const ufeed = await AddFeed(name, url, token);
    if (ufeed == "du") {
      dispatch({
        type: "updateMessage",
        payload: "Oops! This feed already exists",
      });
      return;
    }
    if (ufeed == "In") {
      dispatch({
        type: "updateMessage",
        payload: "Invalid Url",
      });
      return;
    }
    if (ufeed == null) {
      dispatch({
        type: "updateMessage",
        payload: "Oops! Something went wrong.",
      });
      return;
    }
    dispatch({ type: "update_allfeeds", payload: ufeed });
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
const clearmess = (dispatch) => () => {
  dispatch({ type: "ClearMessage" });
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
    console.log("Context 99");
    if (ufeed == null) {
      console.log("Context 101");
      dispatch({
        type: "updateMessage",
        payload: "Oops! Something went wrong.",
      });
    }
  };

const delete_URL =
  (dispatch) =>
  async ({ token, id }) => {
    const ufeed = await deleteUrl(id, token);
    if (ufeed == null) {
      dispatch({
        type: "updateMessage",
        payload: "Oops! Something went wrong.",
      });
    }
  };

const SubscribeFeed =
  (dispatch) =>
  async ({ token, id }) => {
    const ufeed = await Subscribe(id, token);
    if (ufeed == null) {
      dispatch({
        type: "updateMessage",
        payload: "Oops! Something went wrong.",
      });
    }
  };

const UnSubscribeFeed =
  (dispatch) =>
  async ({ token, id }) => {
    const ufeed = await UnSubscribe(id, token);
    if (ufeed == null) {
      dispatch({
        type: "updateMessage",
        payload: "Oops! Something went wrong.",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  DataReducer,
  {
    userFeed,
    allFeeds,
    savedFeeds,
    save_URL,
    delete_URL,
    SubscribeFeed,
    UnSubscribeFeed,
    Add_feed,
    clearmess,
    refresh_feeds,
  },
  {
    UserLinks: null,
    UserFeed: null,
    ErrorMessage: null,
    AllFeeds: null,
    SavedFeeds: null,
  }
);
