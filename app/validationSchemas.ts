import { z } from "zod";

// Re-usable component:
// For validating data using zod
// Originally from route.ts

// export const createIssueSchema = z.object({ //original name re-named to issueSchema
export const issueSchema = z.object({
   // only validating these fields. other fields have default values
   title: z.string().min(1, "Title is required.").max(255),
   description: z.string().min(1, "Description is required.")
});
