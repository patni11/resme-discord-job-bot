const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
import { formattedDate } from "./utils/format";
const axios = require("axios");
require("dotenv").config();
import { JobType } from "./types";
const cron = require("node-cron");
const { EmbedBuilder } = require("discord.js");

async function fetchJobOffers(): Promise<JobType[] | []> {
  try {
    // Call the API with the required headers
    const response = await axios.get("http://localhost:3000/", {
      headers: {
        key: process.env.RESME_API_KEY,
      },
    });

    // Assuming the API returns an array of JobType
    return response.data;
  } catch (error) {
    console.error("Error fetching job offers:", error);
    return [];
  }
}

function formatEmbed(job: JobType) {
  if (!job) {
    return "";
  }
  // Send formatted message to channel
  const jobEmbed = new EmbedBuilder()
    .setColor("#0099ff") // Set the color of the embed
    .setTitle(job.title) // Set the title of the embed
    .setURL(job.link) // Set the URL to the job posting
    .setAuthor({ name: job.companyName }) // Set the author of the embed
    //.setDescription(job.description) // Set the description of the embed
    .addFields(
      { name: "Location", value: job.location },
      { name: "\u200B", value: "\u200B", inline: true },
      { name: "\u200B", value: "\u200B", inline: true },
      {
        name: "Apply By-",
        value: formattedDate(job.endDate),
      },
      { name: "\u200B", value: "\u200B", inline: true },
      { name: "\u200B", value: "\u200B", inline: true }
      // You can add more fields if you have more information
    )
    .setTimestamp();
  return jobEmbed;
}

client.login(process.env.DISCORD_TOKEN);

async function sendJobMessage() {
  try {
    const channel = await client.channels.fetch("1174806019067613324");

    const jobOffers = await fetchJobOffers();
    jobOffers.forEach((offer) => {
      const formattedOffer = formatEmbed(offer)
      channel.send({ embeds: [formatEmbed(offer)] });
    });

    console.log("message sent");
  } catch (e) {
    console.log("There is an error with sending job messages", e);
  }
}

cron.schedule("50 1 * * *", sendJobMessage, {
  timezone: "Asia/Kolkata"
});

client.once("ready", () => {
  console.log("Bot is online!");
});
