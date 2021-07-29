import * as rssParser from "react-native-rss-parser";
import axios from "../api/api_axios";

export function getParsedFeed(Url, num = 5) {
  return fetch(Url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      let length = 0;
      if (rss.items.length > num) length = num;
      else length = rss.items.length;
      let data = [];
      const regex = /(<([^>]+)>)/gi;
      const regex2 = /^\s*$(?:\r\n?|\n)/gm;
      for (let i = 0; i < length; i++) {
        const mainimageurl = rss.image.url;
        const author = rss.title;
        const title = rss.items[i].title;
        const description = rss.items[i].description
          // .substring(0, 50)
          .replace(regex, "");
        const catagory = rss.items[i].categories[0]
          ? rss.items[i].categories[0].name == "Uncategorized"
            ? rss.items[i].title.substring(0, 15)
            : rss.items[i].categories[0].name
          : "news";
        const content = rss.items[i].content
          ? rss.items[i].content
              .substring(0, 1500)
              .replace(regex, "")
              .replace(regex2, "")
          : rss.items[i].description.replace(regex, "").replace(regex2, "");
        const url = rss.items[i].id;
        const imageurl = rss.items[i].imageUrl
          ? rss.items[i].imageUrl
          : `https://source.unsplash.com/weekly?${catagory}`;
        const date = rss.items[i].published;
        data.push({
          title,
          description,
          content,
          url,
          imageurl,
          date,
          author,
          mainimageurl,
        });
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export function getUserFeed(token) {
  if (!token) return null;
  return axios
    .get("/userfeed", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        console.log("Eroor huaa");
        return null;
      } else {
        console.log("Eroor huaa");
        return null;
      }
    });
}

function Date_sortFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA < dateB ? 1 : -1;
}

export async function MakeUserfeed(Links) {
  let data = [];
  for (let i = 0; i < Links.length; i++) {
    const res = await getParsedFeed(Links[i].feed);
    data = data.concat(res);
  }
  data.sort(Date_sortFunction);
  return data;
}

export function getUserSavedfeed(token) {
  if (!token) return null;
  return axios
    .get("/saved", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      let data = [];
      for (let index = 0; index < res.data.length; index++) {
        data.push({
          url: res.data[index].url,
          id: res.data[index].id,
        });
      }
      return data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        return null;
      } else {
        return null;
      }
    });
}

export function getAllFeed() {
  return axios
    .get("/feed")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        return null;
      } else {
        return null;
      }
    });
}

export function saveUrl(url, token) {
  if (!token) return null;
  return axios
    .post(
      "/saved",
      {
        url: url,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        return null;
      } else {
        return null;
      }
    });
}

export function deleteUrl(id, token) {
  if (!token) return null;
  return axios
    .put(
      `/saved/${id}`,
      {},
      {
        headers: {
          Authorization: `Token ${state.token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        return null;
      } else {
        return null;
      }
    });
}
