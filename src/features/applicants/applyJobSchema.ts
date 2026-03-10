import { z } from "zod";

export const applyJobSchema = z.object({
    jobId: z.number(),
    resumeId: z.number().min(1, "Please select the resume!"),
    coverLetter: z.string().optional(),
});

export type ApplyJobSchema = z.infer<typeof applyJobSchema>;