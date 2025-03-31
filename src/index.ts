import express from "express";
import cors from "cors";
import axios from "axios";

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
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json({
      data: response.data,
    });
  } catch (e) {
    res.json({
      message: "something went wrong",
    });
  }
});

app.listen(3000);
