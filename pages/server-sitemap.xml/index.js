import { getServerSideSitemap } from "next-sitemap";
import { getSitemapPaths } from "../../firebase/client";
export async function getServerSideProps(ctx) {
  // Method to source urls from firebase
  const ids = await getSitemapPaths();
  const fields = ids.map((id) => {
    return {
      loc: `https://jokehub.vercel.app/p/${id}`,
      lastmod: new Date().toISOString(),
    };
  });
  //    [
  //     {
  //       loc: "https://example.com", // Absolute url
  //       lastmod: new Date().toISOString(),
  //       // changefreq
  //       // priority
  //     },
  //     {
  //       loc: "https://example.com/dynamic-path-2", // Absolute url
  //       lastmod: new Date().toISOString(),
  //       // changefreq
  //       // priority
  //     },
  //   ]

  return getServerSideSitemap(ctx, fields);
}

// Default export to prevent next.js errors
export default function Sitemap() {}
