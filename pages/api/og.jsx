import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const encodedContent =
    searchParams.get("content") ?? "Come check out this joke on JokeHub!";
  const encodedTag = searchParams.get("tag") ?? "funny";
  let content = decodeURIComponent(encodedContent);
  if (content.length >= 30)
    content += "..."; /*don't put dots after a one-liner */
  const tag = decodeURIComponent(encodedTag);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "black",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            padding: "5px 40px",
            width: "1000px",
            textAlign: "left",
            color: "white",
          }}
        >
          {content}
        </div>
        <div
          style={{
            padding: "5px 40px",
            width: "1000px",
            textAlign: "center",
            color: "#FFAB10",
          }}
        >
          {`#${tag}`}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
