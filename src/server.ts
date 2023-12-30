import express, { NextFunction, Request, Response } from "express";
import { fetchFromZobJobs } from "./externalSources";
import { sendDiscordFeedback } from "./bot";
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

const MY_API_KEY = process.env.RESME_API_KEY;

// Middleware to check the API key
function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["key"];
  if (apiKey === MY_API_KEY) {
    next(); // If the key is valid, proceed to the route handler
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
app.use(cors());
app.use(express.json()); // For parsing application/json

app.get("/fetchJob", checkApiKey, async (req: Request, res: Response) => {
  try {
    const data = await fetchFromZobJobs();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job data" });
  }
});

app.post("/feedback", async (req: Request, res: Response) => {
  try {
    // req.body contains the parsed body of the request, no need to await it
    const body = req.body;
    const { discordChannel, buttonState, message } = body;

    // Ensure sendDiscordFeedback is an async function
    const response = await sendDiscordFeedback({
      discordChannel,
      buttonState,
      message,
    });
    console.log("Response", response);

    // Send back the response from sendDiscordFeedback or a confirmation message
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending feedback" });
  }
});
app.listen(port, () => console.log(`Server running on port ${port}`));
