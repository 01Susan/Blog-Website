import React, { memo, useMemo } from "react";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { BlogSkeleton } from "../components/skeletons/BlogCardSkeleton";
import { Blog } from "../types/blog";
import { changesDateFormat } from "../utils/dateFormat";
import { ThemeProvider } from "../contexts/ThemeContext";


export const Blogs = memo(() => {
    console.log("Blogs Component is rendered");
    const { loading, blogs } = useBlogs();


    const renderedBlogsCard = useMemo((): React.ReactNode => {
        console.log("BlogCard Component is rendered");
        return blogs.map((blog: Blog) => (
            <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={changesDateFormat(blog.createdAt)}
            />
        ))
    }, [blogs])


    return (
        <>
            <AppBar />
            <div className="h-screen w-full flex flex-col items-center dark:bg-dark-100">
                <div className="flex flex-col gap-4 p-4 justify-center items-center w-1/2 my-6">
                    {
                        loading ? (
                            <>
                                <BlogSkeleton />
                                <BlogSkeleton />
                                <BlogSkeleton />
                            </>
                        ) : (renderedBlogsCard)
                    }
                </div>
            </div>
        </>
    );
});
