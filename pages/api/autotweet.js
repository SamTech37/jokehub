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
    const { id, keyword, slicedContent } = req.body;
    //share it with twitter bot

    await rwclient.v2
      .tweet(
        `${slicedContent}\n\n到JokeHub上評分 https://jokehub.vercel.app/p/${id} \n#${keyword} #笑話 #JOKE`
      )
      .catch((err) => console.log(err));
    res.json({ message: "Succeed" });
  } else {
    res.json({ message: "No Access" });
  }
}
