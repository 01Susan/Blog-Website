import { z } from 'zod';

// Allows first name, middle (optional), and last name with spaces
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)* [A-Za-z]+$/;
// Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userSignupSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .regex(nameRegex, 'Must be first name, middle (optional), and last name with spaces'),
    email: z.string()
        .email({ message: "Email must be a valid email address" })
        .min(1, { message: "Email is required" }),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(20, 'Password must be less than 20 characters long')
        .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
});

export const userSignInSchema = userSignupSchema.pick({ email: true, password: true })

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignIn = z.infer<typeof userSignInSchema>;