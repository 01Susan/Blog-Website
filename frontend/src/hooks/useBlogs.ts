import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };

        getBlogs();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return {
        loading,
        blogs
    };
};

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };

        getBlog();
    }, [])
    return {
        loading,
        blog
    }
}
