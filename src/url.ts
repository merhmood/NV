export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://api.nuttyvibes.com";

export const CDN_URL = "https://nutty-store-pull.b-cdn.net";
