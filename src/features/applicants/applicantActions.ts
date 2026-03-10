"use server";

import { db } from "@/config/db";
import { applicants, resumes, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { applicantSettingsSchema, ApplicantSettingsSchema } from "./applicantSchema";
import { getCurrentUser } from "../auth/authQueries";
import { revalidatePath } from "next/cache";

export const saveApplicantProfile = async (data: ApplicantSettingsSchema) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { status: "ERROR", message: "Unauthorized" };

    const { data: validatedData, error } =
      applicantSettingsSchema.safeParse(data);

    if (error) {
      // Return the first Zod validation error message
      return { status: "ERROR", message: error.issues[0].message };
    }

    const {
      name,
      phoneNumber,
      avatarUrl,
      location,
      dateOfBirth,
      nationality,
      gender,
      maritalStatus,
      education,
      experience,
      websiteUrl,
      biography,
      resumeUrl,
      resumeName,
      resumeSize,
    } = validatedData;

    await db.transaction(async (tx) => {
      // update the users table
      await tx.update(users).set({
        name,
        phoneNumber,
        avatarUrl,
      }).where(eq(users.id, user.id));

      const existingApplicant = await tx.select().from(
        applicants
      ).where(eq(applicants.id, user.id)).limit(1);


      const applicantData = {
        location,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        nationality,
        gender,
        maritalStatus,
        education,
        experience,
        websiteUrl,
        biography,
      };

      if (existingApplicant.length > 0) {
        await tx
          .update(applicants)
          .set(applicantData)
          .where(eq(applicants.id, user.id));
      } else {
        await tx.insert(applicants).values({
          id: user.id,
          ...applicantData,
        });
      }

      if (resumeName && resumeUrl) {
        const existingResume = await tx
          .select()
          .from(resumes)
          .where(eq(resumes.applicantId, user.id))
          .limit(1);

        const resumeData = {
          fileUrl: resumeUrl,
          fileName: resumeName,
          fileSize: resumeSize,
          isPrimary: true,
        };

        if (existingResume.length > 0) {
          // Update the specific resume
          await tx
            .update(resumes)
            .set(resumeData)
            .where(eq(resumes.id, existingResume[0].id));
        } else {
          await tx.insert(resumes).values({
            applicantId: user.id,
            ...resumeData,
          });
        }
      }
    });

    // Refresh the page so the pre-filled data updates immediately
    revalidatePath("/dashboard/settings");

    return { status: "SUCCESS", message: "Profile Saved Successfully!" };
  } catch (error) {
    console.error("SAVE PROFILE ERROR:", error);
    return { status: "ERROR", message: "Failed to Save Profile!" };
  }
};