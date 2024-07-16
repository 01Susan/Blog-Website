import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { prettyJSON } from 'hono/pretty-json';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
export const getPrisma = (database_url) => {
    const prisma = new PrismaClient({
        datasourceUrl: database_url,
    }).$extends(withAccelerate());
    return prisma;
};
const app = new Hono();
app.use(prettyJSON());
app.use('/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
export default app;
