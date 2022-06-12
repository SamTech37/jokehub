module.exports = {
  siteUrl: process.env.SITE_URL || "https://jokehub.vercel.app",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  // ...other options
  exclude: ["/server-sitemap.xml"], // exclude dynamic sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://jokehub.vercel.app/server-sitemap.xml", // <==== Add here
    ],
  },
};
