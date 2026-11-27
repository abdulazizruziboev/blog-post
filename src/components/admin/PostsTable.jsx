import { Link } from "react-router-dom";
import { formatDate } from "../../tools/formatDate";
import { formatCompact } from "../../tools/api";
import { CategoryBadge, StatusBadge } from "./Badges";

export default function PostsTable({ posts, onDelete, showViews = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#E5E7EB] text-xs text-[#6B7280]">
            <th className="px-3 py-3 font-medium">Title</th>
            <th className="px-3 py-3 font-medium">Category</th>
            <th className="px-3 py-3 font-medium">Date</th>
            {showViews && <th className="px-3 py-3 font-medium">Views</th>}
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB]">
              <td className="max-w-xs px-3 py-3.5">
                <Link
                  to={`/post-details/${post.id}`}
                  className="line-clamp-1 font-medium text-[#0F1729] hover:text-[#4346EF]"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-3 py-3.5">
                <CategoryBadge category={post.category} />
              </td>
              <td className="whitespace-nowrap px-3 py-3.5 text-[#6B7280]">
                {formatDate(post.createdAt)}
              </td>
              {showViews && (
                <td className="px-3 py-3.5 text-[#6B7280]">{formatCompact(post.views)}</td>
              )}
              <td className="px-3 py-3.5">
                <StatusBadge status={post.status} />
              </td>
              <td className="whitespace-nowrap px-3 py-3.5 text-right">
                <Link
                  to={`/dashboard/posts/${post.id}/edit`}
                  className="rounded px-1.5 py-1 text-xs font-medium text-[#4346EF] hover:underline"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(post)}
                  className="ml-1 rounded px-1.5 py-1 text-xs font-medium text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
