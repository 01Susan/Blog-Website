import { Hono } from "hono";
import { getPrisma } from "../services/db";
import { userSignInSchema, userSignupSchema } from '@susand/medium-common/dist/validations/user';
import { sign } from 'hono/jwt'
import { z } from 'zod'
import _ from 'lodash'

export const userRouter = new Hono<{ Bindings: { DATABASE_URL: string, JWT_SECRET_KEY: string } }>();

userRouter.post('/signup', async (c) => {
    try {
        const body = await c.req.json();

        const parsedBody = userSignupSchema.safeParse(body);

        if (!parsedBody.success) {
            return c.json({ success: false, error: parsedBody.error.formErrors.fieldErrors }, 400);
        }
        // const hashedPassword = await bcrypt.hash(body.password, 10);
        const prisma = getPrisma(c.env.DATABASE_URL);

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            return c.json({ success: false, error: 'User already exists' }, 409);
        }

        // Create the user
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password,
            },
        });

        const jwtPayload = _.omit(user, ['password']);
        const payload = {
            user: jwtPayload,
            exp: Math.floor(Date.now() / 1000) + 60 * 120,
        }
        const token = await sign(payload, c.env.JWT_SECRET_KEY)

        // Send response
        return c.json({ success: true, token }, 201);
    } catch (error) {
        return c.json({ success: false, error: 'Internal Server Error' }, 500);
    }
});

userRouter.post('/signin', async (c) => {
    try {
        const body = await c.req.json();

        const parsedBody = userSignInSchema.safeParse(body);

        if (!parsedBody.success) {
            return c.json({ success: false, error: parsedBody.error.formErrors.fieldErrors }, 400);
        }

        const prisma = getPrisma(c.env.DATABASE_URL);

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (!user) {
            return c.json({ success: false, error: 'User not found' }, 404);
        }

        // Compare the password
        const isPasswordValid = body.password === user.password

        if (!isPasswordValid) {
            return c.json({ success: false, error: 'Password did not match' }, 401);
        }

        const jwtPayload = _.omit(user, ['password']);
        const payload = {
            user: jwtPayload,
            exp: Math.floor(Date.now() / 1000) + 60 * 120,
        }
        const token = await sign(payload, c.env.JWT_SECRET_KEY)
        return c.json({ success: true, token }, 200);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            return c.json({ success: false, error: error.errors }, 400);
        }
        return c.json({ success: false, error: 'Internal Server Error' }, 500);
    }
});