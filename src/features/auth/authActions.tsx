"use server";

import { db } from "@/config/db";
import { applicants, employers, users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { registerUserData, registerUserSchema, loginUserData, loginUserSchema, } from "./authSchema";
import { createSessionAndCookies, invalidateSession } from "./sessions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import crypto from "crypto";

export const registerUserAction = async (data: registerUserData) => {
    try {
        const { data: validatedData, error } = registerUserSchema.safeParse(data);

        if (error) {
            return {
                status: "ERROR",
                messsage: error.issues[0].message
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

        await db.transaction(async (tx) => {

            const [result] = await tx.insert(users).values({ name, userName, email, role, password: hashPassword });

            if (role === "applicant") {
                await tx.insert(applicants).values({ id: result.insertId });
            } else {
                await tx.insert(employers).values({ id: result.insertId });
            }

            await createSessionAndCookies(result.insertId,tx);
        })

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

export const loginUserAction = async (data: loginUserData) => {
    try {
        const { data: validatedData, error } = loginUserSchema.safeParse(data);

        if (error) {
            return {
                status: "ERROR",
                message: error.issues[0].message
            };
        }

        const { email, password } = validatedData;
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) {
            return {
                status: "ERROR",
                message: "Invalid email or password!"
            };
        }

        const isValidPassword = await argon2.verify(user.password, password);

        if (!isValidPassword) {
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

export const logoutUserAction = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return redirect("/login");
    }

    const hashedToken = crypto.createHash("sha-256").update(session).digest("hex");
    await invalidateSession(hashedToken);
    cookieStore.delete("session");

    return redirect("/login");
}