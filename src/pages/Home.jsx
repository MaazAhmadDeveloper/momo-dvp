import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./services/supabase.js";
import Header from "../components/Header.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import Loading from "../components/Loading.jsx";
import SearchArticles from "../components/SearchArticles.jsx";

export default function Home({ session }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);

            const { data } = await supabase
                .from("articles")
                .select("*")
                .order("created_at", { ascending: false });

            setArticles(data);
            setLoading(false);
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <Header session={session} />
                <div className="flex justify-center items-center my-4">
                    <Loading size={202} color="#000" />
                </div>
            </div>
        );
    }

    if (!loading && articles.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <Header session={session} />
                <p className="text-center mt-10 text-gray-500 bg-white">
                    No articles found{" "}
                    {session && (
                        <Link to="/create-article" className="text-blue-500 underline">
                            Create the first article
                        </Link>
                    )}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Header session={session} />
            
            <SearchArticles setArticles={setArticles} setLoading={setLoading} />
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}