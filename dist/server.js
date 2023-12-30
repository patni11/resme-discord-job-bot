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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const externalSources_1 = require("./externalSources");
const bot_1 = require("./bot");
const cors = require("cors");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 3001;
const MY_API_KEY = process.env.RESME_API_KEY;
// Middleware to check the API key
function checkApiKey(req, res, next) {
    const apiKey = req.headers["key"];
    if (apiKey === MY_API_KEY) {
        next(); // If the key is valid, proceed to the route handler
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
app.use(cors());
app.use(express_1.default.json()); // For parsing application/json
app.get("/fetchJob", checkApiKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, externalSources_1.fetchFromZobJobs)();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching job data" });
    }
}));
app.post("/feedback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.body contains the parsed body of the request, no need to await it
        const body = req.body;
        const { discordChannel, buttonState, message } = body;
        // Ensure sendDiscordFeedback is an async function
        const response = yield (0, bot_1.sendDiscordFeedback)({
            discordChannel,
            buttonState,
            message,
        });
        console.log("Response", response);
        // Send back the response from sendDiscordFeedback or a confirmation message
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error sending feedback" });
    }
}));
app.listen(port, () => console.log(`Server running on port ${port}`));
