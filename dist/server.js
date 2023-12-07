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
require("dotenv").config();
const app = (0, express_1.default)();
const port = 3000;
const MY_API_KEY = process.env.RESME_API_KEY;
// Middleware to check the API key
function checkApiKey(req, res, next) {
    const apiKey = req.headers["key"];
    console.log("INSIDE MIDDLE WARE", MY_API_KEY);
    if (apiKey === MY_API_KEY) {
        next(); // If the key is valid, proceed to the route handler
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
app.use(express_1.default.json()); // For parsing application/json
app.get("/", checkApiKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await fetchFromZobJobs();
        console.log("received");
        // res.status(200).json(data);
        res.status(200).json({ message: "rcvd" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching job data" });
    }
}));
app.listen(port, () => console.log(`Server running on port ${port}`));
