import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function ArticleDetails({ session }) {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        supabase
            .from("articles")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setArticle(data);
            });
    }, [id]);

    if (error) return (
        <div className="max-w-3xl mx-auto p-4">
            <Header session={session} />
            <p className="text-red-500">{error}</p>
        </div>
    );
    if (!article) return (
        <div className="max-w-3xl mx-auto p-4">
            <Header session={session} />
            <div className="flex justify-center items-center h-full my-4">
                <Loading size={202} color={"#000"} />
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Header session={session} />
            <div className="max-w-2xl mx-auto p-4 rounded-xl shadow bg-white">
                <h1 className="text-2xl text-center font-bold">{article.title}</h1>

                <p className="text-sm ms-[10%] my-5 text-gray-500 mb-4">
                    <span className="font-bold">Category: </span> {article.category}
                </p>

                <p className="w-[80%] m-auto">{article.body}</p>

                <p className="text-sm text-gray-500 mt-4 text-right">
                    <span className="font-bold">Published: </span>
                    {new Date(article.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
