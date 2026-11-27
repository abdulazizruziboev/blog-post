import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { apiRequest } from "../../tools/api";

/** Confirmation modal. Renders nothing when `post` is null. */
export default function DeletePostDialog({ post, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function close() {
    if (deleting) return;
    setError("");
    onClose();
  }

  useEffect(() => {
    if (!post) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !deleting) {
        setError("");
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, deleting, onClose]);

  if (!post) return null;

  async function handleDelete() {
    try {
      setDeleting(true);
      setError("");
      await apiRequest(`/posts/${post.id}`, { method: "DELETE", auth: true });
      setDeleting(false);
      onDeleted(post);
      onClose();
      return;
    } catch (err) {
      setError(err.message || "Could not delete the post.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-red-600">
            <TriangleAlert className="h-5 w-5" />
          </span>
          <div>
            <h2 id="delete-title" className="text-base font-semibold text-[#0F1729]">
              Delete this post?
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              “{post.title}” will be permanently removed. This can’t be undone.
            </p>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            disabled={deleting}
            className="rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#0F1729] hover:bg-[#F9FAFB] disabled:opacity-60 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
