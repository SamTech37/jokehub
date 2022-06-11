import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../firebase/client";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  useAuth(setUser);
  const router = useRouter();
  return (
    <>
      <DefaultSeo
        title="JokeHub | 笑是良藥"
        defaultTitle="JokeHub"
        description="A website where you can share jokes and rate others' joke. Laugh and enjoy. No censorship."
        canonical={"https://jokehub.vercel.app" + router.asPath}
        openGraph={{
          type: "website",
          url: "https://jokehub.vercel.app" + router.asPath,
          title: "JokeHub | 笑是良藥",
          description:
            "A website where you can share jokes and rate others' joke. Laugh and enjoy. No censorship.",
          site_name: "JokeHub",
          images: [
            {
              url: "https://jokehub.vercel.app/og-image.png",
              width: 1200,
              height: 630,
              alt: "JokeHub opengraph image",
            },
          ],
        }}
      />
      <Navbar user={user}></Navbar>
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
