import clsx from 'clsx';
import { useCallback } from 'react';

type AvatarProps = {
    name: string;
    size?: "small" | "medium" | "large";
};

export function Avatar({ name, size = "small" }: AvatarProps) {
    const getNameInitials = useCallback((name: string) => {
        const splitName = name.trim().split(/[\s]+/)
        const avatarName = splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0)
        return avatarName ? avatarName.toUpperCase() : 'AN';
    }, [])

    const sizeClasses = clsx({
        'w-6 h-6 text-xs': size === "small",
        'w-8 h-8 text-sm': size === "medium",
        'w-12 h-12 text-lg': size === "large",
    });

    return (
        <div className={clsx('relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600', sizeClasses)}>
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {getNameInitials(name)}
            </span>
        </div>
    );
}