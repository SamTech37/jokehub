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
    const { id, keyword, contentSliced } = req.body;
    //share it with twitter bot
    console.log(id, keyword, contentSliced, rwclient);
    await rwclient.v2
      .tweet(
        `${contentSliced}...在此查看完整笑話 https://jokehub.vercel.app/p/${id} \n#${keyword} #JOKEHUB`
      )
      .catch((err) => console.log(err));
    res.json({ message: "Succeed" });
  } else {
    res.json({ message: "No Access" });
  }
}
