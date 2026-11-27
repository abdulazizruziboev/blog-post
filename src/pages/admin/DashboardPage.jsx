import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Layers, PencilLine, Plus, TrendingUp } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import StatCard from "../../components/admin/StatCard";
import PostsTable from "../../components/admin/PostsTable";
import DeletePostDialog from "../../components/admin/DeletePostDialog";
import { ErrorState, LoadingState } from "../../components/admin/StateMessage";
import { apiRequest, formatCompact } from "../../tools/api";

export default function DashboardPage() {
  const [reloadToken, setReloadToken] = useState(0);
  const [result, setResult] = useState({ token: -1, stats: null, categoriesCount: 0, error: "" });
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([apiRequest("/stats", { auth: true }), apiRequest("/categories")])
      .then(([statsData, categories]) => {
        if (cancelled) return;
        setResult({
          token: reloadToken,
          stats: statsData,
          categoriesCount: Array.isArray(categories) ? categories.length : 0,
          error: "",
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setResult((prev) => ({
          ...prev,
          token: reloadToken,
          error: err.message || "Could not load dashboard data.",
        }));
      });
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const reload = () => setReloadToken((t) => t + 1);
  const { stats, categoriesCount, error } = result;
  // Spinner only on first load; later refreshes (e.g. after delete) update in place.
  const loading = result.token !== reloadToken && !stats;

  const recentPosts = stats?.recentPosts ?? [];

  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your blog."
        action={
          <Link
            to="/dashboard/create-post"
            className="inline-flex items-center gap-2 rounded-lg bg-[#4346EF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3538d4]"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        }
      />

      {loading && <LoadingState text="Loading dashboard..." />}
      {!loading && error && <ErrorState text={error} onRetry={reload} />}

      {!loading && !error && stats && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={FileText}
              value={stats.totalPosts ?? 0}
              label="Total Posts"
              note={`${stats.published ?? 0} live`}
            />
            <StatCard
              icon={Layers}
              tone="violet"
              value={categoriesCount}
              label="Categories"
            />
            <StatCard
              icon={TrendingUp}
              tone="green"
              value={formatCompact(stats.totalViews)}
              label="Total Views"
            />
            <StatCard
              icon={PencilLine}
              tone="amber"
              value={stats.drafts ?? 0}
              label="Drafts"
            />
          </div>

          <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-[#0F1729]">Recent Posts</h2>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Manage and monitor your latest content
                </p>
              </div>
              <Link
                to="/dashboard/posts"
                className="rounded px-1 text-xs font-medium text-[#4346EF] hover:underline"
              >
                View all
              </Link>
            </div>

            {recentPosts.length > 0 ? (
              <PostsTable posts={recentPosts} onDelete={setPostToDelete} />
            ) : (
              <p className="py-10 text-center text-sm text-[#6B7280]">No posts yet.</p>
            )}
          </div>
        </>
      )}

      <DeletePostDialog
        post={postToDelete}
        onClose={() => setPostToDelete(null)}
        onDeleted={reload}
      />
    </section>
  );
}
