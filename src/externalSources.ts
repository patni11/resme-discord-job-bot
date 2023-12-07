const axios = require("axios");
import { JobType } from "./types";
export async function fetchFromZobJobs(querySize?: number): Promise<JobType[]> {
  try {
    const response = await axios.get("https://zobjobs.com/api/jobs");
    const jobs = response.data.jobs.map((job: any) => {
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
  } catch (e) {
    console.log("Error fetching from ZobJobs", e);
    return []; // Return an empty array in case of an error
  }
}
