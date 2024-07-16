import { z } from 'zod';
export declare const userSignupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const userSignInSchema: z.ZodObject<Pick<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "email" | "password">, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignIn = z.infer<typeof userSignInSchema>;
