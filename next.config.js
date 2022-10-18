const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/",
  disable: process.env.NODE_ENV === "development", // dev mode
});

module.exports = withPWA({
  reactStrictMode: true,
});
