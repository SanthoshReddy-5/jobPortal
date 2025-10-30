"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { registerUserData, registerUserSchema, loginUserData, loginUserSchema, } from "./authSchema";
import { createSessionAndCookies } from "./sessions";

export const registerUserAction = async (data:registerUserData) => {
    try {
        const {data:validatedData,error}= registerUserSchema.safeParse(data);
        
        if(error){
            return {
                status:"ERROR",
                messsage:error.issues[0].message
            };
        }

        const { name, userName, email, role, password } = validatedData;
        const [user] = await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)));

        if (user) {
            if (user.email === email) {
                return {
                    status: "ERROR",
                    message: "Email already exists!"
                }
            } else {
                return {
                    status: "ERROR",
                    message: "Username already exists!"
                }
            }
        }

        const hashPassword = await argon2.hash(password);
        const [result]=await db.insert(users).values({ name, userName, email, role, password: hashPassword });

        await createSessionAndCookies(result.insertId);

        return {
            status: "SUCCESS",
            message: "Registration successfully!"
        };
    } catch (error) {
        return {
            status: "ERROR",
            message: "Registration failed, Try Again!"
        };
    }
}

export const loginUserAction = async (data:loginUserData) => {
    try {
        const { data: validatedData, error } = loginUserSchema.safeParse(data);

        if (error){
            return { 
                status: "ERROR", 
                message: error.issues[0].message 
            };
        }

        const {email,password}=validatedData;
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) {
            return {
                status: "ERROR",
                message: "Invalid email or password!"
            };
        }

        const isValidPassword=await argon2.verify(user.password,password);

        if(!isValidPassword){
            return {
                status: "ERROR",
                message: "Invalid email or password!"
            };
        }

        await createSessionAndCookies(user.id);

        return {
            status: "SUCCESS",
            message: "Login successfully!"
        }
    } catch (error) {
        return {
            status: "ERROR",
            message: "Login failed, Try Again!"
        };
    }
}