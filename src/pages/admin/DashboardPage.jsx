import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Layers, LoaderCircle, PencilLine, Plus, TrendingUp } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import PostsTable from "../../components/admin/PostsTable";
import { getAuth } from "../../utils/auth";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const token = getAuth().token;

        const statsResponse = await fetch(
          "https://blogify-oquvchi.vercel.app/api/stats",
          { headers: { Authorization: "Bearer " + token } },
        );
        if (!statsResponse.ok) throw new Error("Failed to load stats");
        const statsData = await statsResponse.json();

        const categoriesResponse = await fetch(
          "https://blogify-oquvchi.vercel.app/api/categories",
        );
        const categoriesData = await categoriesResponse.json();

        setStats(statsData);
        setCategories(categoriesData);
      } catch (err) {
        console.log(err);
        setError("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = getAuth().token;
      const response = await fetch(
        "https://blogify-oquvchi.vercel.app/api/posts/" + id,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        },
      );
      if (!response.ok) throw new Error("Failed to delete post");

      setStats({
        ...stats,
        totalPosts: stats.totalPosts - 1,
        recentPosts: stats.recentPosts.filter((post) => post.id !== id),
      });
    } catch (err) {
      console.log(err);
      alert("Could not delete the post.");
    }
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F1729]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Welcome back! Here's an overview of your blog.
          </p>
        </div>
        <Link
          to="/dashboard/create-post"
          className="flex items-center gap-2 rounded-lg bg-[#4346EF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3538d4]"
        >
          <Plus className="size-4" />
          New Post
        </Link>
      </div>

      {loading && (
        <div className="min-h-60 flex flex-col justify-center items-center">
          <LoaderCircle className="animate-spin" />
          <p className="mt-2 text-sm text-[#6B7280]">Loading dashboard...</p>
        </div>
      )}
      {!loading && error && (
        <div className="min-h-60 flex flex-col justify-center items-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              icon={<FileText className="size-5" />}
              value={stats.totalPosts}
              label="Total Posts"
              color="bg-[#EEF0FF] text-[#4346EF]"
            />
            <StatCard
              icon={<Layers className="size-5" />}
              value={categories.length}
              label="Categories"
              color="bg-[#F3E8FF] text-[#9333EA]"
            />
            <StatCard
              icon={<TrendingUp className="size-5" />}
              value={stats.totalViews}
              label="Total Views"
              color="bg-[#DCFCE7] text-[#16A34A]"
            />
            <StatCard
              icon={<PencilLine className="size-5" />}
              value={stats.drafts}
              label="Drafts"
              color="bg-[#FEF3C7] text-[#D97706]"
            />
          </div>

          <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-[#0F1729]">Recent Posts</h2>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Manage and monitor your latest content
                </p>
              </div>
              <Link
                to="/dashboard/posts"
                className="text-xs font-medium text-[#4346EF] hover:underline"
              >
                View all
              </Link>
            </div>

            {stats.recentPosts.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#6B7280]">No posts yet.</p>
            ) : (
              <PostsTable posts={stats.recentPosts} onDelete={handleDelete} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
