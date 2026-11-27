import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Search, StickyNote } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import PostsTable from "../../components/admin/PostsTable";
import DeletePostDialog from "../../components/admin/DeletePostDialog";
import { ErrorState, LoadingState } from "../../components/admin/StateMessage";
import { CATEGORIES, STATUSES, apiRequest, buildQuery } from "../../tools/api";

const LIMIT = 10;
const selectClass =
  "rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0F1729] outline-none focus:border-[#4346EF] cursor-pointer";

export default function AdminPostsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState(null);

  // Debounce the search box so we don't hit the API on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  const [reloadToken, setReloadToken] = useState(0);
  const [result, setResult] = useState({ key: "", posts: [], total: 0, pages: 1, error: "" });

  const query = buildQuery({ search, category, status, page, limit: LIMIT });
  const requestKey = `${query}#${reloadToken}`;

  useEffect(() => {
    const controller = new AbortController();
    apiRequest(`/posts${query}`, { auth: true, signal: controller.signal })
      .then((data) => {
        setResult({
          key: requestKey,
          posts: Array.isArray(data?.posts) ? data.posts : [],
          total: data?.total ?? 0,
          pages: Math.max(1, data?.pages ?? 1),
          error: "",
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResult((prev) => ({ ...prev, key: requestKey, error: err.message || "Could not load posts." }));
      });
    return () => controller.abort();
  }, [query, requestKey]);

  const { posts, total, pages, error } = result;
  const loading = result.key !== requestKey;
  const reload = () => setReloadToken((t) => t + 1);

  function handleDeleted() {
    // Step back a page if we just removed the last item on this one.
    if (posts.length === 1 && page > 1) setPage(page - 1);
    else reload();
  }

  return (
    <section>
      <PageHeader
        title="Posts"
        subtitle={`Manage all your blog posts${total ? ` · ${total} total` : ""}`}
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

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-3">
          <label className="relative min-w-56 flex-1">
            <span className="sr-only">Search posts</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-lg border border-[#E5E7EB] py-2 pl-9 pr-3 text-sm text-[#0F1729] outline-none focus:border-[#4346EF]"
            />
          </label>
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {loading && <LoadingState text="Loading posts..." />}
        {!loading && error && <ErrorState text={error} onRetry={reload} />}
        {!loading && !error && posts.length === 0 && (
          <div className="flex min-h-60 flex-col items-center justify-center">
            <StickyNote className="text-[#6B7280]" />
            <p className="mt-2 text-sm text-[#6B7280]">No posts found.</p>
          </div>
        )}
        {!loading && !error && posts.length > 0 && (
          <PostsTable posts={posts} onDelete={setPostToDelete} showViews />
        )}

        {!error && pages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-[#F3F4F6] pt-4 text-sm text-[#6B7280]">
            <span>
              Page {page} of {pages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-[#0F1729] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                type="button"
                disabled={page >= pages || loading}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-[#0F1729] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeletePostDialog
        post={postToDelete}
        onClose={() => setPostToDelete(null)}
        onDeleted={handleDeleted}
      />
    </section>
  );
}
