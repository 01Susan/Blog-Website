import { Editor } from "../components/Editor";
import { AppBar } from "../components/Appbar";
export const Publish = () => {
    return (
        <div className="h-screen dark:bg-dark-100">
            <AppBar />
            <Editor />
        </div>
    );
}