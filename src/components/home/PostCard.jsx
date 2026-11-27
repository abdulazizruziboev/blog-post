import { Link } from "react-router-dom";
import Calendar from "../../assets/images/calendar.svg";
import { ArrowRight } from "lucide-react";

export default function PostCard({
  id,
  image,
  category,
  date,
  title,
  excerpt,
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
      <div className="relative">
        <img
          src={image}
          className="w-full object-cover object-center max-h-48"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#4346EF] px-3 py-1 text-xs font-medium text-white">
          {category}
        </span>
      </div>
      <div className="p-6">
        <p className="flex items-center gap-2 text-xs text-[#6B7280]">
          <img src={Calendar} alt="" className="size-4" />
          {date}
        </p>
        <h3 className="mt-4 text-lg font-semibold text-[#0F1729]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">{excerpt}</p>
        <Link
          to={"/post-details/" + id}
          className="mt-5 inline-flex items-center gap-2 rounded-md text-sm font-medium text-[#4346EF] hover:text-[#3538d4] hover:underline underline-offset-4"
        >
          Read more <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
