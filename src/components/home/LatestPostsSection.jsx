import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";
import PostCard from "./PostCard";
import { formatDate } from "../../tools/formatDate";

export default function LatestPostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://blogify-oquvchi.vercel.app/api/posts",
        );
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        const latest = (data.posts || []).slice(0, 3).map((post) => ({
          id: post.id,
          image: post.image,
          category: post.category,
          date: formatDate(post.createdAt),
          title: post.title,
          excerpt: post.excerpt,
        }));
        setPosts(latest);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load latest posts.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <section className="bg-[#F9FAFB] px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="text-4xl font-bold text-[#0F1729]">
              Latest Posts
            </h2>
            <p className="mt-2 text-[#6B7280]">
              Check out our most recent articles
            </p>
          </div>
          <Link
            to="/posts"
            className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#F3F4F6] hover:border-[#4346EF]/30"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        {loading && (
          <div className="min-h-101.5 flex flex-col justify-center items-center">
            <LoaderCircle className="animate-spin" />
            <p className="mt-2 text-sm text-[#6B7280]">
              Loading latest posts...
            </p>
          </div>
        )}
        {!loading && error && (
          <div className="min-h-101.5 flex flex-col justify-center items-center">
            <p className="mt-2 text-sm text-red-500">{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="mt-12 grid grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={post.id ?? index} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
