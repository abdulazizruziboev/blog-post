import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import Calendar from "../../assets/images/calendar.svg";
import { formatDate } from "../../tools/formatDate";

export default function PostDetailsContent({ post }) {
  return (
    <section className="p-4 mt-5">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-600 transition hover:text-slate-900 py-2 px-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Link>

        <div className="mx-auto max-w-3xl">
          <header className="mt-8">
            <span className="inline-block rounded-full text-indigo-50 px-3 py-1 text-xs font-semibold bg-indigo-600">
              {post.category}
            </span>

            <h1 className="mt-4 text-[60px] leading-[60px] font-bold tracking-tight text-slate-900">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-slate-400" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <img src={Calendar} alt="" className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </header>

          <div className="mt-8 overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={post.image}
              alt={post.title}
              className="h-[260px] w-full object-cover sm:h-[380px]"
            />
          </div>

          <article className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
            {post.content.split("\n\n").map((block, index) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-lg font-bold text-slate-900 sm:text-xl"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }

              return <p key={index}>{block}</p>;
            })}
          </article>
        </div>
      </div>
    </section>
  );
}
