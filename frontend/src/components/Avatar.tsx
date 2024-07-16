import clsx from 'clsx';

type AvatarProps = {
    name: string;
    size?: "small" | "medium" | "large";
};

export function Avatar({ name, size = "small" }: AvatarProps) {
    function getNameInitials(name: string) {
        return name
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 2)
            .toUpperCase();
    }

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