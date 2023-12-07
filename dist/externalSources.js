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
exports.fetchFromZobJobs = void 0;
const axios = require("axios");
function fetchFromZobJobs(querySize) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://zobjobs.com/api/jobs");
            const jobs = response.data.jobs.map((job) => {
                return {
                    link: job.link,
                    title: job.title,
                    companyName: job.companyName,
                    endDate: job.expires,
                    //description: job.description,
                    location: job.location,
                };
            });
            console.log(jobs);
            return jobs; // Assuming response.data is an array of JobType
        }
        catch (e) {
            console.log("Error fetching from ZobJobs", e);
            return []; // Return an empty array in case of an error
        }
    });
}
exports.fetchFromZobJobs = fetchFromZobJobs;
