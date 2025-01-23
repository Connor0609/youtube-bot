"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../../config.json");
const googleapis_1 = require("googleapis");
const youtube = googleapis_1.google.youtube({ version: "v3", auth: config_json_1.youtube_token });
async function googleSearch(query) {
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
exports.default = googleSearch;
