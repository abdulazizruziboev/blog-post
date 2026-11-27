import PostCard from "../home/PostCard";
import { formatDate } from "../../tools/formatDate";

export default function RelatedPosts({ related }) {
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-200 py-14 bg-[#fbfcfc]">
      <div className="mx-auto max-w-272">
        <h2 className="text-[36px] font-bold text-slate-900">Related Posts</h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {related.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              image={item.image}
              category={item.category}
              date={formatDate(item.createdAt)}
              title={item.title}
              excerpt={item.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
