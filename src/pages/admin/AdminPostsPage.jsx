import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, Plus, Search, StickyNote } from "lucide-react";
import PostsTable from "../../components/admin/PostsTable";
import { getAuth } from "../../utils/auth";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const token = getAuth().token;
        const response = await fetch(
          "https://blogify-oquvchi.vercel.app/api/posts?limit=1000",
          { headers: { Authorization: "Bearer " + token } },
        );
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.log(err);
        setError("Could not load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
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

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
      alert("Could not delete the post.");
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || post.category === category;
    const matchesStatus = status === "All" || post.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F1729]">Posts</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Manage all your blog posts · {posts.length} total
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

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 min-h-[78vh]">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-lg border border-[#E5E7EB] py-2 pl-9 pr-3 text-sm text-[#0F1729] outline-none focus:border-[#4346EF]"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0F1729] outline-none focus:border-[#4346EF] cursor-pointer"
          >
            <option value="All">All categories</option>
            <option value="Technology">Technology</option>
            <option value="Productivity">Productivity</option>
            <option value="Design">Design</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0F1729] outline-none focus:border-[#4346EF] cursor-pointer"
          >
            <option value="All">All statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {loading && (
          <div className="min-h-60 flex flex-col justify-center items-center">
            <LoaderCircle className="animate-spin" />
            <p className="mt-2 text-sm text-[#6B7280]">Loading posts...</p>
          </div>
        )}
        {!loading && error && (
          <div className="min-h-60 flex flex-col justify-center items-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="min-h-60 flex flex-col justify-center items-center">
            <StickyNote className="text-[#6B7280]" />
            <p className="mt-2 text-sm text-[#6B7280]">No posts found.</p>
          </div>
        )}
        {!loading && !error && filteredPosts.length > 0 && (
          <PostsTable posts={filteredPosts} onDelete={handleDelete} />
        )}
      </div>
    </section>
  );
}
