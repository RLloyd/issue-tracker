import { z } from "zod";

// Re-usable component:
// For validating data using zod
// Originally from route.ts

// export const createIssueSchema = z.object({ //re-named to issueSchema
export const issueSchema = z.object({
   // only validating these fields. other fields have default values
   title: z.string().min(1, "Title is required.").max(255),
   description: z.string().min(1, "Description is required.").max(65535)
});

// Path or Update
// Flexible Patch endpoint to receive diff kinds of data. Schema with optional properties.
// Optional so you can update only the field needed and not necessary all fields.
export const patchIssueSchema = z.object({
	title: z.string().min(1, "Title is required.").max(255).optional(),
	description: z.string().min(1, "Description is required.").max(65535).optional(),
   assignedToUserId: z.string().min(1, "AssignedToUserId is required.").max(255).optional().nullable()
});

