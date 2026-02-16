import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const BODY_LIMIT = 150;
  const isLong = article.body.length > BODY_LIMIT;

  const previewText = isLong
    ? article.body.slice(0, BODY_LIMIT) + "..."
    : article.body;

  return (
    <div className="rounded-xl shadow p-4 mb-4 bg-white">
      <h2 className="text-lg font-semibold">{article.title}</h2>

      <p className="text-sm text-gray-500">
        {article.category} •{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>

      <p className="mt-2 text-gray-700">
        {previewText}
      </p>

      {isLong && (
        <Link
          to={`/articles/${article.id}`}
          className="text-blue-500 text-sm mt-2 inline-block"
        >
          Read more
        </Link>
      )}
    </div>
  );
}
