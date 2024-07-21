import 'react-quill/dist/quill.snow.css';
import QuillEditor from 'react-quill';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';

type EditorStateProps = {
    title: string;
    content: string;
};

interface BlogValidationType {
    title: string[];
    content: string[];
}

type ValidationError = BlogValidationType | string;

export const Editor = () => {
    const [validationError, setValidationError] = useState<ValidationError | null>(null);
    const [editorState, setEditorState] = useState<EditorStateProps>({
        title: '',
        content: ''
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditorState({ ...editorState, title: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setEditorState({ ...editorState, content });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`, editorState, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            toast.success('Published successfully');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status && error.response.status >= 400 && error.response.status < 500 && error.response?.data?.error) {
                    setValidationError(error.response.data.error);
                } else {
                    toast.error('Unable to publish. Please try again.');
                }
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="w-screen flex items-center justify-center mt-16 bg-dark-100">
            <div className="w-1/2 flex gap-4 flex-col">
                <div className='w-full'>
                    <input
                        onChange={handleTitleChange}
                        value={editorState.title}
                        className="w-full h-auto py-3 border-l-2 px-5 border-slate-200 focus:outline-none font-bold text-2xl dark:bg-dark-100 dark:text-white"
                        type="text"
                        required
                        placeholder="Title"
                    />
                </div>
                {validationError && typeof validationError === 'object' && validationError.title && (
                    <p className='text-red-500'>{validationError.title[0]}</p>
                )}
                <QuillEditor
                    className='w-full h-96 mt-2 dark:text-white'
                    theme="snow"
                    value={editorState.content}
                    onChange={handleContentChange}
                />
                {validationError && typeof validationError === 'object' && validationError.content && (
                    <p className='text-red-500'>{validationError.content[0]}</p>
                )}
                <div>
                    <button
                        className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editor;
