export interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string;
    };
}


export interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
