const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");
import { JobType } from "./types";

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("message", async (message: any) => {
  if (message.content === "!jobs") {
    const jobOffers = await fetchJobOffers();
    jobOffers.forEach((offer) => {
      message.channel.send(formatJobOffer(offer));
    });
  }
});

async function fetchJobOffers(): Promise<JobType[] | []> {
  // Fetch and return job offers
  // Example: return axios.get('API_URL').then(response => response.data);
  return [];
}

function formatJobOffer(offer: any) {
  // Format the job offer into a string or embed
}

client.login("YOUR_BOT_TOKEN");

const cron = require("node-cron");

cron.schedule("0 9 * * *", async () => {
  // Runs every day at 9:00 AM
  const channel = client.channels.cache.get("YOUR_CHANNEL_ID");
  const jobOffers = await fetchJobOffers();
  jobOffers.forEach((offer) => {
    channel.send(formatJobOffer(offer));
  });
});
