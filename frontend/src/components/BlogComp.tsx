import { memo } from "react"
import { AppBar } from "./Appbar"
import { Avatar } from "./Avatar"
import moment from "moment"
import parse from 'html-react-parser';

interface BlogCompProps {
    blog: {
        title: string
        content: string
        id: string
        published: boolean
        createdAt: string
        author: {
            name: string
        }
    }
}



export const BlogComp = memo(({ blog }: BlogCompProps) => {
    function changesDateFormat(date: string) {
        const dateToFormat = date;
        const formattedDate = moment(dateToFormat).format('MMMM Do YYYY');
        return formattedDate;
    }
    return (
        <>
            <AppBar />
            <div className="w-screen  flex  justify-center">
                <div className="grid grid-cols-12 w-2/3">
                    <div className="flex flex-col gap-2 col-span-8 p-4">
                        <div className="text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 font-thin">
                            Posted on {changesDateFormat(blog.createdAt)}
                        </div>
                        <div className="text-wrap">
                            {parse(blog.content)}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 col-span-4 p-4">
                        <div>
                            Author
                        </div>
                        <div className="flex gap-2">
                            <Avatar name={blog.author.name}></Avatar>
                            <div>
                                {blog.author.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})