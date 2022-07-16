const { TwitterApi } = require("twitter-api-v2");
const client = new TwitterApi({
  appKey: process.env.NEXT_PUBLIC_TWITTER_APP_KEY,
  appSecret: process.env.NEXT_PUBLIC_TWITTER_APP_SECRET,
  accessToken: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.NEXT_PUBLIC_TWITTER_ACCESS_SECRET,
});
const rwclient = client.readWrite;

export default async function Post(req, res) {
  if (req.method === "POST") {
    const { id, keyword } = req.body;
    //share it with twitter bot
    const starter = [
      "到JokeHub查看完整笑話",
      "JokeHub上最新的笑話",
      "三個字 超級好笑",
      "Check this out",
      "Funny stuff",
    ];
    await rwclient.v2
      .tweet(
        `${
          starter[Math.floor(Math.random() * starter.length)]
        }... https://jokehub.vercel.app/p/${id} \n#${keyword} #JOKEHUB #笑話 #JOKE #FUNNY`
      )
      .catch((err) => console.log(err));
    res.json({ message: "Succeed" });
  } else {
    res.json({ message: "No Access" });
  }
}
