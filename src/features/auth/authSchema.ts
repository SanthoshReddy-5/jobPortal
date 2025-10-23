import { email, z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().trim().min(4, "Name must be atleast 4 characters.").max(255, "Name must not exceed 255 characters."),
    userName: z.string().trim().min(4, "Username must be atleast 4 characters.").max(255, "Username must not exceed 255 characters.").regex(/^[a-zA-Z0-9_-]+$/,"Username can only contain letters, numbers, underscore and hyphen."),
    email:z.email("Please enter a valid email address.").trim().max(255,"Email must not exceed 255 characters.").toLowerCase(),
    password: z.string().min(8, "Password must be atleast 8 characters.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,"Password must contain atleat one uppercase, lowercase and number."),
    role:z.enum(["applicant","employer"],{error:"Role must be an applicant or employer"}).default("applicant")
});

export type registerUserData=z.infer<typeof registerUserSchema>;

export const registerUserWithConfirmSchema = registerUserSchema.extend({
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should be same.",
    path: ["confirmPassword"],
  });

export type registerUserWithConfirmData = z.infer<typeof registerUserWithConfirmSchema>;