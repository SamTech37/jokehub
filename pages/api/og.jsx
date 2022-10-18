import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default function (req) {
  const { searchParams } = new URL(req.url);
  const content = searchParams.get("content") ?? "Default content";
  const tag = searchParams.get("tag") ?? "tag";

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
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            padding: "5px 40px",
            width: "1000px",
            textAlign: "left",
            backgroundImage:
              "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
          }}
        >
          {
            content.length <= 15
              ? content
              : content + "..." /*don't put dots after a one-liner */
          }
        </div>
        <div
          style={{
            padding: "5px 40px",
            width: "1000px",
            textAlign: "center",
            backgroundImage:
              "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
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
