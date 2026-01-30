import { db } from "@/config/db";
import { employers, jobs, users } from "@/drizzle/schema";
import { eq, isNull, and, or, gte, desc } from "drizzle-orm";

export async function getJobs() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const jobsData = await db.select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        minSalary: jobs.minSalary,
        maxSalary: jobs.maxSalary,
        salaryCurrency: jobs.salaryCurrency,
        salaryPeriod: jobs.salaryPeriod,
        location: jobs.location,
        jobType: jobs.jobType,
        workType: jobs.workType,
        createdAt: jobs.createdAt,
        companyName: employers.name,
        companyLogo: users.avatarUrl
    }).from(jobs).innerJoin(employers,eq(jobs.employerId,employers.id)).innerJoin(users,eq(employers.id,users.id)).where(
        and(isNull(jobs.deletedAt),or(isNull(jobs.expiresAt),gte(jobs.expiresAt,today)))
    ).orderBy(desc(jobs.createdAt));

    return jobsData;
}

export type JobCardType=Awaited<ReturnType<typeof getJobs>>[number];

export async function getJobById(jobId:number){
    const job=await db.select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        tags:jobs.tags,

        minSalary: jobs.minSalary,
        maxSalary: jobs.maxSalary,
        salaryCurrency: jobs.salaryCurrency,
        salaryPeriod: jobs.salaryPeriod,

        location: jobs.location,
        jobType: jobs.jobType,
        workType: jobs.workType,
        jobLevel:jobs.jobLevel,
        experience:jobs.experience,
        minEducation:jobs.minEducation,

        createdAt: jobs.createdAt,
        expiresAt:jobs.expiresAt,

        companyName: employers.name,
        companyLogo: users.avatarUrl,
        companyBio:employers.description,
        companyWebsite:employers.websiteUrl,
        companyLocation:employers.location
    }).from(jobs).innerJoin(employers,eq(jobs.employerId,employers.id)).innerJoin(users,eq(employers.id,users.id)).where(eq(jobs.id,jobId)).limit(1);

    return job[0]
}

export type JobDetailsType=Awaited<ReturnType<typeof getJobById>>;