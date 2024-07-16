

import React from 'react';

export const Quote: React.FC = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center h-screen bg-slate-200">
            <div className="max-w-lg">
                <div className="md:text-3xl sm:text-2xl font-bold text-gray-800">
                    "The only way to do great work is to love what you do."
                </div>
                <div className="mt-3 max-w-md md:text-xl sm:text-lg text-left font-semibold text-gray-700">
                    Steve Jobs
                </div>
                <div className="md:text-md max-w-md sm:text-sm text-left text-slate-500">
                    CEO | Apple
                </div>
            </div>
        </div>
    );
};
