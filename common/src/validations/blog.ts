import { z } from 'zod';

export const blogPostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(20, { message: "Content must be at least 20 characters long" }),
});


export const blogPostUpdateSchema = blogPostSchema.partial()
export type BlogPostType = z.infer<typeof blogPostSchema>;
export type BlogPostUpdateType = z.infer<typeof blogPostUpdateSchema>;
