import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../firebase/client";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
// export function reportWebVitals(metric) {
//   console.log(metric);
// }
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  useAuth(setUser);
  const router = useRouter();
  return (
    <>
      <DefaultSeo
        title="JokeHub | 笑話都在這"
        defaultTitle="JokeHub"
        description="一個可以分享與評分笑話的網站。沒有言論審查。笑是良藥。A website where you can share jokes and rate others' jokes. Laugh and enjoy. No censorship."
        canonical={"https://jokehub.vercel.app" + router.asPath}
        openGraph={{
          type: "website",
          url: "https://jokehub.vercel.app" + router.asPath,
          title: "JokeHub | 笑話都在這",
          description:
            "一個可以分享與評分笑話的網站。沒有言論審查。笑是良藥。A website where you can share jokes and rate others' jokes. Laugh and enjoy. No censorship.",
          site_name: "JokeHub | 笑話都在這",
          images: [
            {
              url: "https://jokehub.vercel.app/og-image.png",
              width: 1200,
              height: 630,
              alt: "JokeHub opengraph image",
            },
          ],
        }}
        facebook={{
          appId: "256152399957750",
        }}
      />
      <Navbar user={user}></Navbar>
      <Component {...pageProps} user={user} />
    </>
  );
}
