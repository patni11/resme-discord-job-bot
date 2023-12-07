export type JobType =
  | {
      link: string;
      title: string;
      companyName?: string;
      positionType?: string; //example intern, full time, etc
      endDate?: Date;
      description?: string;
      location?: string;
    }
  | undefined;
