import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./services/supabase";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMsg";

export default function CreateArticle({ session }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data: { user }, } = await supabase.auth.getUser();

        const { error } = await supabase
        .from("articles")
        .insert([
            {
                title,
                body,
                category,
                user_id: user.id,
            },
        ]);
        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Header session={session} />

            <div className="max-w-md mx-auto p-4 rounded-xl shadow bg-white">
                <h2 className="text-xl font-bold mb-4">Create Article</h2>

                <ErrorMessage message={error} />

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        placeholder="Body"
                        value={body}
                        rows={8}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    {loading && <Loading size={22} />} Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
