export type JobType =
  | {
      link: string;
      title: string;
      companyName?: string;
      positionType?: string; //example intern, full time, etc
      endDate?: string;
      description?: string;
      location?: string;
    }
  | undefined;
