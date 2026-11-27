import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeader";
import ImagePicker from "../../components/admin/ImagePicker";
import { ErrorState, LoadingState } from "../../components/admin/StateMessage";
import { CATEGORIES, STATUSES, apiRequest } from "../../tools/api";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  status: "Published",
  image: "",
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#0F1729] outline-none transition focus:border-[#4346EF]";
const labelClass = "block text-sm font-medium text-[#0F1729]";
const cardClass = "rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6";

/** Used for both /dashboard/create-post and /dashboard/posts/:id/edit */
export default function CreatePostPage() {
  const { id } = useParams();
  // Keyed so switching between create/edit (or between posts) starts with fresh state.
  return <PostForm key={id ?? "new"} id={id} />;
}

function PostForm({ id }) {
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const controller = new AbortController();
    apiRequest(`/posts/${id}`, { auth: true, signal: controller.signal })
      .then((data) => {
        const post = data?.post ?? data;
        setForm({
          title: post.title ?? "",
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          category: post.category ?? "",
          status: post.status ?? "Published",
          image: post.image ?? "",
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setLoadError(err.message || "Could not load the post.");
        setLoading(false);
      });
    return () => controller.abort();
  }, [id, isEdit]);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.content.trim() || !form.category) {
      setError("Title, content and category are required.");
      return;
    }

    const body = {
      ...form,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
    };

    try {
      setSaving(true);
      await apiRequest(isEdit ? `/posts/${id}` : "/posts", {
        method: isEdit ? "PUT" : "POST",
        body,
        auth: true,
      });
      navigate("/dashboard/posts");
    } catch (err) {
      setError(err.message || "Could not save the post.");
    } finally {
      setSaving(false);
    }
  }

  const submitLabel = saving
    ? "Saving..."
    : isEdit
      ? "Update Post"
      : form.status === "Draft"
        ? "Save Draft"
        : "Publish Post";

  return (
    <section>
      <PageHeader
        title={isEdit ? "Edit Post" : "Create New Post"}
        subtitle={isEdit ? "Update the details of your blog post" : "Fill in the details to create a new blog post"}
      />

      {loading && <LoadingState text="Loading post..." />}
      {!loading && loadError && <ErrorState text={loadError} />}

      {!loading && !loadError && (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className={`${cardClass} space-y-5`}>
            <div>
              <label htmlFor="title" className={labelClass}>
                Post Title
              </label>
              <input
                id="title"
                value={form.title}
                onChange={update("title")}
                placeholder="Enter post title..."
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className={labelClass}>
                Excerpt <span className="font-normal text-[#9CA3AF]">(optional)</span>
              </label>
              <input
                id="excerpt"
                value={form.excerpt}
                onChange={update("excerpt")}
                placeholder="A short summary shown on post cards"
                maxLength={200}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>
                Content
              </label>
              <textarea
                id="content"
                value={form.content}
                onChange={update("content")}
                placeholder="Write your post content here..."
                rows={16}
                className={`${inputClass} resize-y`}
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${cardClass} space-y-4`}>
              <h2 className="text-lg font-semibold text-[#0F1729]">Post Settings</h2>
              <div>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <select
                  id="category"
                  value={form.category}
                  onChange={update("category")}
                  className={`${inputClass} cursor-pointer`}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className={labelClass}>
                  Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={update("status")}
                  className={`${inputClass} cursor-pointer`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="mb-4 text-lg font-semibold text-[#0F1729]">Featured Image</h2>
              <ImagePicker
                value={form.image}
                onChange={(image) => setForm((prev) => ({ ...prev, image }))}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-[#4346EF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3538d4] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                {submitLabel}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={saving}
                className="rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#F9FAFB] disabled:opacity-60 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
