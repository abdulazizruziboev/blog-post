import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import ImagePicker from "../../components/admin/ImagePicker";
import { getAuth } from "../../utils/auth";

export default function CreatePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Published");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://blogify-oquvchi.vercel.app/api/posts/" + id,
        );
        const data = await response.json();
        setTitle(data.post.title);
        setExcerpt(data.post.excerpt || "");
        setContent(data.post.content || "");
        setCategory(data.post.category);
        setStatus(data.post.status);
        setImage(data.post.image || "");
      } catch (err) {
        console.log(err);
        setError("Could not load the post.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title || !content || !category) {
      setError("Title, content and category are required.");
      return;
    }

    const post = { title, excerpt, content, category, status, image };

    let url = "https://blogify-oquvchi.vercel.app/api/posts";
    let method = "POST";
    if (id) {
      url = "https://blogify-oquvchi.vercel.app/api/posts/" + id;
      method = "PUT";
    }

    try {
      setSaving(true);
      const token = getAuth().token;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error("Failed to save post");

      navigate("/dashboard/posts");
    } catch (err) {
      console.log(err);
      setError("Could not save the post.");
    } finally {
      setSaving(false);
    }
  }

  let buttonText = "Publish Post";
  if (status === "Draft") buttonText = "Save Draft";
  if (id) buttonText = "Update Post";
  if (saving) buttonText = "Saving...";

  if (loading) {
    return (
      <div className="min-h-60 flex flex-col justify-center items-center">
        <LoaderCircle className="animate-spin" />
        <p className="mt-2 text-sm text-[#6B7280]">Loading post...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F1729]">
          {id ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          {id ? "Update the details of your blog post" : "Fill in the details to create a new blog post"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_320px] gap-6">
        <div className="flex flex-col gap-5 rounded-xl border border-[#E5E7EB] bg-white p-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#0F1729]">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#0F1729] outline-none focus:border-[#4346EF]"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-[#0F1729]">
              Excerpt
            </label>
            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown on post cards"
              className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#0F1729] outline-none focus:border-[#4346EF]"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#0F1729]">
              Content
            </label>
            <textarea
              id="content"
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#0F1729] outline-none focus:border-[#4346EF]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0F1729]">Post Settings</h2>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#0F1729]">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#0F1729] outline-none focus:border-[#4346EF] cursor-pointer"
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Productivity">Productivity</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[#0F1729]">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#0F1729] outline-none focus:border-[#4346EF] cursor-pointer"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#0F1729]">Featured Image</h2>
            <ImagePicker image={image} setImage={setImage} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-[#4346EF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3538d4] disabled:opacity-70 cursor-pointer"
            >
              {buttonText}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/posts")}
              className="rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#F9FAFB] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
