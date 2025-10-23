"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { registerUserData, registerUserSchema } from "./authSchema";

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
        await db.insert(users).values({ name, userName, email, role, password: hashPassword });

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

export const loginUserAction = async (data: {
    email: string;
    password: string;
}) => {
    try {
        const { email, password } = data;
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