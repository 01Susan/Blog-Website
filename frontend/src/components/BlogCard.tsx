import { memo } from 'react';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = memo((
    { id, authorName, title, content, publishedDate }: BlogCardProps
) => {

    function sanitizeContent(htmlContent: string) {
        // Parse the HTML and strip tags

        // Create a temporary DOM element to extract text content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;
        const textContent = tempElement.textContent || tempElement.innerText || '';

        // Remove newlines and truncate text
        const cleanText = textContent.slice(0, 100);
        return cleanText;
    }

    return (
        <Link to={`/blog/${id}`} className='w-full'>
            <div className='cursor-pointer flex flex-col gap-1 py-2 px-4 border-b-2 border-slate-200 w-full'>
                <div className='flex items-center gap-2'>
                    <Avatar name={authorName} />
                    <div className='font-extralight pl-1'>
                        {authorName} &#46;
                    </div>
                    <div className='pl-1 font-thin text-slate-400'>
                        {publishedDate}
                    </div>
                </div>
                <div className='text-3xl font-bold'>
                    {title}
                </div>
                <div className='text-slate-600'>
                    {sanitizeContent(content)}
                </div>
                <div className='mt-4 text-slate-400'>
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
            </div>
        </Link>
    );
});
