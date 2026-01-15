const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/",
  //disable: process.env.NODE_ENV === "development", // dev mode
});

module.exports = withPWA({
  reactStrictMode: true,
});
