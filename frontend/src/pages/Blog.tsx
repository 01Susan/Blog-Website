import { memo } from 'react';
import { useBlog } from '../hooks/useBlogs';
import { useParams } from 'react-router-dom';
import { BlogComp } from '../components/BlogComp';
import { AppBar } from '../components/Appbar';
import { BlogPostSkeleton } from '../components/skeletons/BlogPostSkleton'



export const Blog = memo(() => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || '' });

    if (loading) {
        return (
            <>
                <AppBar />
                <BlogPostSkeleton />
            </>
        );
    }

    return (
        // @ts-expect-error @ts-ignore
        < BlogComp blog={blog} />
    );
});
