import { youtube_token } from "../../config.json";
import { google } from "googleapis";
const youtube = google.youtube({ version: "v3", auth: youtube_token });

async function googleSearch(query: string) {
  const data = await youtube.search
    .list({
      part: ["id"],
      q: query,
      type: ["video"],
    })
    .then((res) => {
      return res.data;
    });
  if (data.items) {
    return data.items[0].id?.videoId ?? null;
  }
  return null;
}

export default googleSearch;
