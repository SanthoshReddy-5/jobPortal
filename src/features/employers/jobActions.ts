"use server";

import { jobs } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/authQueries";
import { db } from "@/config/db";
import { JobFormData, jobSchema } from "./jobSchema";
import { Job } from "./jobTypes";
import { and, eq } from "drizzle-orm";

export const createJobAction = async (data: JobFormData) => {
    try {
        const { success, data: result, error } = jobSchema.safeParse(data);

        if (!success) {
            console.log("Zod Errors:", error.flatten());
            console.log("Received Data:", data);

            return {
                status: "ERROR",
                message: error.issues[0].message
            }
        }

        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        await db.insert(jobs).values({ ...result, employerId: currentUser.id });

        return { status: "SUCCESS", message: "New Job Posted Successfully!" };
    } catch (error) {
        return { status: "ERROR", message: "Something went Wrong, Please try again!" };
    }
}


export const getEmployerJobsAction = async (): Promise<{
    status: "SUCCESS" | "ERROR";
    data?: Job[];
    message?: string;
}> => {
    try{
        const currentUser=await getCurrentUser();

        if(!currentUser || currentUser.role!=="employer"){
            return {status:"ERROR",data:[]};
        }

        const result=await db.select().from(jobs).where(eq(jobs.employerId,currentUser.id)).orderBy(jobs.createdAt);
        return {status:"SUCCESS",data:result as Job[]};
    }catch(error){
        return {status:"ERROR",message:"Something went wrong!"};
    }
}

export const deleteJobAction=async (jobId:number)=>{
    try{
        const currentUser=await getCurrentUser();

        if(!currentUser || currentUser.role!=="employer"){
            return {status:"ERROR",message:"Unauthorized!"};
        }

        await db.delete(jobs).where(and(eq(jobs.id,jobId),eq(jobs.employerId,currentUser.id)));

        return {status:"SUCCESS",message:"Job Post Deleted Successfully!"};
    }catch(error){
        console.error("Delete job error",error);
        return {status:"ERROR",message:"Something went wrong while Deleting!"};
    }
}