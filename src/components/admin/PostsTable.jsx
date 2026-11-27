import { Link } from "react-router-dom";
import { formatDate } from "../../tools/formatDate";

export default function PostsTable({ posts, onDelete }) {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-[#E5E7EB] text-xs text-[#6B7280]">
          <th className="px-3 py-3 font-medium">Title</th>
          <th className="px-3 py-3 font-medium">Category</th>
          <th className="px-3 py-3 font-medium">Date</th>
          <th className="px-3 py-3 font-medium">Views</th>
          <th className="px-3 py-3 font-medium">Status</th>
          <th className="px-3 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB]">
            <td className="px-3 py-3.5">
              <Link
                to={"/post-details/" + post.id}
                className="font-medium text-[#0F1729] hover:text-[#4346EF]"
              >
                {post.title}
              </Link>
            </td>
            <td className="px-3 py-3.5">
              <span className="rounded-full bg-[#EEF0FF] px-2.5 py-0.5 text-xs font-medium text-[#4346EF]">
                {post.category}
              </span>
            </td>
            <td className="px-3 py-3.5 text-[#6B7280]">{formatDate(post.createdAt)}</td>
            <td className="px-3 py-3.5 text-[#6B7280]">{post.views}</td>
            <td className="px-3 py-3.5">
              {post.status === "Published" ? (
                <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">
                  Published
                </span>
              ) : (
                <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
                  Draft
                </span>
              )}
            </td>
            <td className="px-3 py-3.5 text-right">
              <Link
                to={"/dashboard/posts/" + post.id + "/edit"}
                className="px-1.5 text-xs font-medium text-[#4346EF] hover:underline"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete(post.id)}
                className="px-1.5 text-xs font-medium text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
