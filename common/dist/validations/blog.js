"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostUpdateSchema = exports.blogPostSchema = void 0;
const zod_1 = require("zod");
exports.blogPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    content: zod_1.z.string().min(20, { message: "Content must be at least 20 characters long" }),
});
exports.blogPostUpdateSchema = exports.blogPostSchema.partial();
