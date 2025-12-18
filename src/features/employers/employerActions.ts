"use server";

import { employers, users } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/authQueries";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { EmployerProfileData } from "./employerSchema";

export const updateEmployerProfileAction=async (data:EmployerProfileData)=>{
    try {
        const currentUser=await getCurrentUser();

        if(!currentUser || currentUser.role !== "employer"){
            return {status:"ERROR",message:"Unauthorized"};
        }

        const {
            name,
            description,
            yearOfEstablishment,
            location,
            websiteUrl,
            organizationType,
            teamSize,
            avatarUrl,
            bannerImageUrl 
        }=data;
        
        const updatedEmployer =await db.update(employers).set({
            name,
            description,
            yearOfEstablishment:yearOfEstablishment? parseInt(yearOfEstablishment):null,
            location,
            websiteUrl,
            organizationType,
            teamSize,
            bannerImageUrl
        }).where(eq(employers.id,currentUser.id));

        console.log("Updated Employer:",updatedEmployer);

        await db.update(users).set({avatarUrl}).where(eq(users.id,currentUser.id));

        return {status:"SUCCESS",message:"Profile Updated Successfully!"};
    } catch (error) {
        return {status:"ERROR",message:"Something went Wrong, Please try again!"};
    }
}