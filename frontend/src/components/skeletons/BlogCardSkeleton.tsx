

export const BlogSkeleton = () => {
    return (
        <div className='cursor-pointer flex flex-col gap-1 py-2 px-4 border-b-2 border-slate-200 w-full animate-pulse'>
            <div className='flex items-center gap-2'>
                <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                <div className='font-extralight pl-1 bg-gray-300 rounded-md w-20 h-4'></div>
                <div className='pl-1 font-thin text-slate-400 bg-gray-300 rounded-md w-24 h-4'></div>
            </div>
            <div className='text-3xl font-bold mt-2 bg-gray-300 rounded-md h-10'></div>
            <div className='text-slate-600 mt-2 bg-gray-300 rounded-md h-20'></div>
            <div className='mt-4 text-slate-400 bg-gray-300 rounded-md w-16 h-4'></div>
        </div>
    );
};

export default BlogSkeleton;
