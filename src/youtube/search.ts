import { youtube_token } from "../../config.json";
async function googleSearch(query: String) {
  gapi.client
    .init({
      apiKey: youtube_token,
    })
    .then(() => {
      return gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/search",
        params: {
          part: "snippet",
          q: query,
          type: "video",
        },
      });
    })
    .then(
      (res) => {
        return res.result.items[0].id.videoId;
      },
      () => {
        return "Error finding videos";
      }
    );
}

export default googleSearch;
