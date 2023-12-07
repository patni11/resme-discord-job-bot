import express, { NextFunction, Request, Response } from "express";
import { fetchFromZobJobs } from "./externalSources";
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

app.use(express.json()); // For parsing application/json

app.get("/", checkApiKey, async (req: Request, res: Response) => {
  try {
    const data = await fetchFromZobJobs();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job data" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
