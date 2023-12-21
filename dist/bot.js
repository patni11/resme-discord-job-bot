"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDiscordFeedback = void 0;
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const format_1 = require("./utils/format");
const axios = require("axios");
require("dotenv").config();
const cron = require("node-cron");
const { EmbedBuilder } = require("discord.js");
function fetchJobOffers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call the API with the required headers
            const response = yield axios.get("/fetchJob", {
                headers: {
                    key: process.env.RESME_API_KEY,
                },
            });
            // Assuming the API returns an array of JobType
            return response.data;
        }
        catch (error) {
            console.error("Error fetching job offers:", error);
            return [];
        }
    });
}
function formatEmbed(job) {
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
        .addFields({ name: "Location", value: job.location, inline: true }, { name: "\u200B", value: "\u200B", inline: true }, { name: "\u200B", value: "\u200B", inline: true }, {
        name: "Apply By-",
        value: (0, format_1.formattedDate)(job.endDate),
        inline: true,
    }, { name: "\u200B", value: "\u200B", inline: true }, { name: "\u200B", value: "\u200B", inline: true }
    // You can add more fields if you have more information
    )
        .setTimestamp();
    return jobEmbed;
}
client.login(process.env.DISCORD_TOKEN);
function sendJobMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield client.channels.fetch("1174806019067613324");
            const jobOffers = yield fetchJobOffers();
            jobOffers.forEach((offer) => {
                const formattedOffer = formatEmbed(offer);
                channel.send({ embeds: [formatEmbed(offer)] });
            });
            console.log("message sent");
        }
        catch (e) {
            console.log("There is an error with sending job messages", e);
        }
    });
}
function sendDiscordFeedback({ discordChannel, buttonState, message, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield client.channels.fetch(discordChannel);
            if (!channel) {
                console.log("Could not connect to channel");
                throw new Error(`Could not connect to channel: ${channel}`);
            }
            const formattedOffer = new EmbedBuilder()
                .setColor("#0099ff") // Set the color of the embed
                .setTitle(buttonState) // Set the title of the embed
                .addFields({ name: "Issue", value: message, inline: true })
                .setTimestamp();
            yield channel.send({ embeds: [formattedOffer] });
            return { success: true, message: "Feedback Sent" };
        }
        catch (error) {
            console.log("Failed to send feedback to discord", error);
            throw new Error(`Failed to send feedback to discord: ${error.message}`);
        }
    });
}
exports.sendDiscordFeedback = sendDiscordFeedback;
cron.schedule("57 00 * * *", sendJobMessage, {
    timezone: "Asia/Kolkata",
});
client.once("ready", () => {
    console.log("Bot is online!");
});
