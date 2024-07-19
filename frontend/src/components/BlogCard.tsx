import { memo, useMemo } from 'react';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';
import { BlogCardProps } from '../types/blog';
import { sanitizeContent } from '../utils/content';

export const BlogCard = memo((
    { id, authorName, title, content, publishedDate }: BlogCardProps
) => {

    const sanitizedContent = useMemo(() => sanitizeContent(content), [content]);
    const readingTime = useMemo(() => `${Math.ceil(content.length / 100)} min read`, [content]);

    return (
        <Link to={`/blog/${id}`} className='w-full'>
            <div className='cursor-pointer flex flex-col gap-1 py-2 px-4 border-b-2 border-slate-200 dark:border-dark-200 w-full'>
                <div className='flex items-center gap-2 dark:text-white'>
                    <Avatar name={authorName} />
                    <div className='font-extralight pl-1 dark:text-slate-100'>
                        {authorName} &#46;
                    </div>
                    <div className='pl-1 font-thin text-slate-400 dark:text-slate-200'>
                        {publishedDate}
                    </div>
                </div>
                <div className='text-3xl font-bold dark:text-slate-50'>
                    {title}
                </div>
                <div className='text-slate-600 dark:text-slate-200 h-16 mt-2'>
                    {sanitizedContent}
                </div>
                <div className='mt-4 text-slate-400 dark:text-slate-200'>
                    {readingTime}
                </div>
            </div>
        </Link>
    );
});
