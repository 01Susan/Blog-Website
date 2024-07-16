

export const BlogPostSkeleton = () => {
    return (
        <div className="w-screen flex justify-center">
            <div className="grid grid-cols-12 w-2/3">
                <div className="flex flex-col gap-2 col-span-8 p-4">
                    <div className="h-10 w-3/4 bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-gray-200 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 col-span-4 p-4">
                    <div className="h-6 w-1/3 bg-gray-200 animate-pulse"></div>
                    <div className="flex gap-2 items-center mt-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


