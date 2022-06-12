import React from "react";
import Head from "next/head";
import NoMore from "../components/NoMore";
export default function Error404() {
  return (
    <div>
      <Head>
        <title>JokeHub | 404-頁面不存在</title>
        <meta
          key="description"
          name="description"
          content="JokeHub | 404-頁面不存在"
        />
      </Head>

      <NoMore>
        <>
          <h1>您要找的頁面並不存在</h1>
          <h1>回主頁吧</h1>
        </>
      </NoMore>
    </div>
  );
}
