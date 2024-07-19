import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBlogs = () => {
    console.log("Use Blogs Hook is called");
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState([]);


    const getBlogs = useCallback(async () => {
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
    }, [])

    useEffect(() => {
        getBlogs();
    }, [getBlogs]); // Empty dependency array means this effect runs once when the component mounts

    return {
        loading,
        blogs
    };
};

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState({});

    const getBlog = useCallback(async () => {
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
    }, [])

    useEffect(() => {
        getBlog();
    }, [getBlog])
    return {
        loading,
        blog
    }
}
