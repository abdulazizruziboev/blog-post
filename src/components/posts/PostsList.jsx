import { LoaderCircle, StickyNote } from "lucide-react";
import PostCard from "../home/PostCard";
import CategoryTabs from "./PostsCategoryTabs";

export default function PostsList({
  posts,
  loading,
  error,
  category,
  setCategory,
  categories,
}) {
  return (
    <section className="p-4 my-16">
      <div className="mx-auto max-w-7xl">
        {!loading && (
          <CategoryTabs
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        )}

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
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post.id ?? index} {...post} />
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="min-h-101.5 flex flex-col justify-center items-center">
            <StickyNote className="text-[#6B7280]" />
            <p className="mt-2 text-sm text-[#6B7280]">No posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
