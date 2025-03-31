import express from "express";
import cors from "cors";
import octo from "./githubService.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/account", async (req, res): Promise<void> => {
  const url = req.body.url;

  const match = url.match(/github\.com\/([^\/]+)\/?$/);

  if (!match) {
    res.json({
      message: "Invalid Github url",
    });
    return;
  }
  const username = match[1];
  try {
    const { data } = await octo.rest.users.getByUsername({ username });
    res.json({
      username: data.login,
      name: data.name,
      avatar: data.avatar_url,
      profileUrl: data.html_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      joined: data.created_at,
    });
  } catch (e) {
    res.json({
      message: "something went wrong",
    });
  }
});

app.listen(5000);
