import { memo } from "react";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import moment from "moment";
import { BlogSkeleton } from "../components/skeletons/BlogCardSkeleton";

interface Blog {
    title: string;
    content: string;
    id: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string;
    };
}

export const Blogs = memo(() => {
    function changesDateFormat(date: string) {
        const dateToFormat = date;
        const formattedDate = moment(dateToFormat).format('MMMM Do YYYY');
        return formattedDate;
    }
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="w-full">
                <AppBar />
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-4 p-4 justify-center items-center w-1/2">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <AppBar />
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-col gap-4 p-4 justify-center items-center w-1/2">
                    {blogs.map((blog: Blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={changesDateFormat(blog.createdAt)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});
