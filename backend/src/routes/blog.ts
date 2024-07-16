import { Hono } from "hono";
import { getPrisma } from "../services/db";
import { blogPostSchema, blogPostUpdateSchema, BlogPostType, BlogPostUpdateType } from "@susand/medium-common/dist/validations/blog";
import { z } from 'zod'
import { verify } from "hono/jwt";
import _ from 'lodash'


interface PayloadUser {
    "id": string
    "email": string
    "name": string
    "createdAt": string
}

export const blogRouter = new Hono<{ Bindings: { DATABASE_URL: string, JWT_SECRET_KEY: string }, Variables: { id: string, user: PayloadUser } }>();


blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization");
    try {
        if (token) {
            const payload = await verify(token, c.env.JWT_SECRET_KEY) as { user: PayloadUser };
            if (payload) {
                c.set("user", payload.user);
                await next();
            } else {
                return c.json({ success: false, error: 'You are not logged in' }, 401);
            }
        }
    } catch (err) {
        return c.json({ success: false, error: 'You are not logged in' }, 401);
    }
});
blogRouter.post('/', async (c) => {
    try {
        // Parse and validate the request body
        const body = await c.req.json<BlogPostType>();
        const parsedBody = blogPostSchema.safeParse(body);

        if (!parsedBody.success) {
            return c.json({ success: false, error: parsedBody.error.formErrors.fieldErrors }, 400);
        }
        // Get Prisma client
        const prisma = getPrisma(c.env.DATABASE_URL);
        const authorId = c.get("user").id

        // Create the blog post
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId
            }
        });

        // Send response
        return c.json({ success: true, blog }, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            return c.json({ success: false, error: error.errors }, 400);
        }

        // Handle other errors
        console.error(error);
        return c.json({ success: false, error: 'Internal Server Error' }, 500);
    }
});

blogRouter.put('/:id', async (c) => {
    try {
        const blogId: string = c.req.param('id');

        // Parse and validate the request body
        const body = await c.req.json<BlogPostUpdateType>();
        const parsedBody = blogPostUpdateSchema.safeParse(body);

        if (!parsedBody.success) {
            return c.json({ success: false, error: parsedBody.error.formErrors.fieldErrors }, 400);
        }

        // Get Prisma client
        const prisma = getPrisma(c.env.DATABASE_URL);

        // Update the blog post
        const blog = await prisma.post.update({
            where: { id: blogId },
            data: body,
        });

        // Send response
        return c.json({ success: true, blog }, 200);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            return c.json({ success: false, error: error.errors }, 400);
        }

        // Handle other errors
        console.error(error);
        return c.json({ success: false, error: 'Internal Server Error' }, 500);
    }
});


blogRouter.get('/bulk', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogs = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            published: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({ success: true, blogs })
})

blogRouter.get('/:id', async (c) => {
    try {
        const blogId: string = c.req.param('id');

        // Validate the blog ID
        if (!blogId) {
            return c.json({ success: false, error: 'Invalid blog ID' }, 400);
        }

        // Get Prisma client
        const prisma = getPrisma(c.env.DATABASE_URL);

        // Retrieve the blog post
        const blog = await prisma.post.findUnique({
            where: { id: blogId },
            select: {
                title: true,
                content: true,
                id: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!blog) {
            return c.json({ success: false, error: 'Blog post not found' }, 404);
        }

        // Send response
        return c.json({ success: true, blog }, 200);
    } catch (error) {
        // Handle errors
        console.error(error);
        return c.json({ success: false, error: 'Internal Server Error' }, 500);
    }
});
